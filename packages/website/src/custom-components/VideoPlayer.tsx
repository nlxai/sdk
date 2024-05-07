import { type FC } from "react";

interface VideoPlayerProps {
  videoId: string;
}

const VideoPlayer: FC<VideoPlayerProps> = ({ videoId }) => {
  const videoSrc = `https://www.youtube.com/embed/${videoId}`;
  return (
    <iframe
      width="380"
      height="213"
      src={videoSrc}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  );
};

export default VideoPlayer;
