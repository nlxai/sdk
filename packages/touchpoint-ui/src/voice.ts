import {
  ParticipantEvent,
  Room,
  RoomEvent,
  Track,
  type Participant,
  type RemoteTrack,
  type TextStreamHandler,
} from "livekit-client";
import {
  type Context,
  ResponseType,
  type ModalityPayloads,
  type VoiceCredentials,
  type ConversationHandler,
  type ApplicationMessage,
  type ApplicationResponsePayload,
} from "@nlxai/core";

type DebugEvent = any;

/**
 * Contains modality data paired with timing information.
 */
export interface RoomDataEventsWithContext {
  /** The modality data. */
  data: RoomDataEvent;
  /** The participant identity the data is from, if available. */
  from?: string;
  /** The timestamp when the data was received. */
  timestamp: number;
}

type RoomDataEvent =
  | { type: "agent_interim_response"; message: string }
  | { type: "agent_response"; message: string; debugEvents?: DebugEvent[] }
  | {
      type: "agent_final_response";
      messages: ApplicationMessage[];
      debugEvents?: DebugEvent[];
      modalities?: ModalityPayloads;
    };

const decodeRoomData = (val: Uint8Array): RoomDataEvent | null => {
  const decoded = new TextDecoder().decode(val);
  if (decoded !== null && typeof decoded === "object") {
    return normalizeRoomData(decoded);
  }
  try {
    const parsed = JSON.parse(decoded);
    if (parsed === null || typeof parsed !== "object") {
      throw new Error("Invalid parsed");
    }
    return normalizeRoomData(parsed);
  } catch (err) {
    return null;
  }
};

const normalizeRoomData = (val: unknown): RoomDataEvent | null => {
  if (val == null || typeof val !== "object") {
    return null;
  }
  const rawData = val as {
    type?: string;
    message?: string;
    messages?: ApplicationMessage[];
    modalities?: ModalityPayloads;
    debugEvents?: DebugEvent[];
  };
  if (
    rawData.type === "agent_response" &&
    typeof rawData.message === "string"
  ) {
    return {
      type: "agent_response",
      message: rawData.message,
      debugEvents: rawData.debugEvents,
    };
  }
  if (rawData.type === "agent_final_response") {
    return {
      type: "agent_final_response",
      messages: rawData.messages ?? [],
      debugEvents: rawData.debugEvents,
      modalities: rawData.modalities,
    };
  }
  if (
    rawData.type === "agent_interim_response" &&
    typeof rawData.message === "string"
  ) {
    return { type: "agent_interim_response", message: rawData.message };
  }
  console.warn("Room data not recognized", val);
  return null;
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
  /** Are the speakers enabled */
  isSpeakersEnabled: boolean;
  /** Is the mic enabled */
  isMicEnabled: boolean;
  /** Interim message */
  interimMessage?: string;
}

/** Thrown when we detect missing audio permissions */
export class MissingAudioPermissionsError extends Error {
  /** */
  constructor() {
    super("Missing audio permissions");
  }
}

// eslint-disable-next-line @typescript-eslint/promise-function-async
const wait = <T>(timeout: number, value?: T): Promise<T> =>
  new Promise((resolve) => {
    setTimeout(resolve, timeout, value);
  });

/**
 * How to handle voice connections.
 * @param handler - The conversation handler.
 * @param context - The context for the voice connection.
 * @param onRoomStateChanged - Callback for when the room state changes.
 * @returns The voice handler.
 */
export const initiateVoice = async (
  handler: ConversationHandler,
  context: Context,
  onRoomStateChanged?: (state: VoiceState) => void,
): Promise<VoiceHandler> => {
  const state: VoiceState = {
    isTerminated: false,
    isUserSpeaking: false,
    isApplicationSpeaking: false,
    isSpeakersEnabled: true,
    isMicEnabled: true,
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

  let roomCache: Room | null = null;
  let stream: MediaStream | null = null;

  const transcriptionHandler: TextStreamHandler = (reader) => {
    const eff = async (): Promise<void> => {
      const message = await reader.readAll();
      const trackId = reader.info.attributes?.["lk.transcribed_track_id"];
      const final = reader.info.attributes?.["lk.transcription_final"];

      // Not completely clear why `trackId` is being checked here, keeping the condition as a precaution to make sure unrelated data events
      // are not interpreted as transcriptions.
      if (trackId != null && final === "true") {
        handler.appendMessageToTranscript({
          type: ResponseType.User,
          // TODO: this should be optional
          receivedAt: new Date().getTime(),
          payload: { type: "text", text: message },
        });
      }
    };
    void eff();
  };

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
      isUserSpeaking: false,
      isApplicationSpeaking: false,
    });
    handler.setRequestOverride(undefined);
    if (roomCache != null) {
      roomCache.unregisterTextStreamHandler("lk.transcription");
      await roomCache.disconnect();
    }
    roomCache = null;
  };

  const connect = async (): Promise<void> => {
    try {
      const room = new Room();

      roomCache = room;

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

      room.registerTextStreamHandler("lk.transcription", transcriptionHandler);

      handler.setRequestOverride((req) => {
        const encoder = new TextEncoder();
        const encodedData = encoder.encode(
          JSON.stringify({ type: "request", payload: req }),
        );
        room.localParticipant.publishData(encodedData).catch((err) => {
          console.error("Failed to publish data to LiveKit:", err);
        });
      });

      // Handle incoming data from the room/agent
      room.on(RoomEvent.DataReceived, (payload) => {
        const roomData = decodeRoomData(payload);
        // TODO: handle streamed `agent_response`-type messages to show content sooner
        if (roomData == null) {
          return;
        }
        if (roomData.type === "agent_interim_response") {
          setState({ interimMessage: roomData.message });
          return;
        }
        if (roomData.type === "agent_final_response") {
          setState({ interimMessage: undefined });
          const applicationPayload: ApplicationResponsePayload = {
            ...roomData,
            messages: roomData.messages.map((message) => ({
              ...message,
              choices: message.choices ?? [],
            })),
          };
          handler.appendMessageToTranscript({
            type: ResponseType.Application,
            payload: applicationPayload,
            receivedAt: new Date().getTime(),
          });
        }
      });

      // eslint-disable-next-line @typescript-eslint/promise-function-async
      const createAgentJoinedPromise = (): Promise<unknown> =>
        new Promise((resolve) => {
          if (room.remoteParticipants.size > 0) {
            resolve({});
            return;
          }
          room.once(RoomEvent.ParticipantConnected, resolve);
        });

      await room.connect(creds.url, creds.token, { autoSubscribe: true });

      const join = await Promise.race([
        wait(8000, "remoteParticipantJoinTimeout"),
        createAgentJoinedPromise(),
      ]);

      if (join === "remoteParticipantJoinTimeout") {
        throw new Error("Participant did not join");
      }

      // Sometimes this is necessary for the publish events to go through
      await wait(500);

      await room.localParticipant.setMicrophoneEnabled(true);

      void room.startAudio();
    } catch (err) {
      void roomCache?.disconnect();
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
      setState({ isMicEnabled: micEnabled });
      if (roomCache != null)
        void roomCache.localParticipant.setMicrophoneEnabled(micEnabled);
    },
    async setSpeakers(speakersEnabled) {
      setState({ isSpeakersEnabled: speakersEnabled });
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
