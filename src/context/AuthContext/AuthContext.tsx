import * as React from "react";

export interface AuthContextData {
  idToken: string | null;
  userId: string | null;
  expiresIn: string | null;
  logIn: (token: string, userId: string, expiresIn: any) => void;
  logOut: () => void;
}

const AuthContext = React.createContext({
  idToken: null,
  userId: null,
  expiresIn: null,
  logIn: (token: string, userId: string, expiresIn: any) => {},
  logOut: () => {},
} as AuthContextData);

export default AuthContext;
