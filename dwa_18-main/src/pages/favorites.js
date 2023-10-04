import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";

import FavoriteEpisodes from "../components/Favorites/FavoriteEpisodes";
import SortOptions from "../components/Favorites/SortOptions";
import "./favorite.css";

function FavoriteModal({ favoriteEpisodes }) {
  // Pass favoriteEpisodes as an array
  const [show, setShow] = useState(false);
  const [sortOrder, setSortOrder] = useState("ascending");
  const [sortType, setSortType] = useState("title");

  const handleClose = () => {
    setShow(false);
  };

  // Function to sort favorite episodes based on sortType and sortOrder
  const sortFavoriteEpisodes = () => {
    const sortedEpisodes = [...favoriteEpisodes];

    if (sortType === "title") {
      sortedEpisodes.sort((a, b) => {
        if (sortOrder === "ascending") {
          return a.title.localeCompare(b.title);
        } else {
          return b.title.localeCompare(a.title);
        }
      });
    } else if (sortType === "date") {
      sortedEpisodes.sort((a, b) => {
        if (sortOrder === "ascending") {
          return a.timestamp.localeCompare(b.timestamp);
        } else {
          return b.timestamp.localeCompare(a.timestamp);
        }
      });
    }

    return sortedEpisodes;
  };

  return (
    <>
      <Modal className="modal" show={show} fullscreen onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="title">Favorite Episodes</Modal.Title>
        </Modal.Header>
        <Modal.Body className="body">
          <SortOptions
            className="options"
            sortOrder={sortOrder}
            sortType={sortType}
            handleSortChange={(e) => setSortOrder(e.target.value)}
            handleSortTypeChange={(e) => setSortType(e.target.value)}
          />
          <FavoriteEpisodes favoriteEpisodes={sortFavoriteEpisodes()} />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default FavoriteModal;
