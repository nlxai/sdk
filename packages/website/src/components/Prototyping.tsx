import { type FC, useRef, useEffect } from "react";

const runJourneyManager = async (): Promise<unknown> => {
  const { run } = await import("@nlxai/journey-manager");
  await run({
    config: {
      apiKey: "",
      journeyId: "",
      workspaceId: "",
      conversationId: "abcd",
      languageCode: "en-US",
    },
    ui: {
      title: "Call Control Center",
      subtitle: "Manage your call experience with us",
      escalationStep: "abcd-1234",
      highlights: true,
      endStep: "1234-1234",
      theme: {
        fontFamily: "'Neue Haas Grotesk'",
      },
    },
    triggers: {},
  });
  return null;
};

export const Prototyping: FC<unknown> = () => {
  const isRun = useRef(false);

  useEffect(() => {
    if (isRun.current) {
      return;
    }
    isRun.current = true;
    runJourneyManager().catch((err) => {
      // eslint-disable-next-line no-console
      console.warn(err);
    });
  }, []);

  return <p>Hello</p>;
};
