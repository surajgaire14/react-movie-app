import React from "react";
import classes from "./Footer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <div className={classes.bottom}>
    <div className={classes.footer}>
      <div className={classes.about}>
        <div className={classes.aboutSite}>
          <h3>About this website</h3>
          <hr />
          <p>
            This is a demo website where you can see the list of movies,search
            movies,give reviews to movies.It is created the help of the movie
            database provided by{" "}
            <a
              href="https://www.themoviedb.org/"
              rel="noreferrer"
              target={"_blank"}
            >
              TMDB
            </a>
          </p>
        </div>
        <div className={classes.aboutMe}>
          <h4>Get to Know me better</h4>
          <div className={classes.icons}>
            <a
              href="https://www.facebook.com/suraj.gaire.712/"
              target={"_blank"}
            >
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a href="https://www.instagram.com/eriag_suraz/" target={"_blank"}>
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="https://twitter.com/SurajGaire16" target={"_blank"}>
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a href="https://github.com/surajgaire14" target={"_blank"}>
              <FontAwesomeIcon icon={faGithub} />
            </a>
          </div>
        </div>
      </div>
      <div className={classes.copy}>
        <p>
          This website is designed and created by <strong>Suraj Gaire</strong>
        </p>
        <p>&copy; 2022</p>
      </div>
    </div>
    </div>
  );
};

export default Footer;
