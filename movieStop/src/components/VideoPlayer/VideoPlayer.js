import React, { useRef, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faExpand,
  faPause,
  faPlay,
  faVolumeHigh,
  faVolumeMute,
} from "@fortawesome/free-solid-svg-icons";

import video from "assets/video/sample.mp4";

const VideoPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [showVolumeBar, setShowVolumeBar] = useState(false);
  const videoRef = useRef(null);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    isPlaying ? videoRef.current.pause() : videoRef.current.play();
  };

  const handleDurationUpdate = () => {
    setDuration(videoRef.current.duration);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleSeek = (e) => {
    videoRef.current.currentTime = e.target.value;
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleMute = () => {
    setIsMuted(!isMuted);
    isMuted
      ? (videoRef.current.volume = volume)
      : (videoRef.current.volume = 0);
    setShowVolumeBar(true);
  };

  const handleVolume = (e) => {
    setVolume(e.target.value);
    videoRef.current.volume = e.target.value;
    setIsMuted(e.target.value === 0);
  };

  const handleFullScreen = () => {
    videoRef.current.requestFullscreen();
  };

  const handleVolumeBarClick = (e) => {
    e.stopPropagation();
  };

  return (
    <>
      <video
        ref={videoRef}
        src={video}
        className="w-100 p-0 m-0"
        onLoadedMetadata={handleDurationUpdate}
        onTimeUpdate={handleTimeUpdate}
        onClick={handlePlayPause}
      />
      <div className="d-flex bg-black align-items-center video-controls position-relative">
        <div>
          <button
            onClick={handlePlayPause}
            className="btn bg-black border-0 text-primary w-100 text-center fs-6"
          >
            {isPlaying ? (
              <FontAwesomeIcon icon={faPause} />
            ) : (
              <FontAwesomeIcon icon={faPlay} />
            )}
          </button>
        </div>
        <div className="flex-grow-1">
          <input
            type="range"
            min={0}
            max={duration}
            value={currentTime}
            onChange={handleSeek}
            className="w-100"
          />
        </div>
        <div className="position-relative">
          <button
            onClick={handleMute}
            onMouseEnter={() => setShowVolumeBar(true)}
            onMouseLeave={() => setShowVolumeBar(false)}
            className="btn bg-black border-0 text-primary"
          >
            {isMuted ? (
              <FontAwesomeIcon icon={faVolumeMute} />
            ) : (
              <FontAwesomeIcon icon={faVolumeHigh} />
            )}
          </button>
          {showVolumeBar ? (
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={isMuted ? 0 : volume}
              onClick={handleVolumeBarClick}
              onMouseEnter={() => setShowVolumeBar(true)}
              onMouseLeave={() => setShowVolumeBar(false)}
              onChange={handleVolume}
              className="position-absolute volume-bar"
            />
          ) : null}
        </div>
        <button
          onClick={handleFullScreen}
          className="btn bg-black border-0 text-primary"
        >
          <FontAwesomeIcon icon={faExpand} />
        </button>
      </div>
    </>
  );
};

export default VideoPlayer;
