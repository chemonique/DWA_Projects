import React, { useEffect, useState } from "react";
import Fuse from "fuse.js";

import ShowCard from "../components/ShowCards";
import FilterBar from "../components/FilterBar";
import GenreButtons from "../components/Genre/GenreButtons";

import "./home.css";

function Home() {
  const [showsData, setShowsData] = useState([]);
  const [filteredShows, setFilteredShows] = useState([]);
  const [currentShowId, setCurrentShowId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("title-asc");
  const [isLoading, setIsLoading] = useState(true); // State for initial loading
  const [selectedGenre, setSelectedGenre] = useState(null);

  useEffect(() => {
    fetchAllShows();
  }, []);

  useEffect(() => {
    updateShowList();
  }, [showsData, searchTerm, sortBy, selectedGenre]);

  const fetchAllShows = async () => {
    try {
      const response = await fetch("https://podcast-api.netlify.app/shows");
      const data = await response.json();
      setShowsData(data);
      setIsLoading(false); // Data loading complete
    } catch (error) {
      console.error("Error fetching shows:", error);
      setIsLoading(false); // Data loading complete (even in case of error)
    }
  };

  const updateShowList = () => {
    let updatedFilteredShows = [...showsData];

    if (searchTerm !== "") {
      const fuse = new Fuse(updatedFilteredShows, {
        keys: ["title"],
        includeScore: true,
        threshold: 0.4,
      });
      const searchResults = fuse.search(searchTerm);
      updatedFilteredShows = searchResults.map((result) => result.item);
    }

    // Apply the selected genre filter
    if (selectedGenre !== null) {
      updatedFilteredShows = updatedFilteredShows.filter((show) =>
        show.genres.includes(selectedGenre)
      );
    }

    if (sortBy === "title-asc") {
      updatedFilteredShows.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "title-desc") {
      updatedFilteredShows.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sortBy === "date-asc") {
      updatedFilteredShows.sort(
        (a, b) => new Date(a.updated) - new Date(b.updated)
      );
    } else if (sortBy === "date-desc") {
      updatedFilteredShows.sort(
        (a, b) => new Date(b.updated) - new Date(a.updated)
      );
    }

    setFilteredShows(updatedFilteredShows);
  };

  const fetchShowDetails = async (showId) => {
    try {
      const response = await fetch(
        `https://podcast-api.netlify.app/id/${showId}`
      );
      const show = await response.json();

      setCurrentShowId(showId);
      // Set the show details state or update as needed
    } catch (error) {
      console.error("Error fetching show details:", error);
      // Handle error state
    }
  };

  const filterByGenre = (genreId) => {
    if (selectedGenre === genreId) {
      setSelectedGenre(null);
    } else {
      setSelectedGenre(genreId);
    }
  };

  return (
    <div>
      <FilterBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
      <GenreButtons
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
        filterByGenre={filterByGenre}
      />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="container">
          {filteredShows.map((show) => (
            <ShowCard
              key={show.id}
              show={show}
              selectedGenre={selectedGenre}
              fetchShowDetails={fetchShowDetails}
              currentShowId={currentShowId}
              setCurrentShowId={setCurrentShowId}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
