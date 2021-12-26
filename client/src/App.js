import "./App.css";
import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/NavBar/Navbar";
import Movies from "./components/Movies/Movies";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/login/Login";
import Signup from "./components/Signup/Signup";

function App() {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);

  const filterMovies = (searchKey) => {
    let tempMovies = movies.filter((movie) => {
      return movie.title.toLowerCase().includes(searchKey.toLowerCase());
    });
    setFilteredMovies(tempMovies);
  };

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_API_KEY_DISCOVER_MOVIES}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`
    )
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
        setFilteredMovies(data.results);
      });
  }, []);

  return (
    <div>
      <Navbar filterMovies={filterMovies} />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <div className="movies">
              {filteredMovies.map((movie) => (
                <Movies
                  title={movie["title"]}
                  imagePath={movie["backdrop_path"]}
                  cardText={movie.overview}
                  key={movie.id}
                />
              ))}
            </div>
          }
        ></Route>
        <Route exact path="/login" element={<Login />}></Route>
        <Route exact path="/signup" element={<Signup />}></Route>
      </Routes>
    </div>
  );
}

export default App;
