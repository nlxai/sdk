/* eslint-disable no-console */
import {
  ParticipantEvent,
  Room,
  RoomEvent,
  setLogLevel,
  Track,
  type Participant,
  type RemoteTrack,
} from "livekit-client";
import type { Context, ModalityPayloads, VoiceCredentials } from ".";

/**
 * Contains modality data paired with timing information.
 */
export interface ModalitiesWithContext {
  /** The modality data. */
  modalities: ModalityPayloads;
  /** The participant identity the data is from, if available. */
  from?: string;
  /** The timestamp when the data was received. */
  timestamp: number;
}

if (process.env.NODE_ENV === "development") {
  setLogLevel("info");
} else {
  setLogLevel("error");
}

const decodeModalities = (val: Uint8Array): ModalityPayloads | null => {
  const decoded = new TextDecoder().decode(val);
  if (decoded !== null && typeof decoded === "object") {
    return decoded;
  }
  try {
    const parsed = JSON.parse(decoded);
    if (parsed === null || typeof parsed !== "object") {
      throw new Error("Invalid parsed");
    }
    return parsed;
  } catch (err) {
    return null;
  }
};

/**
 * How to handle voice connections.
 */
export interface VoiceHandler {
  /** Enable or disable the microphone. */
  setMicrophone: (micEnabled: boolean) => Promise<void>;
  /** Enable or disable the speakers. */
  setSpeakers: (speakersEnabled: boolean) => Promise<void>;
  /** Retry connecting to the voice service. */
  retry: () => Promise<void>;
  /** Disconnect from the voice service. Must be called at the end of the session. */
  disconnect: () => Promise<void>;
}

/**
 * The state of the voice connection.
 */
export interface VoiceState {
  /** Whether the voice connection has been terminated from the remote end. */
  isTerminated: boolean;
  /** Is the user speaking at the moment. */
  isUserSpeaking: boolean;
  /** Is the application/agent speaking at the moment. */
  isApplicationSpeaking: boolean;
  /** Modalities data that can be used to render custom modalities. */
  modalities: ModalitiesWithContext[];
}

/** Thrown when we detect missing audio permissions */
export class MissingAudioPermissionsError extends Error {
  /** */
  constructor() {
    super("Missing audio permissions");
  }
}

/**
 * How to handle voice connections.
 * @param handler - The conversation handler.
 * @param context - The context for the voice connection.
 * @param onRoomStateChanged - Callback for when the room state changes.
 * @returns The voice handler.
 */
const voice = async (
  handler: {
    getVoiceCredentials: (context: Context) => Promise<VoiceCredentials | null>;
    setRequestOverride: (
      override: ((req: { request: ModalityPayloads }) => void) | undefined,
    ) => void;
  },
  context: Context,
  onRoomStateChanged?: (state: VoiceState) => void,
): Promise<VoiceHandler> => {
  const state: VoiceState = {
    modalities: [] as ModalitiesWithContext[],
    isTerminated: false,
    isUserSpeaking: false,
    isApplicationSpeaking: false,
  };

  const setState = (newState: Partial<VoiceState>): void => {
    Object.assign(state, newState);
    onRoomStateChanged?.(state);
  };
  const creds: VoiceCredentials | null =
    await handler.getVoiceCredentials(context);

  if (creds == null) {
    throw new Error("No voice credentials");
  }

  const handleActiveSpeakersChanged = (participants: Participant[]): void => {
    setState({
      isApplicationSpeaking: participants.some(
        (participant) => participant.isAgent,
      ),
      isUserSpeaking: participants.some((participant) => participant.isLocal),
    });
  };

  let track: RemoteTrack | null = null;
  let audioElement: HTMLMediaElement | null = null;

  const handleTrackSubscribed = (newTrack: RemoteTrack): void => {
    if (newTrack.kind === Track.Kind.Audio) {
      track = newTrack;
      audioElement = newTrack.attach();
      void audioElement.play();
    }
  };

  const handleIsSpeakingChanged = (speaking: boolean): void => {
    setState({ isUserSpeaking: speaking });
  };

  let room: Room | null = null;
  let stream: MediaStream | null = null;

  const disconnect = async (): Promise<void> => {
    if (track != null) {
      track.stop();
      track = null;
    }
    if (stream != null) {
      stream.getTracks().forEach((track) => {
        track.stop();
      });
      stream = null;
    }
    audioElement = null;
    setState({
      modalities: [],
      isUserSpeaking: false,
      isApplicationSpeaking: false,
    });
    handler.setRequestOverride(undefined);
    await room?.disconnect();
    room = null;
  };

  const connect = async (): Promise<void> => {
    try {
      room = new Room();

      // prompt for permissions
      stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      room.on(RoomEvent.TrackSubscribed, handleTrackSubscribed);
      room.on(RoomEvent.ActiveSpeakersChanged, handleActiveSpeakersChanged);
      room.localParticipant.on(
        ParticipantEvent.IsSpeakingChanged,
        handleIsSpeakingChanged,
      );
      room.on(RoomEvent.MediaDevicesError, () => {
        console.info("media devices error");
      });
      room.on(RoomEvent.Disconnected, () => {
        setState({
          isTerminated: true,
        });
        void disconnect();
      });

      handler.setRequestOverride((req) => {
        const encoder = new TextEncoder();
        const encodedData = encoder.encode(JSON.stringify(req.request));
        room?.localParticipant.publishData(encodedData).catch((err) => {
          console.error("Failed to publish data to LiveKit:", err);
        });
      });

      // Handle incoming data from the room/agent
      room.on(RoomEvent.DataReceived, (payload, participant) => {
        setState({
          modalities: [
            ...state.modalities,
            {
              modalities: decodeModalities(payload) ?? {},
              from: participant?.identity,
              timestamp: Date.now(),
            },
          ],
        });
      });

      await room.connect(creds.url, creds.token, { autoSubscribe: true });

      await room.localParticipant.setMicrophoneEnabled(true);

      void room.startAudio();
    } catch (err) {
      if (err instanceof DOMException && err.name === "NotAllowedError") {
        throw new MissingAudioPermissionsError();
      } else {
        throw new Error("Failed to start audio");
      }
    }
  };

  await connect();

  return {
    async setMicrophone(micEnabled) {
      if (room != null)
        await room.localParticipant.setMicrophoneEnabled(micEnabled);
    },
    async setSpeakers(speakersEnabled) {
      if (audioElement != null) {
        audioElement.volume = speakersEnabled ? 1 : 0;
      }
    },
    async retry() {
      await disconnect();
      await connect();
    },
    disconnect,
  };
};

export default voice;
