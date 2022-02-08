import React, { useState, useEffect, useCallback } from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Movies = (props) => {
  const [isHovered, setIshovered] = useState(false);

  const navigate = useNavigate();


  const handleClick = () => {
    navigate(`/${props.id}`);
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
    </Card>
  );
};

export default Movies;
