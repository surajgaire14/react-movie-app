import React, { useState, useEffect, useCallback } from "react";
import { Card, Button } from "react-bootstrap";
import { Link, Route } from "react-router-dom";
import MovieDetails from "../MovieDetails/MovieDetails";

const Movies = (props) => {
  const [isHovered, setIshovered] = useState(false);


  const handleClick = () => {
    // {movies.map((movie) => {
    //   <Link to = {`/${movie.id}`}>{movie.title}</Link>
    // })}
  };

  return (
    <Card
      style={{ width: "15rem" }}
      onMouseOver={() => setIshovered(true)}
      onMouseLeave={() => setIshovered(false)}
    >
      <Card.Img
        variant="top"
        src={`https://themoviedb.org/t/p/w220_and_h330_face/${props.imagePath}`}
      />
      {isHovered && (
        <Button
          style={{ position: "absolute", top: "180px", left: "70px" }}
          varient="primary"
          onClick={handleClick}
        >
          See Details
        </Button>
      )}

      {/* <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>{props.cardText}</Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body> */}
    </Card>
  );
};

export default Movies;
