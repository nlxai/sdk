- [Quick Start](#quick-start)
  - [Immersive Voice Mode](#immersive-voice-mode)
  - [Compact Voice Mode (Voice Mini)](#compact-voice-mode-voice-mini)
- [Voice Input Options](#voice-input-options)
  - [Application and Touchpoint Prerequisites](#application-and-touchpoint-prerequisites)
- [When to Use Immersive Voice mode](#when-to-use-immersive-voice-mode)
- [When to use Voice Mini](#when-to-use-voice-mini)

## Quick Start

### Immersive Voice Mode

Full-screen voice interface for immersive conversations.

```touchpointui
const touchpoint = await create({
  config: {
    applicationUrl: "YOUR_APPLICATION_URL",
    headers: { "nlx-api-key": "YOUR_API_KEY" },
    languageCode: "en-US",
    userId: crypto.randomUUID(), // Required for voice
  },
  input: "voice", // Enable full voice mode
});
```

### Compact Voice Mode (Voice Mini)

Floating module for voice without taking over the screen.

```touchpointui
const touchpoint = await create({
  config: {
    applicationUrl: "YOUR_APPLICATION_URL",
    headers: { "nlx-api-key": "YOUR_API_KEY" },
    languageCode: "en-US",
    userId: crypto.randomUUID(), // Required for voice
  },
  input: "voiceMini", // Enable compact voice mode
});
```

## Voice Input Options

| Mode        | Description                                           | Best For                                                     |
| ----------- | ----------------------------------------------------- | ------------------------------------------------------------ |
| `voice`     | Full-screen voice interface with immersive experience | Primary voice interactions, voice-first applications         |
| `voiceMini` | Compact floating module with minimal controls         | Voice as a secondary input option, space-constrained layouts |

### Application and Touchpoint Prerequisites

All voice modes require:

| Item                      | Description                                                                |
| ------------------------- | -------------------------------------------------------------------------- |
| `config.userId`           | A unique identifier in your config (required for voice session management) |
| Voice-enabled Application | Your NLX application must be configured for voice on API channels          |
| Browser support           | WebRTC APIs must be available                                              |
| User permissions          | Microphone access must be granted when prompted                            |

## When to Use Immersive Voice mode

<img src="/animations/voiceinput.png" alt="Voice Mode Animation" style="max-width: 40%;">

Use **voice** when:

- Voice is the primary interaction method
- You want an immersive, focused experience
- Screen real estate isn't a concern
- The conversation is the main user activity

## When to use Voice Mini

<img src="/animations/voice-mini.png" alt="Voice Mini Mode Animation" style="max-width: 80%;">

Use **voiceMini** when:

- You're using Voice+ in Bidirectional mode
- Voice is an optional input method alongside other UI
- You need to preserve screen space
- Users need access to other page content during voice interaction
- You want a less intrusive voice option
