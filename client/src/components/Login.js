import React from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { Formik, Form, Field } from "formik";

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const initialValues = {
    username: "",
    password: "",
  }

  const onSubmit = formValues => {
    axios.post("http://localhost:5000/api/login", formValues)
      .then(res => {
        const token = res.data.payload;
        localStorage.setItem("token", token);
        props.history.push("/bubbles");
      })
      .catch(err => {
        alert(`Login.js: ${err.message}.`);
      });
  }

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        render={props => (
          <Form>
            <div className="field">
              <Field name="username" type="text" placeholder="Username"/>
            </div>
            <div className="field">
              <Field name="password" type="password" placeholder="Password"/>
            </div>
            <button type="submit">Log in</button>
          </Form>
        )}
      />
    </>
  );
};

export default Login;
