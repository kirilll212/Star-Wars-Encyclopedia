import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Form, Button, Card, Container, Row, Col, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Pagination from './pagination/Pagination';
import {
  setSearchTerm,
  setSearchResults,
  setActiveTab,
  setLoading,
  setCurrentPage,
} from '../redux/slice';

import './style.css'

const SWAPI_BASE_URL = 'https://swapi.dev/api';

const Encyclopedia = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState('');

  const {
    searchTerm,
    searchResults,
    activeTab,
    loading,
    currentPage,
  } = useSelector((state) => state.encyclopedia);

  const fetchCurrentTabData = useCallback(async () => {
    dispatch(setLoading(true));
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
        dispatch(setSearchResults(response.data.results));
      } else {
        dispatch(setSearchResults([]));
      }
      dispatch(setLoading(false));
    } catch (error) {
      console.log(error);
      dispatch(setLoading(false));
    }
  }, [activeTab, dispatch, searchTerm]);

  useEffect(() => {
    fetchCurrentTabData();
  }, [activeTab, currentPage, fetchCurrentTabData]);

  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');

    if (storedUser) {
      setLoggedInUser(storedUser);
    }
  }, []);

  const handleSearchChange = (event) => {
    dispatch(setSearchTerm(event.target.value));
  };

  const handleTabChange = (tab) => {
    dispatch(setActiveTab(tab));
    dispatch(setSearchTerm(''));
    dispatch(setSearchResults([]));
    dispatch(setCurrentPage(1));
  };

  const handleCardClick = (item) => {
    navigate('/informationPage', {
      state: { name: item.name, details: item },
    });
  };

  const entriesPerPage = 5;
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = searchResults.slice(indexOfFirstEntry, indexOfLastEntry);

  const handlePageChange = (pageNumber) => {
    dispatch(setCurrentPage(pageNumber));
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    navigate('/');
  };

  return (
    <Container className="my-4">
      <div className="header text-center mb-4">
        <h1 className="mb-4 text-warning lighting">Star Wars Encyclopedia</h1>
        <div className="d-flex justify-content-center align-items-center">
          <h4 className="text-muted me-2">Logged by: {loggedInUser}</h4>
          <Button variant="danger" onClick={handleLogout} className="text-uppercase">
            Logout
          </Button>
        </div>
      </div>
      <Nav variant="tabs" activeKey={activeTab} onSelect={handleTabChange} className="mb-3 justify-content-center">
        <Nav.Item>
          <Nav.Link eventKey="characters" className="text-uppercase">
            Characters
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="planets" className="text-uppercase">
            Planets
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="starships" className="text-uppercase">
            Starships
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <Form className="d-flex justify-content-center mb-3">
        <Form.Group controlId="searchForm" className="m-0">
          <Form.Control
            type="text"
            placeholder={`Search for ${activeTab}`}
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </Form.Group>
        <Button variant="primary" onClick={fetchCurrentTabData} className="ms-2">
          Search
        </Button>
      </Form>
      {loading ? (
        <div className="text-center">
          <progress role='status'/>
        </div>
      ) : (
        <Row xs={1} md={2} lg={3} xl={4} className="g-4">
          {currentEntries.map((item, index) => (
            <Col key={index}>
              <div className="clickable-card-wrapper" onClick={() => handleCardClick(item)}>
                <Card className="h-100 shadow">
                  <Card.Body>
                    <Card.Title className="text-capitalize">{item.name}</Card.Title>
                    {activeTab === 'characters' && (
                      <>
                        <Card.Text>Height: {item.height}</Card.Text>
                        <Card.Text>Mass: {item.mass}</Card.Text>
                        <Card.Text>Hair Color: {item.hair_color}</Card.Text>
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
              </div>
            </Col>
          ))}
        </Row>
      )}
      <div className="pagination-container d-flex justify-content-center mt-4">
        <Pagination
          currentPage={currentPage}
          totalEntries={searchResults.length}
          entriesPerPage={entriesPerPage}
          onPageChange={handlePageChange}
        />
      </div>
    </Container>
  );
};

export default Encyclopedia;