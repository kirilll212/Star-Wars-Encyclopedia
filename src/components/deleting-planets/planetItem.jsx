import React from 'react';
import { Button } from 'react-bootstrap';

const PlanetItem = ({ planet, onDelete }) => {
  return (
    <div className="planet-item d-flex justify-content-between py-2 border-bottom">
      <span>{planet.name}</span>
      <Button variant="danger" onClick={() => onDelete(planet)}>
        Delete
      </Button>
    </div>
  );
};

export default PlanetItem;
