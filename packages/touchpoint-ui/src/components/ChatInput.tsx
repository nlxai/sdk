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
import { type ConversationHandler, type UploadUrl } from "@nlxai/chat-core";
import { clsx } from "clsx";

import { IconButton } from "./ui/IconButton";
import { ArrowForward, Attachment, Delete, Check, Error } from "./ui/Icons";

interface ChatInputProps {
  className?: string;
  handler: ConversationHandler;
  uploadUrl?: UploadUrl;
  onFileUpload: (val: { uploadId: string; file: File }) => void;
}

interface FileInfo {
  name: string;
  size: number;
  type: string;
}

const MAX_INPUT_FILE_SIZE_IN_MB = 8;

const ChatInput: FC<ChatInputProps> = ({
  className,
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
  const [fileInfo, setFileInfo] = useState<FileInfo | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const textInputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    textInputRef.current?.focus();
  }, []);

  const isInputEmpty = useMemo(() => {
    return inputValue.trim() === "";
  }, [inputValue]);

  const submit = (): void => {
    if (isInputEmpty) {
      return;
    }
    if (uploadUrl != null && fileInfo != null) {
      handler.sendStructured({
        uploadIds: [uploadUrl.uploadId],
        utterance: inputValue,
      });
    } else {
      handler.sendText(inputValue);
    }
    setInputValue("");
    setFileInfo(null);
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
    setFileInfo({ name, size, type });

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
    <div className="p-2">
      <div
        className={clsx(
          "bg-primary-5 transition-colors duration-200 p-2 rounded-plus text-base font-normal max-w-content mx-auto",
          isTextAreaInFocus || isUploadEnabled ? "" : "hover:bg-secondary-20",
          className,
        )}
      >
        {uploadErrorMessage != null && (
          <div className="flex items-center py-1 mb-2 w-full bg-error-secondary rounded-base">
            <Error size={16} />
            <span className="truncate ml-1">{uploadErrorMessage}</span>
          </div>
        )}
        {fileInfo && (
          <>
            <div className="flex items-center justify-between mb-2 w-full">
              <p className="flex items-center truncate mx-2">
                {uploadErrorMessage != null ? (
                  <Error size={16} className="text-error-primary" />
                ) : (
                  <Check size={16} />
                )}
                <span className="truncate ml-3">{fileInfo.name}</span>
              </p>
              <IconButton
                className="flex-none"
                Icon={Delete}
                label="Delete"
                onClick={
                  isUploadEnabled
                    ? () => {
                        setFileInfo(null);
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
          {isUploadEnabled ? (
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
            <IconButton
              className="flex-none"
              Icon={Attachment}
              label="Upload file"
              type="ghost"
            />
          )}
          <TextareaAutosize
            className="h-10 w-full resize-none mr-2 px-2 py-2 bg-transparent text-primary-80 placeholder:text-primary-40 outline-none caret-accent"
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
              isInputEmpty
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
    </div>
  );
};

export default ChatInput;
