import React from "react";
import { Link } from "react-router-dom";
import classes from "./pageNotFound.module.css"

const PageNotFound = () => {
  return (
    <div className= {classes.pnfDiv}>
      <h1>404</h1>
      <h2>Page Not Found!!!</h2>
      <Link to="/" className= {classes.link}>Back to homePage</Link>
      {/* <Link to="/login" className={classes.link}>Back to login</Link> */}
    </div>
  );
};

export default PageNotFound;
