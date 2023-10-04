import React from "react";
import genre_mapping from "./Genre"; // Importing genre_mapping object
import classes from "./GenreButton.module.css";

// Functional component GenreButtons that displays a list of genre buttons
function GenreButtons({ selectedGenre, setSelectedGenre, filterByGenre }) {
  return (
    <div className={classes.list}>
      {/* Mapping through each entry in the genre_mapping object */}
      {Object.entries(genre_mapping).map(([genreId, genreTitle]) => (
        // Creating a button for each genre
        <button
          key={genreId} // Using genreId as the key for React rendering
          className={`${classes.button} ${
            selectedGenre === genreId ? "selected" : ""
          }`}
          onClick={() => filterByGenre(genreId)} // Calling filterByGenre when the button is clicked
        >
          {genreTitle} {/* Displaying the genre title as button text */}
        </button>
      ))}
    </div>
  );
}

export default GenreButtons; // Exporting the GenreButtons component for use in other parts of the application
