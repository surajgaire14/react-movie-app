import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./search.module.css";

const Search = (props) => {
  const [searchKey, setSearchKey] = useState("");

  const navigate = useNavigate();

  const handleClick = async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?&api_key=${process.env.REACT_APP_API_KEY}&query=${searchKey}`
      
      );
      const data = await res.json()
      console.log(data)
      props.searchMovies(data.results)
      navigate(`/search`)
  };

  return (
    <div className={classes.searchDiv}>
      <input
        name="searchKey"
        value={searchKey}
        onChange={(e) => setSearchKey(e.target.value)}
        type="text"
        placeholder="Search your favourite movie"
      />
      <button onClick={handleClick}>Search</button>
    </div>
  );
};

export default Search;
