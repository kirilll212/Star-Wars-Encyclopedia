import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import './style.css';
import { Form, Button, Card, Container, Row, Col, Nav, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Pagination from './pagination/Pagination';
import {
  setSearchTerm,
  setSearchResults,
  setActiveTab,
  setLoading,
  setCurrentPage,
} from '../redux/slice';

const SWAPI_BASE_URL = 'https://swapi.dev/api';

const Encyclopedia = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    searchTerm,
    searchResults,
    activeTab,
    loading,
    currentPage,
    loggedInUser,
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
  }, [activeTab, dispatch, searchTerm]); // Додаємо activeTab, dispatch та searchTerm у залежності

  useEffect(() => {
    fetchCurrentTabData();
  }, [activeTab, currentPage, fetchCurrentTabData]);

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
      <div className='header'>
        <h1 className="mb-4">Star Wars Encyclopedia</h1>
        <h4 className='text-muted'>Logged by: {loggedInUser}</h4>
      </div>
      <div class="d-grid gap-2 d-md-flex justify-content-md-end">
        <button className="btn btn-danger me-md-2" type="button" onClick={handleLogout}>Logout</button>
      </div>
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
        <Button variant="primary" onClick={fetchCurrentTabData} className="mb-3">
          Search
        </Button>
      </Form>
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <Row xs={1} md={2} lg={3} xl={4} className="g-4">
          {currentEntries.map((item, index) => (
            <Col key={index}>
              <div className="clickable-card-wrapper" onClick={() => handleCardClick(item)}>
                <Card className="h-100">
                  <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
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
      <div className='pagination-container'>
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