import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import StarshipItem from './starshipItem';

const StarshipListModal = ({ show, starships, onClose, onDelete }) => {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Added Starships</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {starships.length === 0 ? (
          <p>No starships added yet.</p>
        ) : (
          <ul>
            {starships.map((starship) => (
              <StarshipItem key={starship.name} starship={starship} onDelete={onDelete} />
            ))}
          </ul>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default StarshipListModal;
