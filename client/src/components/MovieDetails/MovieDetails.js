import React, { useState, useEffect, useCallback, Fragment, useContext } from "react";
import { useParams } from "react-router-dom";
import classes from "./MovieDetails.module.css";
import Reviews from "../Reviews/Reviews";

const MovieDetails = (props) => {
  const [movieDetails, SetMovieDetais] = useState("");
  const [image, setImage] = useState("");
  // const [movieId,setId] = useState("")
  const [genres, setGenres] = useState({
    genre1: "",
    genre2: "",
    genre3: "",
  });
  const [releaseDate, setReleaseDate] = useState("");
  const [overview, setOverview] = useState("");
  const { id } = useParams();
  console.log(id)

  // const {id } = useContext(loginContext)

  const fetchMovieDetails = useCallback(() => {
    fetch(
      `${process.env.REACT_APP_API_URL}${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => {
        SetMovieDetais(data);
        setImage(data["backdrop_path"]);
        setGenres({
          genre1: data.genres[0].name,
          genre2: data.genres[1].name,
          genre3: data.genres[2].name,
        });
        setReleaseDate(data["release_date"]);
        setOverview(data.overview);
        // setId(data.id)
      });
  }, []);

  // console.log(movieId)

  useEffect(() => {
    fetchMovieDetails();
  }, [fetchMovieDetails]);

  return (
    <Fragment>

    <div className={classes.container}>
      <div className={classes.imgDiv}>
        <img
          src={`https://themoviedb.org/t/p/w220_and_h330_face/${image}`}
          alt={movieDetails.title}
        />
      </div>
      <div className={classes.movieDetails}>
        <h3>{movieDetails.title}</h3>
        <p>
          <em>Genres:</em>
         {genres ? `${genres.genre1}, ${genres.genre2}, ${genres.genre3}` : null }
        </p>
        <p>Status:{movieDetails.status}</p>
        <p>Release Date:{releaseDate ? releaseDate : "Not available"}</p>
        <p>Average Vote:{movieDetails["vote_average"]}</p>
        <p>
          Runtime:{parseInt(movieDetails.runtime / 60)} hr{" "}
          {movieDetails.runtime % 60} min
        </p>
        <p>
          <strong>Overview:</strong>
          {overview.length > 300 ? `${overview.slice(0,300)}...` : overview }
        </p>
      </div>
    </div>
    <hr className={classes.hr}/>
    <Reviews />
    </Fragment>

  );
};

export default MovieDetails;
