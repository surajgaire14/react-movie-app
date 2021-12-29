import React, { useState } from "react";
import classes from "./navbar.module.css";
import { Link } from "react-router-dom";

const Navbar = (props) => {
  // const [searchKey, setSearchKey] = useState("");

  // const handleClick = () => {
  //   props.filterMovies(searchKey);
  // };
  return (
    <div className={classes.NavbarDiv}>
      <h2>Movie App</h2>
      <div>
        {/* <input
          name="searchKey"
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
          type="text"
          placeholder="Search your favourite movie"
        />
        <button onClick={handleClick}>Search</button> */}
      </div>
      <div>
        <Link className= {classes.link} to= "/login">Login</Link>
        <Link className= {classes.link} to= "/signup">Register</Link>
      </div>
    </div>
  );
};

export default Navbar;
