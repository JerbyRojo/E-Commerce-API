import React from 'react';
import { Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Product(props) {
  // props is used here to get the data and breakPoint from the FeaturedCourses.js
  const { breakPoint, data, isAdmin, user } = props;

  // Destructure the products data here
  const { _id, name, description, price } = data;

  return (
    <Col xs={12} md={breakPoint}>
      {/* Adding the class cardHighlight for min-height */}
      <Card className="cardHighlight mx-2">
        <Card.Body>
          <Card.Title className="text-center">
            <Link to={`/products/${_id}`}>{name}</Link>
          </Card.Title>
          <Card.Text>{description}</Card.Text>
        </Card.Body>
        <Card.Footer>
          <h5 className="text-center">₱{price}</h5>
          {isAdmin && !user ? (
            <p className="text-center text-danger">Please login as an admin to access this feature</p>
          ) : (
            <Link className="btn btn-primary d-block" to={`/products/${_id}`}>
              Details
            </Link>
          )}
        </Card.Footer>
      </Card>
    </Col>
  );
}