import React from 'react';
import { Card, Button, Col } from 'react-bootstrap';

export const Item = ({ data }) => {
  return (
    <Col md={4} className="mb-5">
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={data.flags.png} />
        <Card.Body>
          <Card.Title>{data.name.common}</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          <Button variant="primary">Read more</Button>
        </Card.Body>
      </Card>
    </Col>
  );
};
