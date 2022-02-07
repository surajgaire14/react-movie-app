import React from "react";
import classes from "./navbar.module.css";
import { Link, useNavigate } from "react-router-dom";


const Navbar = (props) => {

  const navigate = useNavigate()

  const handleLogout = () => {
    if(props.auth){
    localStorage.removeItem("accesstoken")
    navigate("/login")
    props.setAuth(false)   
    }

  }

  return (
    <div className={classes.NavbarDiv}>
      <Link to="/" className={classes.link}><h2>Movie App</h2></Link> 
      <div>
        {props.auth ?
        <div className={classes.isAuthDiv}>
          {/* <div className={classes.username}> 
           <p>welcome, { props.username}</p>
         </div>   */}
         <Link className={classes.link} to="/" onClick={handleLogout}>Logout</Link>
        </div>
        :
        <div className={classes.isNotAuthDiv}>
        <Link className= {classes.link} to= "/login" >Login</Link>
        <Link className= {classes.link} to= "/signup">Register</Link>
        </div>

        } 
       
      </div>
    </div>
  );
};

export default Navbar;
