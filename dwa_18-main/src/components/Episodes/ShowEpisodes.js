import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import FavoriteModal from "../../pages/favorites";
import AudioPlayer from "./AudioPlayer";
import classes from "./ShowEpisodes.module.css";

function SeasonEpisodes({ showId, seasonNumber }) {
  // State variables for episodes, loading status, favorite episodes, playing episode, and user progress
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favoriteEpisodes, setFavoriteEpisodes] = useState([]);
  const [playingEpisode, setPlayingEpisode] = useState(null);
  const [userProgress, setUserProgress] = useState({});

  useEffect(() => {
    // Fetch episodes and load user progress on component mount
    fetchSeasonEpisodes(showId, seasonNumber);
    loadUserProgress();
  }, [showId, seasonNumber]);

  // Function to fetch episodes for a season
  const fetchSeasonEpisodes = async (showId, seasonNumber) => {
    try {
      const response = await fetch(
        `https://podcast-api.netlify.app/id/${showId}`
      );
      const data = await response.json();
      const { episodes } = data.seasons[seasonNumber - 1];
      setEpisodes(episodes);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching episodes:", error);
    }
  };

  // Toggle favorite status of an episode
  const toggleFavorite = (episodeNumber) => {
    if (favoriteEpisodes.find((ep) => ep.episode === episodeNumber)) {
      // Remove episode from favorites
      setFavoriteEpisodes((prevFavorites) =>
        prevFavorites.filter((ep) => ep.episode !== episodeNumber)
      );
    } else {
      // Add episode to favorites with show and season information and timestamp
      const episodeToAdd = episodes.find((ep) => ep.episode === episodeNumber);
      if (episodeToAdd) {
        setFavoriteEpisodes((prevFavorites) => [
          ...prevFavorites,
          {
            episode: episodeNumber,
            title: episodeToAdd.title,
            showId: showId,
            seasonNumber: seasonNumber,
            timestamp: new Date().toISOString(), // Timestamp when added
          },
        ]);
      }
    }
  };

  // Handle playing an episode
  const handlePlayEpisode = (episode) => {
    setPlayingEpisode(episode);
  };

  // Handle user progress saving
  const saveProgress = (episodeNumber, currentTime) => {
    setUserProgress((prevProgress) => ({
      ...prevProgress,
      [episodeNumber]: currentTime,
    }));
  };

  // Load user progress from storage
  const loadUserProgress = () => {
    const storedProgress = localStorage.getItem("userProgress");
    if (storedProgress) {
      setUserProgress(JSON.parse(storedProgress));
    }
  };

  // Prompt before closing the page when audio is playing
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (playingEpisode) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [playingEpisode]);

  // Save user progress when unmounting the component
  useEffect(() => {
    return () => {
      if (playingEpisode) {
        saveProgress(playingEpisode.episode, playingEpisode.currentTime);
      }
      // Save user progress to storage
      localStorage.setItem("userProgress", JSON.stringify(userProgress));
    };
  }, [playingEpisode, userProgress]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Map through episodes and render each episode as a Card */}
      {episodes.map((episode) => (
        <Card key={episode.episode} className={classes.body}>
          <Card.Header className={classes.header}>
            Episode: {episode.episode}
          </Card.Header>
          <Card.Body>
            <Card.Title>{episode.title}</Card.Title>
            <Card.Text>{episode.description}</Card.Text>
            {/* Button to play an episode */}
            <Button
              className={classes.button}
              variant="secondary"
              onClick={() => handlePlayEpisode(episode)}
            >
              Play{" "}
            </Button>
            <Button
              className={classes.button}
              variant="secondary"
              onClick={() => toggleFavorite(episode.episode)}
            >
              {favoriteEpisodes.find((ep) => ep.episode === episode.episode)
                ? "Remove from Favorites"
                : "Add to Favorites"}
            </Button>
            {/* Render AudioPlayer for the currently playing episode */}
            {playingEpisode && playingEpisode.episode === episode.episode && (
              <AudioPlayer
                playingEpisode={playingEpisode}
                handlePlay={handlePlayEpisode}
                saveProgress={saveProgress}
                userProgress={userProgress}
              />
            )}
            {/* Display a modal for managing favorite episodes */}
            <FavoriteModal favoriteEpisodes={favoriteEpisodes} />
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default SeasonEpisodes;
