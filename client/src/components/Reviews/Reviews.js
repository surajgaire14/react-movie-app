import React, { useState } from "react";
import classes from "./Reviews.module.css";

const Reviews = () => {
  const [show, setShow] = useState(false);
  const [reviews, setReviews] = useState("");

  const handleReset = () => {
    setReviews("");
  };

  const enabled = reviews.length > 0;

  return (
    <div className={classes.container}>
      <input
        className={classes.input}
        type="text"
        value={reviews}
        placeholder="Write a review"
        onClick={() => setShow(true)}
        onChange={(e) => setReviews(e.target.value)}
      />
      {show ? (
        <div className={classes.btnDiv}>
          <button onClick={handleReset} className={classes.btn}>
            Calcel
          </button>
          <button
            disabled={!enabled}
            className={enabled ? classes.btn : classes.disabled}
          >
            Submit
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default Reviews;
