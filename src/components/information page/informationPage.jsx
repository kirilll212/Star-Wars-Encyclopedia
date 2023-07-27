import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';

const InformationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { name, details } = location.state;

  const handleGoBack = () => {
    navigate('/Encyclopedia');
  };

  return (
    <Container className="my-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>{name}</h1>
        <Button variant="primary" onClick={handleGoBack}>
          Back to Encyclopedia
        </Button>
      </div>
      <div>
        <h2>Details:</h2>
        <ul>
          {Object.entries(details).map(([key, value]) => (
            <li key={key}>
              <strong>{key}: </strong>
              {value}
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
};

export default InformationPage;