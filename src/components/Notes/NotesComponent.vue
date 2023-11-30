<template>
  <div>
    <div class="card mb-4">
      <header class="card-header">
        <p class="card-header-title">{{ note.title }}</p>
        <button class="card-header-icon" aria-label="more options">
          <span class="icon">
            <i class="fas fa-angle-down" aria-hidden="true"></i>
          </span>
        </button>
      </header>
      <div class="card-content">
        <div class="content">
          {{ note.content }}
          <div class="columns is-mobile has-text-grey-light mt-2">
            <small class="column">{{ dateFormated.value }}</small>
            <small class="column has-text-right">{{ characterLength }}</small>
          </div>
        </div>
      </div>
      <footer class="card-footer">
        <RouterLink class="card-footer-item" :to="`/editNote/${note.id}`"
          >Edit</RouterLink
        >
        <a class="card-footer-item" @click.prevent="modals.deleteNote = true"
          >Delete</a
        >
      </footer>
      <NotesDeleteModalVue
        v-if="modals.deleteNote"
        v-model="modals.deleteNote"
        :noteId="note.id"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive } from "vue";
import type { Note } from "../../types/Note";
import NotesDeleteModalVue from "./NotesDeleteModal.vue";
import { useDateFormat } from "@vueuse/core";
import { parse } from "path";

const props = defineProps<{
  note: Note;
}>();

const characterLength = computed(() => {
  const contentLength = props.note.content.length;
  const description = contentLength > 1 ? "characters" : "character";
  return `${contentLength} ${description}`;
});

const modals = reactive({
  deleteNote: false,
});

const dateFormated = computed(() => {
  const date = new Date(parseInt(props.note.date));
  return useDateFormat(date, "DD-MM-YYYY HH:mm:ss");
});
</script>
