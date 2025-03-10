import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { app } from "../config";
export const auth = getAuth(app);
export async function logIn(email: string, password: string) {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    return user;
}

export async function logOut() {
    await signOut(auth);
}
