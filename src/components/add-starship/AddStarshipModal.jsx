import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const AddStarshipModal = ({ addStarship }) => {
  const [show, setShow] = useState(false);
  const [newStarship, setNewStarship] = useState({
    name: '',
    model: '',
    manufacturer: '',
    crew: '',
    passengers: '',
    starship_class: '',
  });

  const handleClose = () => {
    setShow(false);
    setNewStarship({
      name: '',
      model: '',
      manufacturer: '',
      crew: '',
      passengers: '',
      starship_class: '',
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewStarship((prevStarship) => ({
      ...prevStarship,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addStarship({ ...newStarship });
    handleClose();
  };

  return (
    <>
      <Button variant="primary" onClick={() => setShow(true)}>
        Add Starship
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add new Starship</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={newStarship.name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="model">
              <Form.Label>Model</Form.Label>
              <Form.Control
                type="text"
                name="model"
                value={newStarship.model}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="manufacturer">
              <Form.Label>Manufacturer</Form.Label>
              <Form.Control
                type="text"
                name="manufacturer"
                value={newStarship.manufacturer}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="crew">
              <Form.Label>Crew</Form.Label>
              <Form.Control
                type="text"
                name="crew"
                value={newStarship.crew}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="passengers">
              <Form.Label>Passengers</Form.Label>
              <Form.Control
                type="text"
                name="passengers"
                value={newStarship.passengers}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="starship_class">
              <Form.Label>Starship Class</Form.Label>
              <Form.Control
                type="text"
                name="starship_class"
                value={newStarship.starship_class}
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

export default AddStarshipModal;
