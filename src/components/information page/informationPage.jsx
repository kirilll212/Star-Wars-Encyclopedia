import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Button, Card, ListGroup } from 'react-bootstrap';
import '../style.css'

const InformationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { name, details } = location.state;

  const handleGoBack = () => {
    navigate('/Encyclopedia');
  };

  return (
    <Container className="my-4">
      <Card className="shadow-lg">
        <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center">
          <h1>{name}</h1>
          <Button variant="light" onClick={handleGoBack}>
            Back to Encyclopedia
          </Button>
        </Card.Header>
        <Card.Body className='info-card'>
          <ListGroup variant="flush">
            <h2 className="mt-3">Details</h2>
            {Object.entries(details).map(([key, value]) => (
              <ListGroup.Item key={key} className="d-flex justify-content-between align-items-center">
                <strong>{key}:</strong> {value}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default InformationPage;