<template>
  <div class="notes">
    <div class="has-background-dark p-3 mb-5 card">
      <div class="field">
        <label class="label has-text-white">Title</label>
        <div class="control">
          <input
            class="input"
            type="text"
            placeholder="Note title"
            v-model="newNoteTitle"
            ref="newNoteRef"
          />
        </div>
      </div>
      <div class="field">
        <label class="label has-text-white">Note</label>
        <div class="control">
          <textarea
            class="textarea"
            placeholder="Add a new note"
            v-model="newNote"
          ></textarea>
        </div>
      </div>

      <div class="field is-grouped is-grouped-right">
        <div class="control">
          <button
            class="button is-link has-background-secondary"
            @click="addNote"
            :disabled="!newNote || !newNoteTitle"
          >
            Add New Note
          </button>
        </div>
      </div>
    </div>

    <NotesComponent
      v-for="note in storeNotes.notes"
      :key="note.id"
      :note="note"
      @delete-note="deleteNote"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import NotesComponent from "../components/Notes/NotesComponent.vue";
import { useStoreNotes } from "@/stores/storeNotes";

const storeNotes = useStoreNotes();
const newNoteTitle = ref("");
const newNote = ref("");
const newNoteRef = ref();
const addNote = () => {
  let currentDate = new Date().getTime();
  let id = currentDate.toString();

  let note = {
    id,
    title: newNoteTitle.value,
    content: newNote.value,
  };
  storeNotes.notes.unshift(note);
  newNote.value = "";
  newNoteTitle.value = "";
  newNoteRef.value.focus();
};
const deleteNote = (noteId: string) => {
  storeNotes.notes = storeNotes.notes.filter((notes) => {
    return notes.id !== noteId;
  });
};
</script>
