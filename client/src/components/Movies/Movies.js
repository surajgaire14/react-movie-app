import React from "react";
import { Card, Button } from "react-bootstrap";

const Movies = (props) => {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img
        variant="top"
        src={`https://themoviedb.org/t/p/w220_and_h330_face/${props.imagePath}`}
      />
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>{props.cardText}</Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
};

export default Movies;
