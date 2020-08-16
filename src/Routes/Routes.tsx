import * as React from "react";
import { Switch, Route } from "react-router-dom";
import MessagesPage from "./MessagesPage/MessagesPage";
import SignIn from "./SignIn/SignIn";
import AuthContext, {
  AuthContextData,
} from "../context/AuthContext/AuthContext";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import PublicRoute from "./PublicRoute/PublicRoute";
import Home from "./Home/Home";

export interface RoutesProps {}

const Routes: React.SFC<RoutesProps> = () => {
  const context = React.useContext<AuthContextData>(AuthContext);
  console.log(context.authenticated, "authenticated");
  return (
    <Switch>
      <PrivateRoute
        exact
        path="/home"
        authenticated={context.authenticated}
        component={Home}
      />
      <PrivateRoute
        exact
        path="/messagespage"
        authenticated={context.authenticated}
        component={MessagesPage}
      />
      <PrivateRoute
        exact
        path="/notification"
        authenticated={context.authenticated}
        component={MessagesPage}
      />
      <PublicRoute
        path="/signIn"
        authenticated={context.authenticated}
        component={SignIn}
        redirectedPath={"/messagespage"}
      />
    </Switch>
  );
};

export default Routes;
