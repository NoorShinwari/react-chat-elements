import * as React from "react";
import { Nav, NavDropdown, Navbar } from "react-bootstrap";
import { auth } from "../../services/firebase";
import AuthContext, {
  AuthContextData,
} from "../../context/AuthContext/AuthContext";
import { Link } from "react-router-dom";

export interface NavChatProps {}

const NavChat: React.SFC<NavChatProps> = () => {
  const context = React.useContext<AuthContextData>(AuthContext);
  const signOut = () => {
    auth()
      .signOut()
      .then((response) => console.log(response, "signoutSuccessful"))
      .catch((e) => console.log(e));
  };
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand to="/home" as={Link}>
        Chat App
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="messagespage">
            Messages
          </Nav.Link>
          <Nav.Link as={Link} to="notification">
            Notification
          </Nav.Link>
        </Nav>
        <Nav>
          {context.authenticated ? (
            <Nav.Link onClick={signOut}>Sign Out</Nav.Link>
          ) : (
            <Nav.Link href="/signIn">Sign In</Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavChat;
