import * as React from "react";
import AgriCard from "../../Components/AgriCard/AgriCard";
import { Card, Form, Container, Row, Button } from "react-bootstrap";
import { auth } from "firebase";
import { db } from "../../services/firebase";
import { RouteComponentProps, withRouter } from "react-router-dom";

export interface HomeProps {}

export interface HomeState {}

class Home extends React.Component<HomeProps & RouteComponentProps, HomeState> {
  state = {
    user: auth().currentUser,
    displayName: "",
    photoURL: "",
  };

  onChangeHandler = (event: any) => {
    event.preventDefault();
    console.log(this.state, "submit");
    const { user, photoURL, displayName } = this.state;
    user
      ?.updateProfile({ displayName: displayName, photoURL: photoURL })
      .then((response) => {
        db.ref("users").push({
          date: Date.now(),
          uid: user.uid,
          avatar: user.photoURL,
          title: user.displayName,
        });
        this.setState({ photoURL: "", displayName: "" });
        this.props.history.push("/");
      })
      .catch((e) => console.log(e, "errorOccured"));
  };
  changeInputHandler = (input: any) => (event: any) => {
    event.preventDefault();
    this.setState({ [input]: event.target.value });
  };
  render() {
    console.log(this.state, "userHome");
    return (
      <>
        <Container>
          <AgriCard>
            <Form onSubmit={this.onChangeHandler}>
              <Card.Body>
                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    placeholder="Title"
                    value={this.state.displayName}
                    onChange={this.changeInputHandler("displayName")}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Avatar</Form.Label>
                  <Form.Control
                    placeholder="Avatar"
                    value={this.state.photoURL}
                    onChange={this.changeInputHandler("photoURL")}
                  />
                </Form.Group>
                <Button type="submit">Submit</Button>
              </Card.Body>
            </Form>
          </AgriCard>
        </Container>
      </>
    );
  }
}

export default withRouter(Home);
