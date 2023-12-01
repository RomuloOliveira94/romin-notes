<template>
  <div class="notes">
    <AddEditNote
      v-model="newNoteValues"
      ref="addEditNoteRef"
      bg-color="warning"
      :placeholder-content="$t('forms.note_form_text_placeholder')"
      :placeholder-title="$t('forms.note_form_title_placeholder')"
      text-color="black"
    >
      <template #buttons>
        <button
          class="button is-link has-background-primary"
          @click="addNote"
          :disabled="!newNoteValues.title || !newNoteValues.content"
        >
          {{ $t("view_notes.add_note") }}
        </button>
      </template>
    </AddEditNote>

    <progress
      v-if="!storeNotes.loadingNotes"
      class="progress is-warning is-large"
      max="100"
    ></progress>

    <template v-else>
      <NotesComponent
        v-for="note in storeNotes.notes"
        :key="note.id"
        :note="note"
      />

      <div
        v-if="!storeNotes.notes.length"
        class="is-size-4 has-text-centered has-text-grey-light is-family-monospace py-6"
      >
        {{ $t("view_notes.no_notes") }}
      </div>
    </template>
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

  useWatchCharacters(newNoteValues, 200);
</script>
