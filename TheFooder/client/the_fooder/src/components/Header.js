import React, { useState } from "react";
import { NavLink as RRNavLink } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import { logout } from "../modules/authManager";
import "./Header.css";

export default function Header({ isLoggedIn }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar className="navbar" expand="md">
        <NavbarBrand tag={RRNavLink} to="/">
          &nbsp;   
          <img className="headerLogo" src={process.env.PUBLIC_URL + "https://thumbs.dreamstime.com/z/master-chef-icon-vector-master-chef-icon-vector-isolated-white-background-172664477.jpg"} />
          <img className="headertext" src={process.env.PUBLIC_URL + "(TF)TheFooder-icon.png"} />
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar className="header_options">
          <Nav className="mr-auto" navbar>
            {/* When isLoggedIn === true, we will render the Home link */}
            {isLoggedIn && (
                  <div className="header_options" >
              <NavItem>
                  <NavLink tag={RRNavLink} to="/">HOME</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to={`/userProfile`}>MY RECIPES</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink id="logout" tag={RRNavLink} to={`/login`} onClick={logout}>LOGOUT</NavLink>
                </NavItem>
              </div>
            )}
            {!isLoggedIn && (
              <>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/login">
                    LOGIN
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/register">
                    REGISTER
                  </NavLink>
                </NavItem>
              </>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}
