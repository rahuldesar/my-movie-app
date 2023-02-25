import React from "react";

import { Link, NavLink } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import { useTranslation } from "react-i18next";

import ROUTES from "constants/routes";
import "assets/scss/components/header.scss";

const Header = () => {
  const { t } = useTranslation();
  return (
    <header>
      <Navbar
        bg="black"
        expand="lg"
        className="bg-opacity-25 navbar-wrapper navbar-dark w-100 border-bottom border-dark border-opacity-50 position-absolute"
      >
        <Container>
          <Navbar.Brand
            as={Link}
            to={ROUTES.HOME}
            className="text-primary fw-bold"
          >
            {t("label.title")}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-movie" data-toggle="collapse" />
          <Navbar.Collapse id="navbar-movie">
            <Nav className=" me-auto gap-lg-5 navbar-menu-items">
              <NavLink to={ROUTES.HOME} className="nav-link text-white">
                Home
              </NavLink>
              <NavLink to={ROUTES.MOVIES} className="nav-link text-white">
                Movies
              </NavLink>
            </Nav>
            <div>
              <Link to={ROUTES.SEARCH.BASE}>
                <span className=" bg-success p-2 rounded-circle text-white">
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </span>
              </Link>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
