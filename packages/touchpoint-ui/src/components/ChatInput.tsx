/* eslint-disable jsdoc/require-jsdoc */
import {
  type ChangeEventHandler,
  type FC,
  useRef,
  useState,
  useMemo,
  useEffect,
} from "react";
import TextareaAutosize from "react-textarea-autosize";
import {
  type ConversationHandler,
  type UploadUrl,
  type Subscriber,
} from "@nlxai/chat-core";
import { clsx } from "clsx";

import { IconButton } from "./ui/IconButton";
import { ArrowForward, Attachment, Delete, Check, Error } from "./ui/Icons";
import { type ChoiceMessage } from "../types";
import { MessageChoices } from "./ChatMessages";
import { useTailwindMediaQuery } from "../hooks";

interface ChatInputProps {
  className?: string;
  handler: ConversationHandler;
  uploadUrl?: UploadUrl;
  onFileUpload: (val: { uploadId: string; file: File }) => void;
  choiceMessage?: ChoiceMessage;
}

interface FileInfo {
  name: string;
  size: number;
  type: string;
}

const MAX_INPUT_FILE_SIZE_IN_MB = 8;

const ChatInput: FC<ChatInputProps> = ({
  className,
  choiceMessage,
  handler,
  uploadUrl,
  onFileUpload,
}) => {
  // Text state
  const [isTextAreaInFocus, setIsTextAreaInFocus] = useState(false);
  const [inputValue, setInputValue] = useState("");

  // Upload state
  const [uploadErrorMessage, setUploadErrorMessage] = useState<string | null>(
    null,
  );
  const [uploadedFileInfo, setUploadedFileInfo] = useState<FileInfo | null>(
    null,
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const textInputRef = useRef<HTMLTextAreaElement>(null);

  const isMd = useTailwindMediaQuery("md");

  // Autofocus input on desktop only
  useEffect(() => {
    if (isMd) {
      textInputRef.current?.focus();
    }
  }, [isMd]);

  const isInputEmpty = useMemo(() => {
    return inputValue.trim() === "";
  }, [inputValue]);

  const [isWaiting, setIsWaiting] = useState<boolean>(false);

  const inputMessageSendDisabled =
    (isInputEmpty && uploadedFileInfo == null) || isWaiting;

  const submit = (): void => {
    if (inputMessageSendDisabled) {
      return;
    }

    // Before sending a bot message, subscribe to its response and clear the input only then
    const subscriber: Subscriber = (_responses, newResponse) => {
      if (newResponse?.type === "bot") {
        setIsWaiting(false);
        handler.unsubscribe(subscriber);
        setInputValue("");
        setUploadedFileInfo(null);
        if (isMd) {
          setTimeout(() => {
            textInputRef.current?.focus();
          });
        }
      }
    };
    handler.subscribe(subscriber);

    setIsWaiting(true);

    if (uploadUrl != null && uploadedFileInfo != null) {
      handler.sendStructured({
        uploadIds: [uploadUrl.uploadId],
        utterance: inputValue,
      });
    } else {
      handler.sendText(inputValue);
    }
  };

  const isUploadEnabled = uploadUrl != null;

  const setGenericUploadError = (): void => {
    setUploadErrorMessage("Something went wrong. Please try again.");
  };

  const uploadFile: ChangeEventHandler<HTMLInputElement> = (e): void => {
    if (uploadUrl == null) {
      setGenericUploadError();
      return;
    }
    const file = e.target?.files?.[0];
    if (file == null) {
      setGenericUploadError();
      return;
    }

    const { name, size, type } = file;
    setUploadedFileInfo({ name, size, type });

    if (size / 1024 ** 2 > MAX_INPUT_FILE_SIZE_IN_MB) {
      setUploadErrorMessage(
        `The file is too big. Max file size: ${MAX_INPUT_FILE_SIZE_IN_MB}mb`,
      );
      return;
    }

    fetch(uploadUrl.url, {
      method: "PUT",
      headers: {
        // TODO: handle other file formats
        "Content-Type": "image/jpeg",
      },
      body: file,
    })
      .then(() => {
        setUploadErrorMessage(null);
        onFileUpload({ uploadId: uploadUrl.uploadId, file });
      })
      .catch(() => {
        setGenericUploadError();
      });
  };

  return (
    <div className={clsx("p-2 md:p-3 relative", className)}>
      {choiceMessage != null ? (
        <MessageChoices
          {...choiceMessage}
          handler={handler}
          className={clsx(
            "absolute inset-x-0 z-10 top-0 transform -translate-y-full px-2 md:px-3",
            choiceMessage.message.selectedChoiceId != null
              ? "md:top-2"
              : "md:top-1",
          )}
        />
      ) : null}
      {choiceMessage?.message.selectedChoiceId != null ? null : (
        <div
          className={clsx(
            "bg-primary-5 transition-colors duration-200 p-2 rounded-plus text-base font-normal",
            isTextAreaInFocus ? "" : "hover:bg-secondary-20",
          )}
        >
          {uploadErrorMessage != null && (
            <div className="flex items-center py-1 mb-2 w-full bg-error-secondary rounded-base">
              <Error size={16} />
              <span className="truncate ml-1">{uploadErrorMessage}</span>
            </div>
          )}
          {uploadedFileInfo && (
            <>
              <div className="flex items-center justify-between mb-2 w-full">
                <p className="flex items-center truncate mx-2">
                  {uploadErrorMessage != null ? (
                    <Error size={16} className="text-error-primary" />
                  ) : (
                    <Check size={16} className="text-primary-60" />
                  )}
                  <span className="truncate ml-3">{uploadedFileInfo.name}</span>
                </p>
                <IconButton
                  className="flex-none"
                  Icon={Delete}
                  label="Delete"
                  onClick={
                    isUploadEnabled
                      ? () => {
                          setUploadedFileInfo(null);
                          setUploadErrorMessage(null);
                          if (fileInputRef.current != null) {
                            fileInputRef.current.value = "";
                          }
                        }
                      : undefined
                  }
                  type="ghost"
                />
              </div>
              <hr className="border-b-px border-background mb-2 -mx-2" />
            </>
          )}
          <div className={clsx("flex items-end")}>
            {isUploadEnabled && uploadedFileInfo == null ? (
              <>
                <label
                  htmlFor="file-upload"
                  className="p-3 w-10 h-10 flex-none block transition-colors rounded-base bg-primary-80 hover:bg-primary-80 text-secondary-80 cursor-pointer"
                >
                  <Attachment />
                </label>
                <input
                  type="file"
                  id="file-upload"
                  className="sr-only"
                  accept=".jpg, .jpeg, .png, .webp, .mp4, .mpeg4, .avi, .mov, .pdf"
                  onChange={uploadFile}
                  ref={fileInputRef}
                />
              </>
            ) : (
              /* Disabled attachment button */
              <IconButton
                className="flex-none"
                Icon={Attachment}
                label="Upload file"
                type="ghost"
              />
            )}
            <TextareaAutosize
              disabled={isWaiting}
              className={clsx(
                "h-10 w-full resize-none mr-2 px-2 py-2 outline-none",
                "bg-transparent text-primary-80 placeholder:text-primary-40 caret-accent",
                "disabled:text-primary-40",
              )}
              placeholder="Type something"
              maxRows={10}
              onFocus={() => {
                setIsTextAreaInFocus(true);
              }}
              onBlur={() => {
                setIsTextAreaInFocus(false);
              }}
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  submit();
                }
              }}
              ref={textInputRef}
            />
            <IconButton
              className="flex-none"
              label="Send message"
              onClick={
                inputMessageSendDisabled
                  ? undefined
                  : () => {
                      submit();
                    }
              }
              type="main"
              Icon={ArrowForward}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatInput;
