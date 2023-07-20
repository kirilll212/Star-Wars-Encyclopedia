import React from 'react';
import { Button } from 'react-bootstrap';

const StarshipItem = ({ starship, onDelete }) => {
  return (
    <div className="starship-item d-flex justify-content-between py-2 border-bottom">
      <span>{starship.name}</span>
      <Button variant="danger" onClick={() => onDelete(starship)}>
        Delete
      </Button>
    </div>
  );
};

export default StarshipItem;
