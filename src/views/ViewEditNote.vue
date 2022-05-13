<template>
  <div class="edit-note">
    <AddEditNote v-model="newNoteValue" ref="addEditNoteRef" bg-color="link">
      <template #buttons>
        <button
          class="button is-link has-background-dark"
          @click="addNote"
          :disabled="!newNoteValue.title || !newNoteValue.content"
        >
          Save Note
        </button>
      </template>
    </AddEditNote>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import AddEditNote from "../components/Notes/AddEditNote.vue";

const newNoteValue = reactive({
  title: "",
  content: "",
});
</script>

<style scoped></style>
