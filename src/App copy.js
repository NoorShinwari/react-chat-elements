{
  // import * as React from "react";
  // import Layout from "./Layout/Layout";
  // import "./App.scss";
  // import "react-chat-elements/dist/main.css";
  // import AuthContext from "./context/AuthContext/AuthContext";
  // export interface AppProps {}
  // export interface AppState {
  //   authenticated: boolean;
  //   userId: string | null;
  //   idToken: string | null;
  //   expiresIn: any;
  // }
  // class App extends React.Component<AppProps, AppState> {
  //   state = {
  //     authenticated: false,
  //     userId: null,
  //     idToken: null,
  //     expiresIn: null,
  //   };
  //   componentDidMount = () => {
  //     const expiresIn = localStorage.getItem("expiresIn") as string;
  //     console.log(expiresIn, "expiresIn");
  //     if (expiresIn) {
  //       const date = Date.now();
  //       const userId = localStorage.getItem("userId") as string;
  //       const idToken = localStorage.getItem("idToken") as string;
  //       if (new Date(date) < new Date(expiresIn)) {
  //         this.loginPersist(idToken, userId);
  //       }
  //     } else {
  //       this.logOut();
  //     }
  //   };
  //   loginPersist = (idToken: string, userId: string) => {
  //     this.setState({ userId: userId, idToken: idToken, authenticated: true });
  //   };
  //   logIn = (idToken: string, userId: string, expiresIn: any) => {
  //     localStorage.setItem("idToken", idToken);
  //     localStorage.setItem("userId", userId);
  //     const timeGot = parseInt(expiresIn as string) * 1000;
  //     const timeSpan = new Date(Date.now() + timeGot).toString();
  //     localStorage.setItem("expiresIn", timeSpan);
  //     this.setState({
  //       authenticated: true,
  //       idToken: idToken,
  //       userId: userId,
  //       expiresIn: timeSpan,
  //     } as AppState);
  //     console.log(this.state, "AppState logIn");
  //   };
  //   logOut = () => {
  //     localStorage.removeItem("idToken");
  //     localStorage.removeItem("expiresIn");
  //     localStorage.removeItem("userId");
  //     this.setState({
  //       idToken: null,
  //       userId: null,
  //       expiresIn: null,
  //     });
  //   };
  //   render() {
  //     const { userId, idToken, expiresIn, authenticated } = this.state;
  //     return (
  //       <AuthContext.Provider
  //         value={{
  //           authenticated: authenticated,
  //           userId: userId,
  //           idToken: idToken,
  //           expiresIn: expiresIn,
  //           logIn: this.logIn,
  //           logOut: this.logOut,
  //         }}
  //       >
  //         <Layout />
  //       </AuthContext.Provider>
  //     );
  //   }
  // }
  // export default App;
}
