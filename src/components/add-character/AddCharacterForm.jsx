import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AddCharacterForm = ({ addCharacter }) => {
  const navigate = useNavigate();

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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewCharacter((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const character = { ...newCharacter };
    addCharacter(character);
    navigate('/');
  };

  return (
    <Container className="my-4">
      <h1 className="mb-4">Add New Character</h1>
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
            required
          />
        </Form.Group>
        <Form.Group controlId="mass">
          <Form.Label>Mass</Form.Label>
          <Form.Control
            type="text"
            name="mass"
            value={newCharacter.mass}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="hair_color">
          <Form.Label>Hair Color</Form.Label>
          <Form.Control
            type="text"
            name="hair_color"
            value={newCharacter.hair_color}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="skin_color">
          <Form.Label>Skin Color</Form.Label>
          <Form.Control
            type="text"
            name="skin_color"
            value={newCharacter.skin_color}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="eye_color">
          <Form.Label>Eye Color</Form.Label>
          <Form.Control
            type="text"
            name="eye_color"
            value={newCharacter.eye_color}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="birth_year">
          <Form.Label>Birth Year</Form.Label>
          <Form.Control
            type="text"
            name="birth_year"
            value={newCharacter.birth_year}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="gender">
          <Form.Label>Gender</Form.Label>
          <Form.Control
            as="select"
            name="gender"
            value={newCharacter.gender}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">
          Add Character
        </Button>
      </Form>
    </Container>
  );
};

export default AddCharacterForm;
