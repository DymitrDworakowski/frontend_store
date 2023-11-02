import React, { useContext } from "react";
import { Context } from "../index";
import style from "./NavBarModal.css";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import { SHOP_ROUTE } from "../utils/consts";
import { Button } from "react-bootstrap";
import { observer } from "mobx-react-lite";

const NavBar = observer(() => {
  const { user } = useContext(Context);
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <NavLink className="navLink" to={SHOP_ROUTE}>
          ByToday
        </NavLink>
        {user.isAuth ? (
          <Nav className="ml-auto">
            <Button variant={"outline-light"}>Admin Panel</Button>
            <Button variant={"outline-light"} className="ml-2">Login in</Button>
          </Nav>
        ) : (
          <Nav className="ml-auto">
            <Button variant={"outline-light"} onClick={()=>user.setIsAuth(true)}>Authorization</Button>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
});

export default NavBar;
