<template>
  <div class="stats">
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>{{ $t("stats.head_title_stats") }}</th>
          <th>{{ $t("stats.head_title_value") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{ $t("stats.n_notes") }}</td>
          <td>{{ storeNotes.totalNotesCount }}</td>
        </tr>
        <tr>
          <td>{{ $t("stats.n_characters") }}</td>
          <td>{{ storeNotes.totalCharactersCount }}</td>
        </tr>
      </tbody>
    </table>
    <!-- <input
      v-model="loveRominNotes.content"
      class="input"
      type="text"
      placeholder="Do you like Romin Notes?"
      maxlength="100"
      v-autofocus
    /> -->
  </div>
</template>

<script setup lang="ts">
import { useStoreNotes } from "@/stores/storeNotes";
import { vAutofocus } from "@/directives/vAutofocus";
import { useWatchCharacters } from "@/composable/useWatchCharacters";
import { reactive } from "vue";

const loveRominNotes = reactive({
  title: "",
  content: "",
});
const storeNotes = useStoreNotes();

useWatchCharacters(loveRominNotes);
</script>
