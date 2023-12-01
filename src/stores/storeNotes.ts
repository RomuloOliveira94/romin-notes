import type { newNoteValue } from "./../types/NewNoteValue";
import {
  collection,
  onSnapshot,
  doc,
  deleteDoc,
  updateDoc,
  query,
  orderBy,
  addDoc,
} from "firebase/firestore";
import { defineStore } from "pinia";
import { db } from "@/js/firebase";
import { useStoreAuth } from "./storeAuth";
import { Note } from "@/types/Note";

interface NotesState {
  notes: Note[];
  loadingNotes: boolean;
}

let notesCol;
let notesColQuery;

let getNotesSnapshot = null;

export const useStoreNotes = defineStore("notes", {
  state: (): NotesState => {
    return {
      notes: [],
      loadingNotes: false,
    };
  },
  actions: {
    init() {
      const storeAuth = useStoreAuth();
      notesCol = collection(db, "users", storeAuth.user?.id, "notes");
      notesColQuery = query(notesCol, orderBy("date", "asc"));
      this.getNotes();
    },
    getNotes() {
      this.loadingNotes = false;
      const q = query(notesColQuery);

      getNotesSnapshot = onSnapshot(q, (querySnapshot) => {
        // eslint-disable-next-line prefer-const
        let notes: Note[] = [];
        this.loadingNotes = false;
        querySnapshot.forEach((doc) => {
          const docs = doc.data() as Note;
          const note = {
            id: doc.id,
            title: docs.title,
            content: docs.content,
            date: docs.date,
          };
          notes.unshift(note);
        });
        this.notes = notes;
        this.loadingNotes = true;
      });
    },
    clearNotes() {
      this.notes = [];
      if (getNotesSnapshot) getNotesSnapshot(); // cancel previous listener
    },
    async addNote(content: string, title: string) {
      const currentDate = new Date().getTime();
      const id = currentDate;
      await addDoc(notesCol, {
        title: title,
        content: content,
        date: id,
      });
    },
    async deleteNote(id) {
      await deleteDoc(doc(notesCol, id.toString()));
    },
    async updateNote(id, content: newNoteValue) {
      await updateDoc(doc(notesCol, id.toString()), {
        title: content.title,
        content: content.content,
      });
    },
  },
  getters: {
    getNoteContent: (state) => (id) => {
      return state.notes.find((content) => content.id == id).content;
    },
    getNoteTitle: (state) => {
      return (id) => {
        return state.notes.filter((title) => title.id == id)[0].title;
      };
    },
    totalNotesCount: (state) => {
      return state.notes.length;
    },
    totalCharactersCount: (state) => {
      return state.notes.reduce((acc, note) => {
        return (acc += note.content.length);
      }, 0);
    },
  },
});
