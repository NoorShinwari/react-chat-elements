import * as React from "react";

export interface AuthContextData {
  authenticated: boolean;
  idToken: string | null;
  userId: string | null;
  expiresIn: string | null;
}

const AuthContext = React.createContext({
  authenticated: false,
  idToken: null,
  userId: null,
  expiresIn: null,
} as AuthContextData);

export default AuthContext;
