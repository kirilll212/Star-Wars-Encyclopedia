import React from 'react';
import { Button } from 'react-bootstrap';

const CharacterItem = ({ character, onDelete }) => {
  return (
    <div className="character-item d-flex justify-content-between py-2 border-bottom">
      <span>{character.name}</span>
      <Button variant="danger" onClick={() => onDelete(character)}>
        Delete
      </Button>
    </div>
  );
};

export default CharacterItem;