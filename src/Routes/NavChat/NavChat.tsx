import * as React from "react";
import {
  Nav,
  NavDropdown,
  Navbar,
  Badge,
  ListGroup,
  Card,
} from "react-bootstrap";
import { auth } from "../../services/firebase";
import AuthContext, {
  AuthContextData,
} from "../../context/AuthContext/AuthContext";
import { Link } from "react-router-dom";
import ToastNotify from "../../Components/AgriCard/ToastNotify/ToastNotify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faBell } from "@fortawesome/free-solid-svg-icons";

export interface NavChatProps {}

const NavChat: React.SFC<NavChatProps> = () => {
  const context = React.useContext<AuthContextData>(AuthContext);
  const [toastCount, setToastCount] = React.useState([1, 2, 3, 4]);
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
            <Badge
              variant="warning"
              style={{ position: "relative", bottom: "1rem" }}
            >
              1
            </Badge>
          </Nav.Link>
          <NavDropdown
            className="toastCard"
            as={Card}
            id="notification"
            title={
              <>
                <FontAwesomeIcon icon={faBell} />
                <Badge
                  variant="warning"
                  style={{ position: "relative", bottom: "1rem" }}
                >
                  {toastCount.length === 0 ? null : toastCount.length}
                </Badge>
              </>
            }
          >
            {toastCount.length ? (
              toastCount.map((e: any) => (
                <ToastNotify
                  key={e}
                  id={e}
                  decrement={() => {
                    const count = [...toastCount];
                    const filterCount = count.filter((f: any) => f !== e);
                    console.log(filterCount, "filterCount");
                    setToastCount(filterCount);
                  }}
                />
              ))
            ) : (
              <Card.Text className="text-center">Empty</Card.Text>
            )}
          </NavDropdown>
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
