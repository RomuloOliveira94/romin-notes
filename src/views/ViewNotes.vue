<template>
  <div class="notes">
    <AddEditNote
      v-model="newNoteValues"
      ref="addEditNoteRef"
      bg-color="warning"
      placeholder-content="Type something..."
    >
      <template #buttons>
        <button
          class="button is-link has-background-primary"
          @click="addNote"
          :disabled="!newNoteValues.title || !newNoteValues.content"
        >
          Add New Note
        </button>
      </template>
    </AddEditNote>

    <NotesComponent
      v-for="note in storeNotes.notes"
      :key="note.id"
      :note="note"
    />
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import NotesComponent from "../components/Notes/NotesComponent.vue";
import { useStoreNotes } from "@/stores/storeNotes";
import AddEditNote from "../components/Notes/AddEditNote.vue";
import { useWatchCharacters } from "@/composable/useWatchCharacters";
import type { newNoteValue } from "@/types/NewNoteValue";

const storeNotes = useStoreNotes();
const addEditNoteRef = ref();

const newNoteValues: newNoteValue = reactive({
  title: "",
  content: "",
});
const addNote = () => {
  storeNotes.addNote(newNoteValues.content, newNoteValues.title);
  newNoteValues.content = "";
  newNoteValues.title = "";
  addEditNoteRef.value.focusTextArea();
};

useWatchCharacters(newNoteValues, 150);
</script>
