import React, { useEffect, useState } from "react";
import Axios from "axios";
import classes from "./login.module.css";
// import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const [username,setUsername] = useState(null)

  // const navigate = useNavigate();

  Axios.defaults.withCredentials = true;

  const handleClick = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:5000/login", {
      email: email,
      password: password,
    }).then((res) => {
      // if (res.status === 200) {
      //   navigate("/");
      // }
      console.log(res)
    });
  };

  useEffect(() => {
    Axios.get("http://localhost:5000/login").then((response) => {
      console.log(response)
      // setUsername(response.data.user.username)
    })
  },[])

  return (
    <div className={classes.div}>
      <div className={classes.loginDiv}>
        <form action="">
          <h2>Log In</h2>
          <label htmlFor="">Email</label>
          <input type="text" onChange={(e) => setEmail(e.target.value)} />
          <label htmlFor="">Password</label>
          <input type="text" onChange={(e) => setPassword(e.target.value)} />
          <button onClick={handleClick}>Login</button>
          <p>
            Don't have an account?{" "}
            <Link className={classes.link} to="/signup">
              Create Here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
