import type { newNoteValue } from "./../types/NewNoteValue";
import { defineStore } from "pinia";

export const useStoreNotes = defineStore("notes", {
  state: () => {
    return {
      notes: [
        {
          id: 0,
          title: "My first note",
          content:
            "nota1 dolor sit, amet consectetur adipisicing elit. Eius eni, asdushaduhas, daidasda amet consectetur adipisicing elit amet consectetur adipisicing elit amet consectetur adipisicing elit",
        },
        {
          id: 1,
          title: "My second note",
          content:
            "nota2 ipsum dolor sit, amet consectetur adipisicing elit. Eius eni, asdushaduhas, daidasda amet consectetur adipisicing elit amet consectetur adipisicing elit amet consectetur adipisicing elit",
        },
      ],
    };
  },
  actions: {
    addNote(content: string, title: string) {
      const currentDate = new Date().getTime();
      const id = currentDate;
      const note = {
        id,
        title: title,
        content: content,
      };
      this.notes.unshift(note);
    },
    deleteNote(id: number) {
      this.notes = this.notes.filter((notes) => {
        return notes.id !== id;
      });
    },
    updateNote(id: number, content: newNoteValue) {
      const index = this.notes.findIndex((note) => note.id === id);
      this.notes[index].content = content.content;
      this.notes[index].title = content.title;
    },
  },
  getters: {
    getNoteContent: (state) => {
      return (id: number) => {
        return state.notes.filter((content) => content.id === id)[0].content;
      };
    },
    getNoteTitle: (state) => {
      return (id: number) => {
        return state.notes.filter((title) => title.id === id)[0].title;
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
