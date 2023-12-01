<template>
  <div class="modal is-active p-2">
    <div class="modal-background"></div>
    <div class="modal-card" ref="modalCardRef">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ $t("modals.del_note_title") }}</p>
        <button class="delete" aria-label="close" @click="closeModal"></button>
      </header>
      <section class="modal-card-body">
        {{ $t("modals.del_note_text") }}
      </section>
      <footer class="modal-card-foot is-justify-content-flex-end">
        <button class="button is-primary" @click="deleteNote">
          {{ $t("buttons.delete") }}
        </button>
        <button class="button is-danger" @click="closeModal">
          {{ $t("buttons.cancel") }}
        </button>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useStoreNotes } from "@/stores/storeNotes";
  import { onClickOutside } from "@vueuse/core";
  import { onMounted, onUnmounted, ref } from "vue";
  const storeNotes = useStoreNotes();

  const modalCardRef = ref(null);

  const props = defineProps<{
    modelValue: boolean;
    noteId: string;
  }>();

  const emit = defineEmits(["update:modelValue"]);

  const closeModal = () => {
    emit("update:modelValue", false);
  };

  const handleCloseWithEsc = (e: KeyboardEvent) => {
    if (e.key === "Escape") return closeModal();
  };

  onMounted(() => {
    document.addEventListener("keyup", handleCloseWithEsc);
  });

  onUnmounted(() => {
    document.removeEventListener("keyup", handleCloseWithEsc);
  });

  onClickOutside(modalCardRef, closeModal);

  const deleteNote = () => {
    storeNotes.deleteNote(props.noteId);
  };
</script>
