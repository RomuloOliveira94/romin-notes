<template>
  <div class="notes">
    <AddEditNote v-model="newNoteValue" ref="addEditNoteRef" bg-color="dark">
      <template #buttons>
        <button
          class="button is-link has-background-secondary"
          @click="addNote"
          :disabled="!newNoteValue.title || !newNoteValue.content"
        >
          Add New Note
        </button>
      </template>
    </AddEditNote>

    <!--
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
    -->

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

const storeNotes = useStoreNotes();
const addEditNoteRef = ref();

const newNoteValue = reactive({
  title: "",
  content: "",
});
const addNote = () => {
  storeNotes.addNote(newNoteValue.content, newNoteValue.title);
  newNoteValue.content = "";
  newNoteValue.title = "";
  addEditNoteRef.value.focusTextArea();
};
</script>
