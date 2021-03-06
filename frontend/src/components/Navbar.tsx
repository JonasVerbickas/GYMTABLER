import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';
import MainLogo from "../assets/img/logo.png"

// reactstrap components
import {
  Button,
  Collapse,
  Navbar,
  NavItem,
  Nav,
  Container,
  Row,
  Col,
  NavbarBrand,
} from "reactstrap";
//@ts-ignore


const IndexNavbar = ({ logout, isAuthenticated }) => {
  const [collapseOpen, setCollapseOpen] = React.useState(false);
  const [collapseOut, setCollapseOut] = React.useState("");
  const [color, setColor] = React.useState("navbar-transparent");
  const [cookie, setCookie] = React.useState()
  React.useEffect(() => {
    window.addEventListener("scroll", changeColor);
    return function cleanup() {
      window.removeEventListener("scroll", changeColor);
    };
  }, []);
  const changeColor = () => {
    if (
      document.documentElement.scrollTop > 99 ||
      document.body.scrollTop > 99
    ) {
      setColor("bg-dark");
    } else if (
      document.documentElement.scrollTop < 100 ||
      document.body.scrollTop < 100
    ) {
      setColor("navbar-transparent");
    }
  };
  const toggleCollapse = () => {
    document.documentElement.classList.toggle("nav-open");
    setCollapseOpen(!collapseOpen);
  };
  const onCollapseExiting = () => {
    setCollapseOut("collapsing-out");
  };
  const onCollapseExited = () => {
    setCollapseOut("");
  };

  return (
    <Navbar className={"fixed-top " + color} color-on-scroll="100" expand="lg">
      <Container>
        <div className="navbar-translate">
          <NavbarBrand id="navbar-brand">
            <Link to='/'>
              <img src={MainLogo} alt="Logo" style={{ height: "50px" }} />
            </Link>
          </NavbarBrand>
          <button
            aria-expanded={collapseOpen}
            className="navbar-toggler navbar-toggler"
            onClick={toggleCollapse}
          >
            <span className="navbar-toggler-bar bar1" />
            <span className="navbar-toggler-bar bar2" />
            <span className="navbar-toggler-bar bar3" />
          </button>
        </div>
        <Collapse
          className={"justify-content-end " + collapseOut}
          navbar
          isOpen={collapseOpen}
          onExiting={onCollapseExiting}
          onExited={onCollapseExited}
        >
          <div className="navbar-collapse-header">
            <Row>
              <Col className="collapse-brand" xs="6">
              </Col>
              <Col className="collapse-close text-right" xs="6">
                <button
                  aria-expanded={collapseOpen}
                  className="navbar-toggler"
                  onClick={toggleCollapse}
                >
                  <i className="tim-icons icon-simple-remove" />
                </button>
              </Col>
            </Row>
          </div>
          <Nav navbar>
            <NavItem className="p-0">
              <div style={{ paddingLeft: '20px', paddingTop: '8px' }}>
                <Link to="/">Home</Link>
              </div>
            </NavItem>
            <NavItem className="p-0">
              <div style={{ paddingLeft: '20px', paddingTop: '8px' }}>
                <Link to="/dashboard">Dashboard</Link>
              </div>
            </NavItem>
            <NavItem className="p-0">
              <div style={{ paddingLeft: '20px', paddingTop: '8px' }}>
                <Link to="/workouts">Workouts</Link>
              </div>
            </NavItem>
            {isAuthenticated ?
              <NavItem className="p-0">
              <div style={{ paddingLeft: '20px' }}>
                <Button
                  className="nav-link d-lg-block"
                  color="link"
                  onClick={logout}
                >Logout</Button>
              </div>
            </NavItem>
            : <>
              <NavItem className="p-0">
                <div style={{ paddingLeft: '20px', paddingTop: '8px' }}>
                  <Link to="/login">Login</Link>
                </div>
              </NavItem>
              <NavItem><Button className="nav-link d-lg-block" color="primary">
                <Link to='/signup'>
                  Start now
              </Link>
              </Button>
              </NavItem>
            </>}
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { logout })(IndexNavbar);
