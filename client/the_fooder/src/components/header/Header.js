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
import { logout } from "../../modules/authManager";
import "./Header.css";

export default function Header({ isLoggedIn }) {
  // const [searchTerms, setSearchTerms] = useState(null)
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar className="navbar" expand="md">
        <NavbarBrand tag={RRNavLink} to="/">
          &nbsp;
          <img alt="icon" className="headertext" src={"(TF)TheFooder-icon.png"} />
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar className="header_options">
          <Nav className="mr-auto" navbar>
            {/* When isLoggedIn === true, we will render the Home link */}
            {isLoggedIn && (
              <div className="rightHeader" >
                <div className="rightHeaderIcons">
                  <a href='https://twitter.com/'><img alt="" className="twit__logo" src="https://i.pinimg.com/originals/5c/a9/8c/5ca98c73b2bb7a02bf8350933c7ca443.png" width="30" height="25"></img></a>&nbsp;&nbsp;&nbsp;&nbsp;
                  <a href='https://www.snapchat.com/'><img alt="" className="snap__logo" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnxW5tD8WNeXeScnfk_D6nxjaPuEW-NVfIczYEH3KWmnw0vkkpfBG0rHZRJGzzZBebgCE&usqp=CAU" width="25" height="20"></img></a>&nbsp;&nbsp;
                  <a href='https://www.facebook.com/'><img alt="" className="fb__logo" src="https://freepngimg.com/thumb/facebook/62588-and-icons-facebook-computer-black-logo-white.png" width="35" height="30"></img></a>
                  <a href='https://www.instagram.com/'><img alt="" className="inst__logo" src="https://i.pinimg.com/originals/63/9b/3d/639b3dafb544d6f061fcddd2d6686ddb.png" width="35" height="25"></img></a>
                </div>
                <div className="header_options" >
                <NavItem className="navWhite">
                  <NavLink id="navLink" tag={RRNavLink} to="/">HOME</NavLink>
                </NavItem>
                <NavItem className="navWhite">
                  <NavLink id="navLink" tag={RRNavLink} to={`/userProfile`}>MY RECIPES</NavLink>
                </NavItem>
                <NavItem className="navWhite">
                  <NavLink id="navLink" tag={RRNavLink} to={`/login`} onClick={logout}>LOGOUT</NavLink>
                </NavItem>
              </div>
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
