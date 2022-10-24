import React, { useState } from "react";
import { Link, NavLink as RRNavLink, useNavigate } from "react-router-dom";
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
// import { getUser } from "../modules/userProfileManager";
import "./Header.css";

export default function Header({ isLoggedIn }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  
  //  const userProfile = getUser().then()
  //  console.log(userProfile)
  return (
    <div>
      <Navbar className="navbar" expand="md">
        <NavbarBrand tag={RRNavLink} to="/">
          <img className="headerLogo" src={process.env.PUBLIC_URL + "/fooderIcon.png"} />
          &nbsp; TheFooder
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            {/* When isLoggedIn === true, we will render the Home link */}
            {isLoggedIn && (
              <>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/">HOME</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to={`/userProfile`}>MY RECIPES</NavLink>
                </NavItem>
                  {/* <button onClick={navigate(`/userProfile/:$}`)}></button> */}
                <NavItem>
                  <NavLink id="logout" tag={RRNavLink} to={`/`} onClick={logout}>LOGOUT</NavLink>
                </NavItem>
              </>
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
