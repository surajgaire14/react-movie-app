import React, { useContext, useState } from "react";
import classes from "./login.module.css";
import { Link,useNavigate } from "react-router-dom";
import { loginContext } from "../contexts/loginContext";
import Axios from "axios";
import * as yup from "yup"
// import Cookies from "js-cookie";

const schema = yup.object().shape({
  email:yup.string().email().required(),
  password:yup.string().required()
})

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [token,setToken] = useState("")

  const { setUsername } = useContext(loginContext);
  const {setAuth} = useContext(loginContext)

  const navigate = useNavigate();

  Axios.defaults.withCredentials = true;

  
  const handleClick = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:5000/login",{
      email: email,
      password: password,
    })
    .then((res) => {
      console.log(res)
      if (res.status === 200) {
        setAuth(res.data.auth)
        setUsername(res.data.user.username);
        localStorage.setItem("accesstoken",JSON.stringify(res.data.accesstoken))
        navigate("/");
      }
    })
    .catch((err) => console.log(err));
  };


  
  // Axios.interceptors.request.use(config => {
  //   config.headers.authorization = `Bearer ${token}`
  //   return config
  // },(err) => {
  //   console.log(err)
  // })
  // useEffect(() => {
  //   Axios.get("http://localhost:5000/login").then((response) => {
  //     // console.log(response)
  //     // if(response.data.isLoggedIn){
  //     //   setUsername(response.data.user.username)
  //     // }
  //   });
  // }, []);

  return (
    <div className={classes.div}>
      <div className={classes.loginDiv}>
        <form action="">
          <h2>Log In</h2>
          <label htmlFor="">Email</label>
          <input type="text" onChange={(e) => setEmail(e.target.value)} />
          <label htmlFor="">Password</label>
          <input type="password" onChange={(e) => setPassword(e.target.value)} />
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
