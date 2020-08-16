import * as React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { RouteComponentProps } from "react-router";

export interface PrivateRouteProps extends RouteProps {
  authenticated: boolean;
}

export interface PrivateRouteState {}

class PrivateRoute extends React.Component<
  PrivateRouteProps,
  PrivateRouteState
> {
  render() {
    return (
      <Route
        render={(props: RouteComponentProps) => {
          if (!this.props.authenticated) {
            return <Redirect to="/signIn" />;
          }
          if (this.props.component) {
            return React.createElement(this.props.component);
          }
          if (this.props.render) {
            return this.props.render(props);
          }
        }}
      />
    );
  }
}

export default PrivateRoute;
