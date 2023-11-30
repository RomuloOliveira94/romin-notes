import { defineStore } from "pinia";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "@/js/firebase";
import { User } from "@/types/User";
import { useStoreNotes } from "./storeNotes";

interface AuthState {
  user: User | null;
  error: boolean;
}

export const useStoreAuth = defineStore("auth", {
  state: (): AuthState => {
    return {
      user: null,
      error: false,
    };
  },
  actions: {
    init() {
      const storeNotes = useStoreNotes();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log("login", user);
          this.user = {
            id: user.uid,
            email: user.email,
          };
          storeNotes.init();
          this.router.push({ name: "notes" });
        } else {
          console.log("logout", user);
          this.user = {};
          storeNotes.clearNotes();
          this.router.push({ name: "auth" });
        }
      });
    },
    async registerUser({ email, password }) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
        })
        .catch((error) => {
          this.error = true;
        });
    },
    async loginUser(credentials) {
      try {
        await signInWithEmailAndPassword(
          auth,
          credentials.email,
          credentials.password
        ).then((userCredential) => {
          const user = userCredential.user;
        });
      } catch (error) {
        this.error = true;
        console.log(error);
      }
    },
    async logoutUser() {
      try {
        await signOut(auth);
      } catch (error) {
        console.log(error.message);
      }
    },
  },
});
