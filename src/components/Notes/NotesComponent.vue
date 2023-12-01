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
            <small class="column">{{ $d(date, "longFormat") }}</small>
            <small class="column has-text-right">{{ characterLength }}</small>
          </div>
        </div>
      </div>
      <footer class="card-footer">
        <RouterLink class="card-footer-item" :to="`/editNote/${note.id}`">{{
          $t("buttons.edit")
        }}</RouterLink>
        <a class="card-footer-item" @click.prevent="modals.deleteNote = true">{{
          $t("buttons.delete")
        }}</a>
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
  import { useI18n } from "vue-i18n";
  const { t } = useI18n();

  const props = defineProps<{
    note: Note;
  }>();

  const characterLength = computed(() => {
    const contentLength = props.note.content.length;
    const description =
      contentLength > 1 ? t("stats.characters") : t("stats.characters");
    return `${contentLength} ${description}`;
  });

  const modals = reactive({
    deleteNote: false,
  });

  const date = computed(() => {
    return Number(props.note?.date);
    // return useDateFormat(date, "DD-MM-YYYY HH:mm:ss");
  });
</script>
