import React from "react";

import SeasonModal from "./Seasons/SeasonModal";
import genre_mapping from "./Genre/Genre";

// This is a functional component called ShowCard that takes several props.
function ShowCard({
  show,
  selectedGenre,
  fetchShowDetails,
  currentShowId,
  setCurrentShowId,
}) {
  return (
    <div className="card_item" key={show.id}>
      {/* Render an image and show title. */}
      <img src={show.image} alt={show.title} />
      <h2 className="title">{show.title}</h2>
      {/* Render the genres of the show based on 'genre_mapping'. */}
      <p>
        Genres:{" "}
        {show.genres
          .map((selectedGenre) => genre_mapping[selectedGenre])
          .join(", ")}
      </p>

      {/* Display the number of seasons and the last update date of the show. */}
      <p>Seasons: {show.seasons}</p>
      <p>Last Updated: {new Date(show.updated).toLocaleDateString()}</p>

      {/* Render a button to view more details and call 'fetchShowDetails' when clicked. */}
      <button className="seeMore" onClick={() => fetchShowDetails(show.id)}>
        View Details
      </button>

      {/* Render the SeasonModal component when 'currentShowId' matches 'show.id'. */}
      {currentShowId === show.id && (
        <div className="show-details">
          <div>
            {currentShowId === show.id && (
              <SeasonModal
                showId={show.id}
                img={show.image}
                title={show.title}
                description={show.description}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ShowCard;
