import React from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

class Header extends React.Component {


  render() {
    return <Navbar fixedTop>
      <Navbar.Header>
        <Navbar.Brand>
          Cryptocurrency ninja
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav>
          <NavItem eventKey={1} href="#current">
            Current rates
          </NavItem>
          <NavItem eventKey={2} href="#converter">
            Converter
          </NavItem>
          <NavItem eventKey={3} href="#static">
            Bitcoin dynamics
          </NavItem>
          <NavItem eventKey={4} href="#stream">
            Streaming data
          </NavItem>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  }
}

export default Header;
