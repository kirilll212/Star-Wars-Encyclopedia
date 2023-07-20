import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import PlanetItem from './planetItem';

const PlanetListModal = ({ show, planets, onClose, onDelete }) => {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Added Planets</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {planets.length === 0 ? (
          <p>No planets added yet.</p>
        ) : (
          <ul>
            {planets.map((planet) => (
              <PlanetItem key={planet.name} planet={planet} onDelete={onDelete} />
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

export default PlanetListModal;
