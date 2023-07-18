import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Card, Container, Row, Col, Nav, Modal, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const SWAPI_BASE_URL = 'https://swapi.dev/api';

const Encyclopedia = (characters) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [activeTab, setActiveTab] = useState('characters');
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [characterData, setCharacterData] = useState([]);
  const [planetData, setPlanetData] = useState([]);
  const [starshipData, setStarshipData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const characterResponse = await axios.get(`${SWAPI_BASE_URL}/people/`);
      setCharacterData(characterResponse.data.results);

      const planetResponse = await axios.get(`${SWAPI_BASE_URL}/planets/`);
      setPlanetData(planetResponse.data.results);

      const starshipResponse = await axios.get(`${SWAPI_BASE_URL}/starships/`);
      setStarshipData(starshipResponse.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const searchItems = async () => {
    try {
      let url = '';
      switch (activeTab) {
        case 'characters':
          url = `${SWAPI_BASE_URL}/people/?search=${searchTerm}`;
          break;
        case 'planets':
          url = `${SWAPI_BASE_URL}/planets/?search=${searchTerm}`;
          break;
        case 'starships':
          url = `${SWAPI_BASE_URL}/starships/?search=${searchTerm}`;
          break;
        default:
          break;
      }

      if (url) {
        const response = await axios.get(url);
        setSearchResults(response.data.results);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchTerm('');
    setSearchResults([]);
  };

  const handleCardClick = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedItem(null);
  };

  const getTabData = () => {
    switch (activeTab) {
      case 'characters':
        return characterData;
      case 'planets':
        return planetData;
      case 'starships':
        return starshipData;
      default:
        return [];
    }
  };

  const handleAddCharacter = () => {
    navigate('/add-character');
  };

  return (
    <Container className="my-4">
      <h1 className="mb-4">Star Wars Encyclopedia</h1>
      <Nav variant="tabs" activeKey={activeTab} onSelect={handleTabChange} className="mb-3">
        <Nav.Item>
          <Nav.Link eventKey="characters">Characters</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="planets">Planets</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="starships">Starships</Nav.Link>
        </Nav.Item>
      </Nav>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <Form>
          <Form.Group controlId="searchForm" className="mb-3">
            <Form.Control
              type="text"
              placeholder={`Search for ${activeTab}`}
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </Form.Group>
          <Button variant="primary" onClick={searchItems}>
            Search
          </Button>
        </Form>
        {activeTab === 'characters' && (
          <Button variant="primary" onClick={handleAddCharacter}>
            Add Character
          </Button>
        )}
      </div>
      <Row xs={1} md={2} lg={3} xl={4} className="g-4">
        {searchResults.length > 0
          ? searchResults.map((item, index) => (
              <Col key={index}>
                <Card className="h-100" onClick={() => handleCardClick(item)}>
                  <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>
                      <strong>Height:</strong> {item.height}
                    </Card.Text>
                    <Card.Text>
                      <strong>Mass:</strong> {item.mass}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))
          : getTabData().map((item, index) => (
              <Col key={index}>
                <Card className="h-100" onClick={() => handleCardClick(item)}>
                  <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>
                      <strong>Height:</strong> {item.height}
                    </Card.Text>
                    <Card.Text>
                      <strong>Mass:</strong> {item.mass}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
      </Row>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedItem && (
            <div>
              {Object.keys(selectedItem).map((key, index) => (
                <p key={index}>
                  <strong>{key}:</strong> {selectedItem[key]}
                </p>
              ))}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Encyclopedia;
