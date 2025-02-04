/* eslint-disable jsdoc/require-jsdoc */
import { type FC } from "react";
import { IconButton } from "./IconButton";
import { Close } from "./Icons";

interface ViewMediaModalProps {
  onClose: () => void;
  src: string;
  type: "picture" | "video";
}

const ViewMediaModal: FC<ViewMediaModalProps> = ({ onClose, src, type }) => {
  return (
    <div className="absolute inset-0 bg-black/50 z-10" onClick={onClose}>
      {type === "picture" && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-72 w-72 rounded-inner overflow-hidden">
          <IconButton
            type="ghost"
            Icon={Close}
            onClick={onClose}
            label="Close"
          />
          <img src={src} alt="" className="w-full h-full object-cover" />
        </div>
      )}
    </div>
  );
};

export default ViewMediaModal;
