import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';
import { Form, Button, Card, Container, Row, Col, Nav, Modal } from 'react-bootstrap';
import AddCharacterModal from './add-character/AddCharacterForm';
import AddPlanetModal from './add-planet/AddPlanetModal';
import AddStarshipModal from './add-starship/AddStarshipModal';
import CharacterListModal from './deliting characters/CharacterListModal';
import PlanetListModal from './deleting-planets/PlanetListModal';
import StarshipListModal from './deleting-starships/StarshipListModal';

const SWAPI_BASE_URL = 'https://swapi.dev/api';

const Encyclopedia = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [activeTab, setActiveTab] = useState('characters');
  const [showModal, setShowModal] = useState(false);
  const [showAddCharacterModal, setShowAddCharacterModal] = useState(false);
  const [showAddPlanetModal, setShowAddPlanetModal] = useState(false);
  const [showAddStarshipModal, setShowAddStarshipModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [characterData, setCharacterData] = useState([]);
  const [planetData, setPlanetData] = useState([]);
  const [starshipData, setStarshipData] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [showCharacterListModal, setShowCharacterListModal] = useState(false);
  const [showPlanetListModal, setShowPlanetListModal] = useState(false);
  const [showStarshipListModal, setShowStarshipListModal] = useState(false);
  const [addedCharacters, setAddedCharacters] = useState([]);
  const [addedPlanets, setAddedPlanets] = useState([]);
  const [addedStarships, setAddedStarships] = useState([]);

  const handleDeleteCharacter = (characterToDelete) => {
    const updatedCharacters = addedCharacters.filter(
      (character) => character.name !== characterToDelete.name
    );
    setAddedCharacters(updatedCharacters);
    saveToLocalStorage('characters', updatedCharacters);
  };

  const handleDeletePlanet = (planetToDelete) => {
    const updatedPlanets = addedPlanets.filter(
      (planet) => planet.name !== planetToDelete.name
    );
    setAddedPlanets(updatedPlanets);
    saveToLocalStorage('planets', updatedPlanets);
  };

  const handleDeleteStarship = (starshipToDelete) => {
    const updatedStarships = addedStarships.filter(
      (starship) => starship.name !== starshipToDelete.name
    );
    setAddedStarships(updatedStarships);
    saveToLocalStorage('starships', updatedStarships);
  };

  useEffect(() => {
    setAddedCharacters(loadFromLocalStorage('characters') || []);
    setAddedPlanets(loadFromLocalStorage('planets') || []);
    setAddedStarships(loadFromLocalStorage('starships') || []);
  }, []);

  const handleCloseAddCharacterModal = () => {
    setShowAddCharacterModal(false);
  };

  const handleCloseAddPlanetModal = () => {
    setShowAddPlanetModal(false);
  };

  const handleCloseAddStarshipModal = () => {
    setShowAddStarshipModal(false);
  };

  const saveToLocalStorage = (key, data) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.log('Error saving data to local storage:', error);
    }
  };

  const loadFromLocalStorage = (key) => {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.log('Error loading data from local storage:', error);
      return null;
    }
  };

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

        const storedCharacters = loadFromLocalStorage('characters');
        if (storedCharacters) {
          isMounted && setCharacterData(storedCharacters);
        }

        const storedPlanets = loadFromLocalStorage('planets');
        if (storedPlanets) {
          isMounted && setPlanetData(storedPlanets);
        }

        const storedStarships = loadFromLocalStorage('starships');
        if (storedStarships) {
          isMounted && setStarshipData(storedStarships);
        }
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
    setCharacters((prevData) => [...prevData, ...characters]);
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
    setCharacterData((prevData) => [...prevData, newCharacter]);
    saveToLocalStorage('characters', [...characterData, newCharacter]);
  };

  const addStarship = (newStarship) => {
    setStarshipData((prevData) => [...prevData, newStarship]);
    saveToLocalStorage('starships', [...starshipData, newStarship]);
  };

  const addPlanet = (newPlanet) => {
    setPlanetData((prevData) => [...prevData, newPlanet]);
    saveToLocalStorage('planets', [...planetData, newPlanet]);
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
      <Row className="align-items-end">
        <Col xs={12} md={9} className="mb-3">
          <Form.Control
            type="text"
            placeholder={`Search for ${activeTab}`}
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </Col>
        <Col xs={12} md={3} className="mb-3 d-grid">
          <Button variant="primary" onClick={searchItems}>
            Search
          </Button>
        </Col>
      </Row>
    </Form>
      {activeTab === 'characters' && (
      <>
        <CharacterListModal
          show={showCharacterListModal}
          characters={addedCharacters}
          onClose={() => setShowCharacterListModal(false)}
          onDelete={handleDeleteCharacter}
        />
        <Button className='sacpsm' variant="primary" onClick={() => setShowCharacterListModal(true)}>
          Show Added Characters
        </Button>
      </>
    )}
    {activeTab === 'planets' && (
      <>
        <PlanetListModal
          show={showPlanetListModal}
          planets={addedPlanets}
          onClose={() => setShowPlanetListModal(false)}
          onDelete={handleDeletePlanet}
        />
        <Button className='sacpsm' variant="primary" onClick={() => setShowPlanetListModal(true)}>
          Show Added Planets
        </Button>
      </>
    )}
    {activeTab === 'starships' && (
      <>
        <StarshipListModal
          show={showStarshipListModal}
          starships={addedStarships}
          onClose={() => setShowStarshipListModal(false)}
          onDelete={handleDeleteStarship}
        />
        <Button className='sacpsm' variant="primary" onClick={() => setShowStarshipListModal(true)}>
          Show Added Starships
        </Button>
      </>
    )}
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
      <div className="button-container">
        {activeTab === 'characters' && (
          <AddCharacterModal
            addCharacter={addCharacter}
            show={showAddCharacterModal}
            handleClose={handleCloseAddCharacterModal}
          />
        )}
        {activeTab === 'planets' && (
          <AddPlanetModal
            addPlanet={addPlanet}
            show={showAddPlanetModal}
            handleClose={handleCloseAddPlanetModal}
          />
        )}
        {activeTab === 'starships' && (
          <AddStarshipModal
            addStarship={addStarship}
            show={showAddStarshipModal}
            handleClose={handleCloseAddStarshipModal}
          />
        )}
      </div>
    </Container>
  );
};

export default Encyclopedia;
