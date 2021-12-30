import React, { useState } from "react";
import Axios from "axios";
import classes from "./signup.module.css";
import { Link , useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

const schema = yup.object().shape({
  username: yup.string().min(3).max(20).required(),
  email: yup.string().email().required(),
  password: yup.string().min(3).max(20).required(),
  cpassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate()

  const submit = (data,e) => {
    e.target.reset()
    Axios.post("http://localhost:5000/signup", {
      username: data.username,
      email: data.email,
      password: data.password,
      cpassword: data.cpassword,
    }).then((res) => {
      if(res.status === 200){
        navigate("/login")
      }
    });
  };

  // const Submit = (data,e) => {

  //   e.preventDefault();
  //   Axios.post("http://localhost:5000/signup", {
  //     username: username,
  //     email: email,
  //     password: password,
  //     cpassword: cpassword,
  //   }).then((res) => {
  //     console.log(res)
  //     }
  //   )
  // };

  return (
    <div className={classes.signupDiv}>
      <form method="POST" onSubmit={handleSubmit(submit)}>
        <h2>Sign up</h2>
        <input
          name="username"
          type="text"
          {...register("username")}
          placeholder="username"
        />
        <p className={classes.error}>{errors.username?.message}</p>

        <input
          name="email"
          type="text"
          {...register("email")}
          placeholder="email"
        />
        <p className={classes.error}>{errors.email?.message}</p>

        <input
          name="password"
          type="password"
          {...register("password")}
          placeholder="password"
        />
        <p className={classes.error}>{errors.password?.message}</p>
        <input
          type="password"
          name="cpassword"
          {...register("cpassword")}
          placeholder="confirm password"
        />
        <p className={classes.error}>{errors.cpassword?.message}</p>

        <button>Submit</button>
        <p>Already have an account. </p>
        <p>
          <Link className={classes.link} to="/login">
            Log in here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
