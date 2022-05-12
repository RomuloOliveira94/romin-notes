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
          <div class="has-text-right has-text-grey-light">
            <small>{{ characterLength }}</small>
          </div>
        </div>
      </div>
      <footer class="card-footer">
        <a href="#" class="card-footer-item">Edit</a>
        <a class="card-footer-item" @click.prevent="handleDeleteClicked"
          >Delete</a
        >
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { Note } from "../../types/Note";
const emits = defineEmits(["deleteNote"]);
const props = defineProps<{
  note: Note;
}>();
const characterLength = computed(() => {
  const contentLength = props.note.content.length;
  const description = contentLength > 1 ? "characters" : "character";
  return `${contentLength} ${description}`;
});
const handleDeleteClicked = () => {
  emits("deleteNote", props.note.id);
};
</script>

<style scoped></style>
