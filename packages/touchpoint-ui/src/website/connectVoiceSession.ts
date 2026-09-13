/* eslint-disable no-console */
/**
 * Audio-only WebRTC calling for Amazon Connect.
 *
 * `StartWebRTCContact` returns Amazon Chime SDK meeting and attendee join data,
 * which is passed to the Chime SDK verbatim to join the call. See
 * https://docs.aws.amazon.com/connect/latest/APIReference/API_StartWebRTCContact.html
 * and the official sample at
 * https://github.com/amazon-connect/amazon-connect-in-app-calling-examples
 */
import {
  ConsoleLogger,
  DefaultDeviceController,
  DefaultMeetingSession,
  LogLevel,
  MeetingSessionConfiguration,
  type MeetingSessionStatus,
} from "amazon-chime-sdk-js";

/** The `ConnectionData` field of a `StartWebRTCContact` response. */
export interface WebRtcConnectionData {
  /** Chime attendee join data for this participant. */
  Attendee: { AttendeeId: string; JoinToken: string };
  /** Chime meeting the call takes place in. */
  Meeting: { MeetingId: string; MediaRegion: string; MediaPlacement: unknown };
}

/** A `StartWebRTCContact` response, as returned by the backend proxy. */
export interface WebRtcContact {
  /** Everything needed to join the call's media session. */
  ConnectionData: WebRtcConnectionData;
  /** The identifier of the contact in the Connect instance. */
  ContactId: string;
  /** The identifier of this contact participant. */
  ParticipantId: string;
  /** Token for the participant APIs; not used to join the call itself. */
  ParticipantToken: string;
}

/** Parameters for starting a WebRTC contact. */
export interface WebRtcContactParams {
  /** Connect instance ID. */
  instanceId: string;
  /** Contact flow ID to use for the call. */
  contactFlowId: string;
  /** Customer display name shown to the agent. */
  participantDisplayName: string;
}

/**
 * Requests WebRTC connection credentials from a backend route that forwards the
 * body to `StartWebRTCContact`. Connect's own API is `PUT /contact/webrtc` and
 * requires SigV4 signing, so the browser cannot call it directly; the backend
 * issues that request (via `StartWebRTCContactCommand` in
 * `@aws-sdk/client-connect`) and returns the response as-is.
 *
 * The body uses the Connect API's field names on the assumption that the backend
 * passes it through. `AllowedCapabilities` is intentionally omitted: capabilities
 * are additive, so sending none requests an audio-only contact.
 */
export const startWebRtcContact = async (
  endpoint: string,
  { instanceId, contactFlowId, participantDisplayName }: WebRtcContactParams,
): Promise<WebRtcContact> => {
  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      InstanceId: instanceId,
      ContactFlowId: contactFlowId,
      ParticipantDetails: { DisplayName: participantDisplayName },
    }),
  });

  if (!res.ok) {
    throw new Error(
      `StartWebRTCContact endpoint returned ${res.status}: ${await res.text()}`,
    );
  }

  const data = await res.json();
  // Unwrap a `{ data: ... }` envelope if the backend adds one, as the
  // StartChatContact Lambda in this repo's setup does.
  const contact: WebRtcContact = data?.data ?? data;

  if (contact?.ConnectionData?.Meeting == null) {
    // A StartChatContact response has no ConnectionData at all, so this is what
    // a route wired to the wrong Connect API looks like.
    throw new Error(
      `StartWebRTCContact response is missing ConnectionData.Meeting. Does ${endpoint} call StartWebRTCContact? Received: ${JSON.stringify(
        data,
      )}`,
    );
  }

  return contact;
};

/** A joined voice call. */
export interface VoiceSession {
  /** Mutes or unmutes the local microphone. Returns the resulting muted state. */
  toggleMute: () => boolean;
  /** Leaves the call and releases the microphone. */
  leave: () => Promise<void>;
}

/** Options for joining a voice call. */
export interface JoinVoiceSessionOptions {
  /** Join data from the `StartWebRTCContact` response. */
  connectionData: WebRtcConnectionData;
  /** Remote audio is played through this element, which must be in the DOM. */
  audioElement: HTMLAudioElement;
  /** Called once the session is connected and audio is flowing. */
  onStart?: () => void;
  /** Called when the session ends, whether locally or remotely. */
  onStop?: (status: MeetingSessionStatus) => void;
}

/**
 * Joins the Chime meeting behind a WebRTC contact as an audio-only participant.
 * The Chime SDK talks only to the meeting's media URLs; it never calls Connect.
 *
 * Resolves once the microphone is acquired and connecting has begun, not once
 * the call is live — wait for `onStart` for that.
 */
export const joinVoiceSession = async ({
  connectionData,
  audioElement,
  onStart,
  onStop,
}: JoinVoiceSessionOptions): Promise<VoiceSession> => {
  const logger = new ConsoleLogger("ConnectVoice", LogLevel.WARN);
  const deviceController = new DefaultDeviceController(logger);
  const configuration = new MeetingSessionConfiguration(
    connectionData.Meeting,
    connectionData.Attendee,
  );
  const { audioVideo } = new DefaultMeetingSession(
    configuration,
    logger,
    deviceController,
  );

  audioVideo.addObserver({
    audioVideoDidStart: () => {
      console.log("Voice session started");
      onStart?.();
    },
    audioVideoDidStop: (status) => {
      console.log("Voice session stopped", status.statusCode());
      onStop?.(status);
    },
    audioVideoDidStartConnecting: (reconnecting) => {
      console.log(reconnecting ? "Voice session reconnecting" : "Connecting");
    },
  });

  // Listing devices triggers the microphone permission prompt. The input must be
  // chosen before starting the session so the user can be offered alternatives
  // if the default device is unusable.
  const microphones = await deviceController.listAudioInputDevices();
  if (microphones.length === 0) {
    throw new Error("No microphone available");
  }
  await audioVideo.startAudioInput(microphones[0].deviceId);
  await audioVideo.bindAudioElement(audioElement);

  audioVideo.start();

  return {
    toggleMute: () => {
      if (audioVideo.realtimeIsLocalAudioMuted()) {
        audioVideo.realtimeUnmuteLocalAudio();
        return false;
      }
      audioVideo.realtimeMuteLocalAudio();
      return true;
    },
    leave: async () => {
      audioVideo.stop();
      await audioVideo.stopAudioInput();
      audioVideo.unbindAudioElement();
    },
  };
};
