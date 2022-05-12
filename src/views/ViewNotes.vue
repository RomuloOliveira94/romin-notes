<template>
  <div class="notes">
    <div class="has-background-dark p-3 mb-5">
      <div class="field">
        <label class="label">Note</label>
        <div class="control">
          <textarea class="textarea" placeholder="Add a new note"></textarea>
        </div>
      </div>

      <div class="field is-grouped is-grouped-right">
        <div class="control">
          <button class="button is-link has-background-secondary">
            Add New Note
          </button>
        </div>
      </div>
    </div>

    <div class="card mb-4" v-for="note in notes" :key="note.id">
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
        </div>
      </div>
      <footer class="card-footer">
        <a href="#" class="card-footer-item">Edit</a>
        <a href="#" class="card-footer-item">Delete</a>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const notes = ref([
  {
    id: 1,
    title: "My first note",
    content:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eius eni, asdushaduhas, daidasda amet consectetur adipisicing elit amet consectetur adipisicing elit amet consectetur adipisicing elit",
  },
  {
    id: 2,
    title: "My second note",
    content:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eius eni, asdushaduhas, daidasda amet consectetur adipisicing elit amet consectetur adipisicing elit amet consectetur adipisicing elit",
  },
]);
</script>
