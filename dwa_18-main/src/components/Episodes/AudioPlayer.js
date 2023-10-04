import React, { useState, useEffect } from "react";

function AudioPlayer({
  playingEpisode,
  handlePlay,
  handlePause,
  resetProgress,
  saveProgress,
}) {
  // Local state to track playback time and duration
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Event listeners to track playback time and duration
    const audioPlayer = document.getElementById("audio-player");
    if (audioPlayer) {
      audioPlayer.addEventListener("timeupdate", () => {
        setCurrentTime(audioPlayer.currentTime);
      });
      audioPlayer.addEventListener("durationchange", () => {
        setDuration(audioPlayer.duration);
      });
      audioPlayer.addEventListener("playing", () => {
        setShowModal(true);
      });
      audioPlayer.addEventListener("pause", () => {
        setShowModal(false);
      });

      // Initialize currentTime and duration
      setCurrentTime(audioPlayer.currentTime);
      setDuration(audioPlayer.duration);
    }

    // Cleanup event listeners when unmounting
    return () => {
      if (audioPlayer) {
        audioPlayer.removeEventListener("timeupdate", () => {});
        audioPlayer.removeEventListener("durationchange", () => {});
        audioPlayer.removeEventListener("playing", () => {});
        audioPlayer.removeEventListener("pause", () => {});
      }
    };
  }, []);

  // Handle stopping playback and saving progress
  const handleStop = () => {
    saveProgress(playingEpisode.episode, currentTime);
    handlePause();
  };

  // Function to handle modal confirmation
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Format seconds as a timestamp (hh:mm:ss)
  const formatTimestamp = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(remainingSeconds).padStart(2, "0")}`;
  };

  return (
    <div>
      {/* Modal to confirm closing the audio player */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <p>Are you sure you want to close the audio player?</p>
            <button onClick={handleCloseModal}>Cancel</button>
          </div>
        </div>
      )}
      {/* Audio player component */}
      <audio controls>
        <source src={playingEpisode.file} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}

export default AudioPlayer;
