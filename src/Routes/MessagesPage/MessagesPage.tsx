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
import AuthContext, {
  AuthContextData,
} from "../../context/AuthContext/AuthContext";
import { auth } from "firebase";
import { db } from "../../services/firebase";
import { userInfo } from "os";

export interface MessagesPageProps {}

export interface MessagesPageState {
  user: firebase.User;
  isLoading: boolean;
  to: string;
  text: string;
  chats: any[];
  content: string;
  readError: string | null;
  writeError: string | null;
  message: Message;
  filterMessage: Message[] | null;
  users: any[];
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
  static contextType: React.Context<AuthContextData> = AuthContext;

  state: any = {
    user: auth().currentUser,
    isLoading: false,
    text: "",
    chats: [],
    content: "",
    to: "",
    readError: null,
    writeError: null,
    users: [],
    message: [
      {
        position: "left",
        type: "text",
        text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
        avatar: "",
        title: "",
        unread: 0,
        date: new Date(),
      },
    ],
    filterMessage: null,
  };
  componentDidMount = async () => {
    this.setState({ readError: null });
    try {
      db.ref("chats").on("value", (snapshot) => {
        let chats: any = [];
        snapshot.forEach((snap) => {
          chats.push(snap.val());
        });

        this.setState({ chats: chats });
      });
      db.ref("users").once("value", (snapshot) => {
        let users: any = [];
        snapshot.forEach((snap) => {
          users.push(snap.val());
        });
        this.setState({ users: users });
      });
    } catch (error) {
      this.setState({ readError: error.message });
    }
  };

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

  inputHandler = (e: any) => {
    e.preventDefault();
    const content: string = e.target.value;
    this.setState({ content: content });
  };
  onChangeHandler = async (event: any) => {
    event.preventDefault();
    const message = [...this.state.message];

    const newMessage = message.map((f: any, i: number) => {});
    //   return { ...f, props: { ...f.props, text: this.state.content } };
    // });
    // this.setState({ message: newMessage });
    // console.log(newMessage, "newMessage");
    // const text = newMessage.map((e: any) => e.props);
    // console.log(text, "text");

    try {
      const { user, content, to } = this.state;

      await db.ref("chats").push({
        position: "left",
        date: Date.now(),
        text: content,
        uid: user.uid,
        avatar: user.photoURL,
        title: user.displayName,
        to: to,
      });
      this.setState({ content: "" });
    } catch (error) {
      this.setState({ writeError: error.message });
    }
  };

  render() {
    const { user, chats, users, to, filterMessage } = this.state;
    const filter = chats.filter((a: any) => a.uid !== user.uid);
    // const filterInFilter = filter
    //   .filter((j: any, k: number) => j.uid === chat.uid)
    //   .map((text: any, l: any, arr: any) => {
    //     if (arr.length === l + 1) {
    //       return text.text;
    //     }
    //   });
    // console.log(user, "user");

    return (
      <>
        <main>
          <Container className="mt-5">
            <Row>
              <Col sm="4" className="flex-fill">
                <AgriCard className="bg-">
                  {/* <ChatList
                    className="chat-list "
                    onClick={(data: any, i: any) => {
                      console.log(data, i, "herer");
                      const to = data.uid;
                      this.setState({ to: to });
                    }}
                    dataSource={users
                      .filter((j: any, i: any) => {
                        return j.uid !== user.uid ? j : null;
                      })

                      .map((chat: any, i: any) => {
                        // console.log(chat, "chat");
                        return {
                          avatar: chat.avatar,
                          title: chat.title,
                          subtitle: "",
                          unread: console.log(filterMessage, "filrermessage"),
                          date: null,
                          uid: chat.uid,
                        };
                      })}
                  ></ChatList> */}
                  {users
                    .filter((j: any, i: any) => {
                      return j.uid !== user.uid ? j : null;
                    })

                    .map((chat: any, i: any, arr: any) => {
                      return (
                        <ChatItem
                          avatarFlexible={true}
                          avatar={chat.avatar}
                          title={chat.title}
                          subtitle={"CultumChange "}
                          date={null}
                          unread={arr.length}
                          onClick={(data: any, i: any) => {
                            data.preventDefault();
                            data.persist();
                            console.log(data, chat.uid, "herer");
                            const to = chat.uid;
                            this.setState({ to: to });
                          }}
                        />
                      );
                    })}
                </AgriCard>
              </Col>
              {to && (
                <Col sm={8}>
                  <AgriCard>
                    <Card.Body
                      style={{
                        minHeight: "200px",
                        maxHeight: "500px",
                        overflow: "auto",
                      }}
                    >
                      {/* {this.state.filterMessage} */}
                      {chats
                        .filter(
                          (a: any) =>
                            (a.uid === user.uid && a.to === to) ||
                            (a.uid === to && a.to === user.uid)
                        )
                        .map((chat: any, i: number, arr: any) => {
                          if (arr.length - 1 === i) {
                            console.log(chat, "arry");
                            const filterMessage = chat;
                            console.log(filterMessage, "filtermessage");
                            // this.setState({ filterMessage: chat });
                          }
                          // console.log(chat, "chatmessaglist");
                          const uid = user.uid;
                          return (
                            <>
                              {/* <MessageList
                              key={chat.date}
                              dataSource={[
                                {
                                  key: chat.date,
                                  avatar: uid !== chat.uid && chat.avatar,
                                  date: chat.date,
                                  title: uid !== chat.uid && chat.title,
                                  titleColor: "var(--primary)",
                                  position: uid === chat.uid ? "right" : "left",
                                  text: chat.text,
                                  uid: chat.uid,
                                  forwarded: true,
                                  replyButton: true,
                                  // onClick: () => console.log("i am clicked"),
                                  status: uid === chat.uid ? "sent" : "read",
                                },
                              ]}
                            /> */}
                              <MessageBox
                                type={"text"}
                                text={chat.text}
                                key={chat.date}
                                avatar={uid !== chat.uid && chat.avatar}
                                date={chat.date}
                                title={uid !== chat.uid && chat.title}
                                titleColor={"var(--primary)"}
                                position={uid === chat.uid ? "right" : "left"}
                                status={uid === chat.uid ? "sent" : "read"}
                                uid={chat.uid}
                                forwarded={true}
                                replyButton={true}
                                focus={true}
                                onMessageFocused={(f: any, g: any) => {
                                  f.persist();
                                  console.log(f, g, "messagefocused");
                                }}
                                onReplyClick={(h: any, i: any) =>
                                  console.log(h, i, "onReplyClicked")
                                }
                                onForwardClick={(j: any, k: any) =>
                                  console.log(j, k, "onForwarClick")
                                }
                                onReplyMessageClick={(l: any, m: any) => {
                                  console.log(l, m, "onReplyclicked");
                                }}
                                data={{
                                  uri:
                                    "https://facebook.github.io/react/img/logo.svg",
                                  status: {
                                    click: false,
                                    loading: 1,
                                  },
                                }}
                              />
                            </>
                          );
                        })}
                    </Card.Body>
                    <Card.Footer className="bg-transparent ">
                      <Form onSubmit={this.onChangeHandler}>
                        <InputGroup>
                          <FormControl
                            style={{ borderRadius: "2rem 0 0 2rem " }}
                            value={this.state.content}
                            placeholder="Type message Here"
                            onChange={this.inputHandler}
                          />
                          <InputGroup.Append>
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
              )}
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
