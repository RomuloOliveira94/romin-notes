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
import { useStoreLang } from "./storeLang";

interface AuthState {
  user: User | null;
  error: boolean;
  loading: boolean;
}

export const useStoreAuth = defineStore("auth", {
  state: (): AuthState => {
    return {
      user: null,
      error: false,
      loading: false,
    };
  },
  actions: {
    init() {
      const storeLang = useStoreLang();
      const storeNotes = useStoreNotes();
      this.loading = true;
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.user = {
            id: user.uid,
            email: user.email,
          };
          storeNotes.init();
          storeLang.init();
          this.router.push({ name: "notes" });
        } else {
          this.user = {};
          storeNotes.clearNotes();
          this.router.push({ name: "auth" });
        }
        this.loading = false;
      });
    },
    async registerUser({ email, password }) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
        })
        .catch((error) => {
          console.log(error);
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
