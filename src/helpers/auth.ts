import { auth } from "../services/firebase";

export function signUp(email: any, password: any) {
  return auth().createUserWithEmailAndPassword(email, password);
}

export function signIn(email: any, password: any) {
  return auth().signInWithEmailAndPassword(email, password);
}
