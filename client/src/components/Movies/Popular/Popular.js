import React, { useCallback, useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import classes from "./Popular.module.css";

const Popular = (props) => {
  // console.log(props);
  const [popular, setPopular] = useState("");
  const [image, setImage] = useState("");
  const [isHovered, setIsHovered] = useState("");

  // const fetchMovies = useCallback(async () => {
  //   const res = await fetch(
  //     `${process.env.REACT_APP_API_URL}popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
  //   );
  //   const data = await res.json();
  //   console.log(data.results[0]["backdrop_path"]);
  //   setPopular(data.results);
  //   setImage(data.results[0]["backdrop_path"]);
  // }, []);

  // useEffect(() => {
  //   fetchMovies();
  // }, [fetchMovies]);

  return (
    // <div className={classes.popularDiv}>
    //   <div className={classes.popular}>
    //     <h2>Popular Movies</h2>
    //     <Link to="/popular">view all</Link>
    //   </div>
    //   <div
    //     onMouseEnter={() => setIsHovered(true)}
    //     onMouseLeave={() => setIsHovered(false)}
    //   >
    //     <img
    //       src={`https://themoviedb.org/t/p/w220_and_h330_face/${props.imagePath}`}
    //       alt="images"
    //     />
    //     {isHovered && (
    //       <Button style={{ position: "absolute", top: "300px", left: "50px" }}>
    //         See details
    //       </Button>
    //     )}
    //   </div>
    // </div>
    <div className={classes.popular}>
      <div className={classes.popularDiv}>
        <Card
          style={{ width: "15rem" }}
          onMouseOver={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Card.Img
            variant="top"
            src={`https://themoviedb.org/t/p/w220_and_h330_face/${props.imagePath}`}
          />
          {isHovered && (
            <Button
              style={{ position: "absolute", top: "180px", left: "70px" }}
              varient="primary"
            >
              See Details
            </Button>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Popular;
