import React, { useState } from "react";
import { Button } from "react-bootstrap";
import {  useNavigate } from "react-router-dom";
import classes from "./Popular.module.css";

const Popular = (props) => {
  const [isHovered, setIsHovered] = useState("");

  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/${props.id}`)
  }

  return (
    <div className={classes.popular}>
      <div className={classes.popularDiv}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          src={`https://themoviedb.org/t/p/w220_and_h330_face/${props.imagePath}`}
          alt="images"
          />
        {isHovered && (
          <Button className={classes.btn} onClick={handleClick}>
            See details
          </Button>
        )}
      </div>
     </div>
  );
};

export default Popular;
