import { useState } from "react";
import Modal from "react-bootstrap/Modal";

import ShowSeasons from "./ShowSeasons";
import classes from "./SeasonModal.module.css";

// This is a functional component called SeasonModal that takes some props.
function SeasonModal({ showId, img, title, description }) {
  // Initialize an array with a single boolean value 'true'.
  const values = [true];

  // Declare a state variable 'show' and a function 'setShow' to control the visibility of a modal.
  const [show, setShow] = useState(true);

  return (
    <>
      {/* This maps over the 'values' array and generates some text based on its elements. */}
      {values.map(
        (v, idx) => typeof v === "string" && `below ${v.split("-")[0]}`
      )}
      {/* Render a Bootstrap modal component with some content. */}
      <Modal show={show} fullscreen onHide={() => setShow(false)}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body className={classes.modal}>
          <img src={img} alt={title} className={classes.image} />
          <h2 className={classes.title}>{title}</h2>
          <p className={classes.description}>{description}</p>
          {/* Render the ShowSeasons component with a 'showId' prop. */}
          <ShowSeasons showId={showId} />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default SeasonModal;
