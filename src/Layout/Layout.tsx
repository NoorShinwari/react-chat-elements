import * as React from "react";
import MessagesPage from "../Routes/MessagesPage/MessagesPage";
import NavChat from "../Routes/NavChat/NavChat";
import Routes from "../Routes/Routes";
import { Container, Jumbotron, Card } from "react-bootstrap";

export interface LayoutProps {}

const Layout: React.SFC<LayoutProps> = () => {
  return (
    <>
      <header>
        <NavChat />
      </header>
      <main className="vh-100">
        <Routes />
      </main>
      <footer className="mt-auto">
        <Jumbotron className="bg-dark d-flex text-center font-weight-bold text-muted">
          <Container>
            <Card className="mt-5">
              <Card.Body>
                <Card.Text>HERE GOES THE FOOTER</Card.Text>
              </Card.Body>
            </Card>
          </Container>
        </Jumbotron>
      </footer>
    </>
  );
};

export default Layout;
