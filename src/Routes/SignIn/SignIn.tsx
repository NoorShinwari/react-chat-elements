import * as React from "react";
import {
  Container,
  Jumbotron,
  Card,
  Form,
  Button,
  Row,
  Col,
} from "react-bootstrap";
import AgriCard from "../../Components/AgriCard/AgriCard";
import axios from "axios";
import AuthContext, {
  AuthContextData,
} from "../../context/AuthContext/AuthContext";
import { withRouter } from "react-router-dom";
import { RouteComponentProps } from "react-router";

export interface SignInProps {}

export interface SignInState {
  user: User;
  registered: boolean;
}
type User = {
  email: string;
  password: string;
  idToken: null | string | undefined;
  userId: null | string | undefined;
  expiresIn: null | string | undefined;
};

class SignIn extends React.Component<
  RouteComponentProps & SignInProps,
  SignInState
> {
  static contextType: React.Context<AuthContextData> = AuthContext;
  state = {
    user: {
      email: "",
      password: "",
      idToken: null,
      userId: null,
      expiresIn: null,
    },
    registered: false,
  };
  onChangeHandler = (input: any) => (event: any) => {
    const user: any = { ...this.state.user };
    user[input] = event.target.value;
    this.setState({ user: user });
  };
  toggleButton = () => {
    this.setState((prevState) => ({ registered: !prevState.registered }));
  };
  formSubmit = (event: any) => {
    event.preventDefault();
    const { email, password } = this.state.user;
    const { registered } = this.state;
    const user = { email: email, password: password, returnSecureToken: true };
    console.log(event, "formSubmit");
    console.log(user, "user");

    const apiKey = "AIzaSyA6SfcDih--QL78CJOF31WJtbMQv0k3l-g";
    let url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";

    if (registered) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";
    }
    axios
      .post(url + apiKey, user)
      .then((response) => {
        const { idToken, localId, expiresIn } = response.data;
        const { user } = this.state;
        user.idToken = idToken;
        user.expiresIn = expiresIn;
        user.userId = localId;
        this.context.userId = localId;
        this.context.idToken = idToken;
        this.context.expiresIn = expiresIn;
        this.setState({ user: user });
        console.log(this.context, "this.context");

        console.log(this.state.user, "userState");
        this.props.history.push("/messagespage");
      })
      .catch((e) => console.log(e.message, "error"));
  };
  render() {
    const { registered } = this.state;
    let formText = "Already Registered?";
    let button = "Log In";
    let toggleButton = "Sign Up";
    if (registered) {
      button = "Register!";
      toggleButton = "Sign In";
      formText = "Not Registered?";
    }
    const { email, password } = this.state.user;
    return (
      <>
        <Row className="d-flex flex-row justify-content-center mt-5">
          <Col className="" md="6">
            <Jumbotron className="bg-dark ">
              <AgriCard>
                <Card.Body>
                  <Form onSubmit={this.formSubmit}>
                    <Form.Label>Email</Form.Label>
                    <Form.Group>
                      <Form.Control
                        type="email"
                        value={email}
                        onChange={this.onChangeHandler("email")}
                        placeholder="Enter Email"
                      />
                    </Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Group>
                      <Form.Control
                        type="password"
                        value={password}
                        onChange={this.onChangeHandler("password")}
                        placeholder="Enter Password"
                      />
                    </Form.Group>
                    <Button type="submit">{toggleButton} </Button>
                  </Form>
                  <Row>
                    <Col>
                      {formText}{" "}
                      <span>
                        <Button onClick={this.toggleButton}>{button}</Button>
                      </span>
                    </Col>
                  </Row>
                </Card.Body>
              </AgriCard>
            </Jumbotron>{" "}
          </Col>
        </Row>
      </>
    );
  }
}

export default withRouter(SignIn);
