import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Card, Container, Row, Col, Nav, Modal } from 'react-bootstrap';
import AddCharacterModal from './add-character/AddCharacterForm';

const SWAPI_BASE_URL = 'https://swapi.dev/api';

const Encyclopedia = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [activeTab, setActiveTab] = useState('characters');
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [characterData, setCharacterData] = useState([]);
  const [planetData, setPlanetData] = useState([]);
  const [starshipData, setStarshipData] = useState([]);
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const characterResponse = await axios.get(`${SWAPI_BASE_URL}/people/`);
        isMounted && setCharacterData(characterResponse.data.results);

        const planetResponse = await axios.get(`${SWAPI_BASE_URL}/planets/`);
        isMounted && setPlanetData(planetResponse.data.results);

        const starshipResponse = await axios.get(`${SWAPI_BASE_URL}/starships/`);
        isMounted && setStarshipData(starshipResponse.data.results);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    setCharacterData((prevData) => [...prevData, ...characters]);
  }, [characters]);

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

  const addCharacter = (newCharacter) => {
    setCharacters([...characters, newCharacter]);
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
      <Form>
        <Form.Group controlId="searchForm" className="mb-3">
          <Form.Control
            type="text"
            placeholder={`Search for ${activeTab}`}
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </Form.Group>
        <Button variant="primary" onClick={searchItems} className="mb-3">
          Search
        </Button>
      </Form>
      <Row xs={1} md={2} lg={3} xl={4} className="g-4">
        {searchResults.length > 0
          ? searchResults.map((item, index) => (
              <Col key={index}>
                <Card className="h-100" onClick={() => handleCardClick(item)}>
                  <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    {activeTab === 'characters' && (
                      <>
                        <Card.Text>Height: {item.height}</Card.Text>
                        <Card.Text>Mass: {item.mass}</Card.Text>
                      </>
                    )}
                    {activeTab === 'planets' && (
                      <>
                        <Card.Text>Population: {item.population}</Card.Text>
                        <Card.Text>Terrain: {item.terrain}</Card.Text>
                      </>
                    )}
                    {activeTab === 'starships' && (
                      <>
                        <Card.Text>Model: {item.model}</Card.Text>
                        <Card.Text>Manufacturer: {item.manufacturer}</Card.Text>
                      </>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            ))
          : getTabData().map((item, index) => (
              <Col key={index}>
                <Card className="h-100" onClick={() => handleCardClick(item)}>
                  <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    {activeTab === 'characters' && (
                      <>
                        <Card.Text>Height: {item.height}</Card.Text>
                        <Card.Text>Mass: {item.mass}</Card.Text>
                      </>
                    )}
                    {activeTab === 'planets' && (
                      <>
                        <Card.Text>Population: {item.population}</Card.Text>
                        <Card.Text>Terrain: {item.terrain}</Card.Text>
                      </>
                    )}
                    {activeTab === 'starships' && (
                      <>
                        <Card.Text>Model: {item.model}</Card.Text>
                        <Card.Text>Manufacturer: {item.manufacturer}</Card.Text>
                      </>
                    )}
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
      <AddCharacterModal addCharacter={addCharacter} />
    </Container>
  );
};

export default Encyclopedia;
