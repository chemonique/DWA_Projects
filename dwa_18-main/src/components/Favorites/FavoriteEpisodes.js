import React from "react";

function FavoriteEpisodes({ favoriteEpisodes }) {
  if (!favoriteEpisodes || favoriteEpisodes.length === 0) {
    return <div>No favorite episodes yet.</div>;
  }

  return (
    <div>
      {favoriteEpisodes.map((favEpisode) => (
        <div key={favEpisode.episode}>
          <p>
            Episode {favEpisode.episode}: {favEpisode.title}
          </p>
          <p>
            Show: {favEpisode.showId}, Season: {favEpisode.seasonNumber}
          </p>
          <p>Added on: {favEpisode.timestamp}</p>
        </div>
      ))}
    </div>
  );
}

export default FavoriteEpisodes;
