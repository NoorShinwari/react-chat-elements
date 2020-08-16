import * as React from "react";
import {
  RouteProps,
  Route,
  RouteComponentProps,
  Redirect,
} from "react-router-dom";

export interface PublicRouteProps extends RouteProps {
  authenticated: boolean;
  redirectedPath: string;
}

export interface PublicRouteState {}

class PublicRoute extends React.Component<PublicRouteProps, PublicRouteState> {
  render() {
    return (
      <Route
        render={(props: RouteComponentProps) => {
          if (this.props.authenticated) {
            return <Redirect to={this.props.redirectedPath} />;
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

export default PublicRoute;
