// import * as React from "react";
// import { Switch, Route } from "react-router-dom";
// import MessagesPage from "./MessagesPage/MessagesPage";
// import SignIn from "./SignIn/SignIn";
// import AuthContext, {
//   AuthContextData,
// } from "../context/AuthContext/AuthContext";

// export interface RoutesProps {}

// const Routes: React.SFC<RoutesProps> = () => {
//   const context = React.useContext<AuthContextData>(AuthContext);

//   return (
//     <Switch>
//       <Route component={SignIn} path="/signIn" />
//       {context.idToken ? (
//         <Route component={MessagesPage} path="/messagespage" />
//       ) : null}
//     </Switch>
//   );
// };

// export default Routes;
