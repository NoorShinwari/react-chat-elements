import * as React from "react";
import { Nav, NavDropdown, Navbar } from "react-bootstrap";

export interface NavChatProps {}

const NavChat: React.SFC<NavChatProps> = () => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="/">Chat App</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/messagespage">Messages</Nav.Link>
          <Nav.Link href="/notification">Notification</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link href="/signIn">Sign In</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavChat;
