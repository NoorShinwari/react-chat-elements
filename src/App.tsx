import * as React from "react";
import Layout from "./Layout/Layout";
import "./App.scss";
import "react-chat-elements/dist/main.css";
import AuthContext from "./context/AuthContext/AuthContext";
import { auth } from "./services/firebase";

export interface AppProps {}

export interface AppState {
  authenticated: boolean;
  userId: string | null;
  idToken: string | null;
  expiresIn: any;
  loading: boolean;
}

class App extends React.Component<AppProps, AppState> {
  state = {
    authenticated: false,
    userId: null,
    idToken: null,
    expiresIn: null,
    loading: true,
  };

  componentDidMount = () => {
    auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authenticated: true,
          loading: false,
        });
      } else {
        this.setState({
          authenticated: false,
          loading: false,
        });
      }
    });
  };

  render() {
    const { userId, idToken, expiresIn, authenticated } = this.state;
    return (
      <AuthContext.Provider
        value={{
          authenticated: authenticated,
          userId: userId,
          idToken: idToken,
          expiresIn: expiresIn,
        }}
      >
        <Layout />
      </AuthContext.Provider>
    );
  }
}

export default App;
