<template>
  <div>
    <div class="p-3 mb-5 card" :class="`has-background-${props.bgColor}`">
      <div class="field">
        <label class="label has-text-white">Title</label>
        <div class="control">
          <input
            class="input"
            type="text"
            placeholder="Note title"
            ref="textAreaRef"
            v-model="modelValue.title"
            @input="$emit('update:modelValue', modelValue)"
          />
        </div>
      </div>
      <div class="field">
        <label class="label has-text-white">Note</label>
        <div class="control">
          <textarea
            class="textarea"
            placeholder="Add a new note"
            v-model="modelValue.content"
            @input="$emit('update:modelValue', modelValue)"
          ></textarea>
        </div>
      </div>

      <div class="field is-grouped is-grouped-right">
        <div class="control">
          <slot name="buttons" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { newNoteValue } from "@/types/NewNoteValue";
import { ref } from "vue";

const textAreaRef = ref();

const props = defineProps<{
  modelValue: newNoteValue;
  bgColor: string;
}>();

console.log(props.bgColor);
defineEmits(["update:modelValue"]);

const focusTextArea = () => {
  textAreaRef.value.focus();
};

defineExpose({
  focusTextArea,
});
</script>
