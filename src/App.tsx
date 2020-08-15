import * as React from "react";
import Layout from "./Layout/Layout";
import "./App.scss";
import "react-chat-elements/dist/main.css";
import AuthContext from "./context/AuthContext/AuthContext";

export interface AppProps {}

export interface AppState {
  userId: string | null;
  idToken: string | null;
  expiresIn: any;
}

class App extends React.Component<AppProps, AppState> {
  state = { userId: null, idToken: null, expiresIn: null };

  logIn = (idToken: string, userId: string, expiresIn: any) => {
    console.log("logIn");
  };
  logOut = () => {
    console.log(this.state, "appState");
    console.log("logOut");
  };
  render() {
    const { userId, idToken, expiresIn } = this.state;
    return (
      <AuthContext.Provider
        value={{
          userId: userId,
          idToken: idToken,
          expiresIn: expiresIn,
          logIn: this.logIn,
          logOut: this.logOut,
        }}
      >
        <Layout />
      </AuthContext.Provider>
    );
  }
}

export default App;
