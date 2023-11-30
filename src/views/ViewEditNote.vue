<template>
  <div class="edit-note">
    <AddEditNote
      v-model="noteContent"
      ref="addEditNoteRef"
      bg-color="primary"
      placeholder-content="Edit the note"
      text-color="white"
    >
      <template #buttons>
        <button class="button is-link is-light mr-2" @click="$router.back()">
          Cancel
        </button>
        <button
          class="button is-link has-background-warning has-text-black"
          :disabled="!noteContent.title || !noteContent.content"
          @click="handleSaveEdit"
        >
          Save Note
        </button>
      </template>
    </AddEditNote>
  </div>
</template>

<script setup lang="ts">
  import { reactive, onMounted, ref } from "vue";
  import AddEditNote from "../components/Notes/AddEditNote.vue";
  import { useStoreNotes } from "@/stores/storeNotes";
  import { useRoute, useRouter } from "vue-router";

  const route = useRoute();
  const router = useRouter();

  const storeNotes = useStoreNotes();

  const noteContent = reactive({
    title: "",
    content: "",
  });
  const noteId = route.params.id;

  onMounted(() => {
    noteContent.content = storeNotes.getNoteContent(noteId);
    noteContent.title = storeNotes.getNoteTitle(noteId);
  });

  const handleSaveEdit = () => {
    storeNotes.updateNote(noteId, noteContent);
    router.push("/");
  };
</script>
