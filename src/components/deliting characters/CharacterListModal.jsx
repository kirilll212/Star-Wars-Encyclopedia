import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import CharacterItem from './characterItem';

const CharacterListModal = ({ show, characters, onClose, onDelete }) => {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Added Characters</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {characters.length === 0 ? (
          <p>No characters added yet.</p>
        ) : (
          <ul>
            {characters.map((character) => (
              <CharacterItem key={character.name} character={character} onDelete={onDelete} />
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

export default CharacterListModal;
