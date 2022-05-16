<template>
  <div class="stats">
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>Stat</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Number of notes</td>
          <td>{{ storeNotes.totalNotesCount }}</td>
        </tr>
        <tr>
          <td>Number of characters</td>
          <td>{{ storeNotes.totalCharactersCount }}</td>
        </tr>
      </tbody>
    </table>
    <input
      v-model="loveRominNotes.content"
      class="input"
      type="text"
      placeholder="Do you like Romin Notes?"
      maxlength="100"
      v-autofocus
    />
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
