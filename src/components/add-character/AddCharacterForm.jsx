import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const AddCharacterModal = ({ addCharacter }) => {
  const [show, setShow] = useState(false);
  const [newCharacter, setNewCharacter] = useState({
    name: '',
    height: '',
    mass: '',
    hair_color: '',
    skin_color: '',
    eye_color: '',
    birth_year: '',
    gender: '',
  });

  const handleClose = () => {
    setShow(false);
    setNewCharacter({
      name: '',
      height: '',
      mass: '',
      hair_color: '',
      skin_color: '',
      eye_color: '',
      birth_year: '',
      gender: '',
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewCharacter((prevCharacter) => ({
      ...prevCharacter,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addCharacter({ ...newCharacter });
    handleClose();
  };  

  return (
    <>
      <Button variant="primary" onClick={() => setShow(true)}>
        Add Character
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add new Character</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={newCharacter.name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="height">
              <Form.Label>Height</Form.Label>
              <Form.Control
                type="text"
                name="height"
                value={newCharacter.height}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="mass">
              <Form.Label>Mass</Form.Label>
              <Form.Control
                type="text"
                name="mass"
                value={newCharacter.mass}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="hair_color">
              <Form.Label>Hair Color</Form.Label>
              <Form.Control
                type="text"
                name="hair_color"
                value={newCharacter.hair_color}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="skin_color">
              <Form.Label>Skin Color</Form.Label>
              <Form.Control
                type="text"
                name="skin_color"
                value={newCharacter.skin_color}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="eye_color">
              <Form.Label>Eyee Color</Form.Label>
              <Form.Control
                type="text"
                name="eye_color"
                value={newCharacter.eye_color}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="birth_year">
              <Form.Label>Birth Year</Form.Label>
              <Form.Control
                type="text"
                name="birth_year"
                value={newCharacter.birth_year}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="gender">
              <Form.Label>Select a Sex</Form.Label>
                <Form.Control
                  as="select"
                  name="gender"
                  value={newCharacter.gender}
                  onChange={handleInputChange}
                >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                </Form.Control>
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

export default AddCharacterModal;
