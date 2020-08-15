import * as React from "react";
import { Switch, Route } from "react-router-dom";
import MessagesPage from "./MessagesPage/MessagesPage";
import SignIn from "./SignIn/SignIn";

export interface RoutesProps {}

const Routes: React.SFC<RoutesProps> = () => {
  return (
    <Switch>
      <Route component={SignIn} path="/signIn" />

      <Route component={MessagesPage} path="/messagespage" />
    </Switch>
  );
};

export default Routes;
