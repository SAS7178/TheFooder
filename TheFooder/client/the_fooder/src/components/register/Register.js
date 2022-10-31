import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useNavigate } from "react-router-dom";
import { onLoginStatusChange, register } from "../../modules/authManager";
import "./Register.css";
import { useEffect } from "react";
import Header from "../header/Header";

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(null);


  useEffect(() => {
    onLoginStatusChange(setIsLoggedIn);
  }, []);

  const registerClick = (e) => {
    e.preventDefault();
    if (password && password !== confirmPassword) {
      alert("Passwords don't match. Do better.");
    } else {
      const userProfile = {
        name,
        email,
      };
      register(userProfile, password).then(() => navigate("/"));
    }
  };

  return (
     <div className="reg-page">
      <Header isLoggedIn={isLoggedIn} />
    <Form className="register" onSubmit={registerClick}>
      <fieldset >
        <FormGroup >
          <Label htmlFor="name"><b>Display Name</b></Label>
          <Input
          className="regInput"
            id="name"
            type="text"
            onChange={(e) => setName(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="email"><b>Email</b></Label>
          <Input
            id="email"
            type="text"
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
          <Label for="confirmPassword"><b>Confirm Password</b></Label>
          <Input
            id="confirmPassword"
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Button>Register</Button>
        </FormGroup>
      </fieldset>
    </Form>
    </div>
  );
}
