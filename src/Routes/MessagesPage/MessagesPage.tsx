import * as React from "react";
import { Context } from "react";
import {
  Col,
  Row,
  Tab,
  Nav,
  Card,
  Form,
  InputGroup,
  FormControl,
  Button,
  Navbar,
  Container,
} from "react-bootstrap";
import AgriCard from "../../Components/AgriCard/AgriCard";
import {
  ChatItem,
  ChatList,
  MessageList,
  Input,
  // Button,
  MessageBox,
} from "react-chat-elements";
import axios from "../../axios";

export interface MessagesPageProps {}

export interface MessagesPageState {
  isLoading: boolean;
  text: string;
  message: Message[];
  filterMessage: Message[] | null;
}
type Message =
  | {
      position: string;
      type: string;
      text: string;
      date: Date;
    }
  | {
      position: string;
      type: string;
      text: string;
      date: Date;
      reply: {
        photoURL: string;
        title: string;
        titleColor: string;
        message: string;
      };
    };

class MessagesPage extends React.Component<
  MessagesPageProps,
  MessagesPageState
> {
  state: any = {
    isLoading: false,
    text: "",
    message: [
      <MessageBox
        id="first"
        position={"left"}
        type={"text"}
        text={"HELLO THIS IS FIRST"}
        data={{
          uri:
            "https://koolinus.files.wordpress.com/2019/03/avataaars-e28093-koolinus-1-12mar2019.png",
          status: {
            click: false,
            loading: 0,
          },
        }}
      />,
      <MessageBox
        id="second"
        position={"left"}
        type={"text"}
        text={"HELLO THIS IS SECOND"}
        data={{
          uri:
            "https://koolinus.files.wordpress.com/2019/03/avataaars-e28093-koolinus-1-12mar2019.png",
          status: {
            click: false,
            loading: 0,
          },
        }}
      />,
      <MessageBox
        id="third"
        position={"right"}
        type={"text"}
        text={"HELLO THIS IS THIRD"}
        data={{
          uri:
            "https://koolinus.files.wordpress.com/2019/03/avataaars-e28093-koolinus-1-12mar2019.png",
          status: {
            click: true,
            loading: 0,
          },
        }}
      />,
    ],
    filterMessage: null,
  };
  myRef = React.createRef<HTMLInputElement>();

  //   reply={{
  //     photoURL: 'https://facebook.github.io/react/img/logo.svg',
  //     title: 'elit magna',
  //     titleColor: '#8717ae',
  //     message: 'Aliqua amet incididunt id nostrud',
  // }}
  // onReplyMessageClick={() => console.log('reply clicked!')}
  // position={'left'}
  // type={'text'}
  // text={'Tempor duis do voluptate enim duis velit veniam aute ullamco dolore duis irure.'}

  scrollUp = () => window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  inputHandler = (e: any) => {
    e.preventDefault();
    const text: string = e.target.value;
    this.setState({ text: text });
  };
  onChangeHandler = (event: any) => {
    event.preventDefault();
    event.persist();
    console.log(event, "ButtonEvent");
    const text = this.state.text;
    console.log(this.state.filterMessage, "filterMessage");
    const message = [...this.state.filterMessage];
    const newMessage = message.map((f: any, i: number) => {
      if (i === 0) {
        return { ...f, props: { ...f.props, text: text } };
      }
    });
    const updatedMessageArray = [...message, ...newMessage];
    console.log(updatedMessageArray, "updatedMessageArray");
    this.setState({ filterMessage: updatedMessageArray, text: "" });

    // const inputRef = this.myRef.current;
  };

  // handleKeyUp = (event: any) => {
  //   event.persist();
  //   console.log(event, "CharCode");
  //   if (event.key === "Enter") {
  //     this.onChangeHandler(event);
  //     event.target.value = "";
  //   }

  //   // it make the console very slow
  // };
  render() {
    const array = [
      {
        key: "first",
        avatar:
          "https://koolinus.files.wordpress.com/2019/03/avataaars-e28093-koolinus-1-12mar2019.png",
        title: "Facebook",
        subtitle: "What are you doing?",
        date: new Date(),
        unread: 2,
        id: "first",
      },
      {
        key: "second",
        avatar:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTOYmsHq0Z8nR8e7_LDXbr1hwN3yJrQrtgd3Q&usqp=CAU",
        title: "Gmail",
        subtitle: "I am Noor lets see if it works?",
        date: new Date(),
        unread: 1,
        id: "second",
      },
      {
        key: "third",
        avatar:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTOYmsHq0Z8nR8e7_LDXbr1hwN3yJrQrtgd3Q&usqp=CAU",
        title: "Gmail",
        subtitle: "I am Noor lets see if it works?",
        date: new Date(),
        unread: 1,
        id: "third",
      },
    ];
    const { message } = this.state;

    return (
      <>
        <main>
          <Container className="mt-5">
            <Row>
              <Col sm="4" className="flex-fill">
                <AgriCard className="bg-">
                  <ChatList
                    className="chat-list "
                    onClick={(j: any, k: any) => {
                      console.log(j.id, "j.id");
                      console.log(
                        message.filter((e: any) => e.props.id === j.id),
                        "e.props.id"
                      );
                      const filterMessage = message.filter(
                        (e: any) => e.props.id === j.id
                      );
                      this.setState({ filterMessage: filterMessage });
                    }}
                    dataSource={array.map((e: any) => e)}
                  ></ChatList>
                </AgriCard>
              </Col>
              {this.state.filterMessage ? (
                <Col sm={8}>
                  <AgriCard>
                    <Card.Body
                      style={{
                        minHeight: "200px",
                        maxHeight: "500px",
                        overflow: "auto",
                      }}
                    >
                      {this.state.filterMessage}
                    </Card.Body>
                    <Card.Footer className="bg-transparent ">
                      <Form onSubmit={this.onChangeHandler}>
                        <InputGroup>
                          {/* <Input
                      id="inputValue"
                      value={this.state.text}
                      ref={this.myRef}
                      placeholder="Type message Here"
                      onChange={this.inputHandler}
                      defaultValue={this.state.text}
                      // rightButtons={}
                    />{" "} */}
                          <FormControl
                            style={{ borderRadius: "2rem 0 0 2rem " }}
                            id="inputValue"
                            value={this.state.text}
                            ref={this.myRef}
                            placeholder="Type message Here"
                            onChange={this.inputHandler}
                            defaultValue={this.state.text}
                          />
                          <InputGroup.Append>
                            {/* <Button
                      type="submit"
                      id="myBtn"
                      color="white"
                      backgroundColor="black"
                      text="Send"
                      onClick={this.onChangeHandler}
                    /> */}
                            <Button
                              type="submit"
                              style={{ borderRadius: "0 2rem 2rem 0" }}
                            >
                              Send
                            </Button>{" "}
                          </InputGroup.Append>
                        </InputGroup>
                      </Form>
                    </Card.Footer>
                  </AgriCard>
                </Col>
              ) : null}
            </Row>
          </Container>
        </main>
      </>
    );
  }
}

export default MessagesPage;

// {
//   avatar:
//     "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/512px-React-icon.svg.png",
//   id: "first",
//   eventKey: "first",
//   alt: "Reactjs",
//   title: "Facebook",
//   subtitle: "What are you doing?",
//   date: new Date(),
//   unread: 2,
//   position: "right",

//   type: "text",
//   text:
//     "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
// },
// {
//   avatar:
//     "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/512px-React-icon.svg.png",
//   alt: "Reactjs",
//   title: "Google",
//   subtitle: "What are you doing?",
//   date: new Date(),
//   unread: 2,
// },
