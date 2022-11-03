import React, { useEffect, useState } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useNavigate, Link } from "react-router-dom";
import { login, onLoginStatusChange } from "../../modules/authManager";
import "./Login.css";
import Header from "../header/Header";
// import Header from "../header/Header";
export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(null);


  useEffect(() => {
    onLoginStatusChange(setIsLoggedIn);
  }, []);

  const loginSubmit = (e) => {
    e.preventDefault();
    login(email, password)
      .then(() => navigate("/"))
      .catch(() => alert("Invalid email or password"));
  };

  return (
    
    <article id="backgroundLogin">
   <Header  isLoggedIn={isLoggedIn} />
    <Form className="login" onSubmit={loginSubmit}>
      <fieldset>
        <FormGroup>
          <Label for="email"><b>Email</b></Label>
          <Input
            id="email"
            type="text"
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="password"><b>Password</b></Label>
          <Input
            id="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Button>Login</Button>
        </FormGroup>
        <em>
          Not registered? <Link to="/register">Register</Link>
        </em>
      </fieldset>
    </Form>
    </article>
  );
}