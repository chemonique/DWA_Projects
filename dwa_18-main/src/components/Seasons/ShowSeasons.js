import React, { useState, useEffect } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import classes from "./ShowSeasons.module.css";
import SeasonEpisodes from "../Episodes/ShowEpisodes";

function ShowSeasons({ showId }) {
  // State variables for managing seasons and episode display
  const [seasons, setSeasons] = useState([]);
  const [showEpisodes, setShowEpisodes] = useState(false);
  const [epiShowId, setEpiShowId] = useState(null);

  // State variables for selected season, user confirmation, and loading status
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [userConfirmation, setUserConfirmation] = useState(true);
  const [loading, setLoading] = useState(true);

  // Fetch data about seasons using useEffect when 'showId' or 'userConfirmation' changes
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `https://podcast-api.netlify.app/id/${showId}`
        );
        const data = await response.json();
        setSeasons(data.seasons);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching seasons:", error);
      }
    }

    fetchData();
  }, [showId, userConfirmation]);

  // Function to fetch season episodes and set 'showEpisodes' and 'epiShowId' state
  const fetchSeasonEpisodes = (showId) => {
    setShowEpisodes(true);
    setEpiShowId(showId);
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {/* Dropdown to select a season */}
          <Dropdown className={classes.optionSeason}>
            <Dropdown.Toggle variant="secondary" id="season-dropdown">
              Select Season
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {seasons.map((season) => (
                <Dropdown.Item
                  key={season.season}
                  onClick={() => setSelectedSeason(season)}
                >
                  Season {season.season}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          {selectedSeason && (
            <div className={classes.showseasons}>
              <div className={classes.details}>
                {/* Display season details */}
                <img
                  src={selectedSeason.image}
                  alt={`Season ${selectedSeason.season}`}
                  className={classes.image}
                />
                <h3>Season {selectedSeason.season}</h3>
                <h4>{selectedSeason.title}</h4>
                <p>Episodes: {selectedSeason.episodes.length}</p>
              </div>
              {showEpisodes ? (
                // Render SeasonEpisodes component if 'showEpisodes' is true
                <SeasonEpisodes
                  showId={showId}
                  seasonNumber={selectedSeason.season}
                />
              ) : (
                // Display a button to view episodes
                <Button
                  className={classes.button}
                  variant="secondary"
                  onClick={() =>
                    fetchSeasonEpisodes(showId, selectedSeason.season)
                  }
                >
                  View Episodes
                </Button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ShowSeasons;
