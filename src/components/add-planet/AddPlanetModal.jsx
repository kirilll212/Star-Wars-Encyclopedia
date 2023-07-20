import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const AddPlanetModal = ({ addPlanet }) => {
  const [show, setShow] = useState(false);
  const [newPlanet, setNewPlanet] = useState({
    name: '',
    climate: '',
    terrain: '',
    population: '',
  });

  const handleClose = () => {
    setShow(false);
    setNewPlanet({
      name: '',
      climate: '',
      terrain: '',
      population: '',
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewPlanet((prevPlanet) => ({
      ...prevPlanet,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addPlanet({ ...newPlanet });
    handleClose();
  };

  return (
    <>
      <Button variant="primary" onClick={() => setShow(true)}>
        Add Planet
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add new Planet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={newPlanet.name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="climate">
              <Form.Label>Climate</Form.Label>
              <Form.Control
                type="text"
                name="climate"
                value={newPlanet.climate}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="terrain">
              <Form.Label>Terrain</Form.Label>
              <Form.Control
                type="text"
                name="terrain"
                value={newPlanet.terrain}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="population">
              <Form.Label>Population</Form.Label>
              <Form.Control
                type="text"
                name="population"
                value={newPlanet.population}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Add
            </Button>
            <Button variant="outline-secondary" onClick={handleClose}>
              Close
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddPlanetModal;
