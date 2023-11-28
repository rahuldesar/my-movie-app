import React, { useState } from "react";

import { Link, NavLink } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import InputGroup from "react-bootstrap/InputGroup";

import { useTranslation } from "react-i18next";

import ROUTES from "constants/routes";
import "assets/scss/components/header.scss";

const Header = () => {
  const [searchText, setSearchText] = useState("");
  const { t } = useTranslation();
  return (
    <header>
      <Navbar
        bg="black"
        expand="lg"
        fixed="top"
        className=" navbar-wrapper py-1 navbar-dark w-100 border-bottom border-dark border-opacity-50 d-flex"
      >
        <Container>
          <Navbar.Toggle aria-controls="navbar-movie" className="px-2 py-1 me-2" data-toggle="collapse" />
          <Navbar.Brand as={Link} to={ROUTES.HOME} className="text-primary fw-bold me-auto">
            {t("label.title")}
          </Navbar.Brand>
          <Navbar.Collapse id="navbar-movie" className="order-2 order-lg-1 mt-1">
            <Nav className="me-auto ms-lg-3">
              <NavLink to={ROUTES.MOVIES} className="nav-link text-white ms-lg-2">
                Movies
              </NavLink>
              <NavLink to={ROUTES.TV} className="nav-link text-white ms-lg-2">
                Tv
              </NavLink>
            </Nav>
          </Navbar.Collapse>
          <div className="order-1 order-lg-2 position-relative">
            <InputGroup size="sm" className="header-searchbox">
              <Form.Control size="sm" placeholder="Search" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
              <Link to={`${ROUTES.SEARCH.BASE}/${searchText}`}>
                <Button variant="outline-primary" id="">
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </Button>
              </Link>
            </InputGroup>
          </div>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
