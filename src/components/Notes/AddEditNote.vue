<template>
  <div>
    <div class="p-3 mb-5 card" :class="`has-background-${props.bgColor}`">
      <div class="field">
        <label class="label has-text-black">Title</label>
        <div class="control">
          <input
            class="input"
            type="text"
            placeholder="Note title"
            ref="textAreaRef"
            v-model="modelValue.title"
            @input="$emit('update:modelValue', modelValue)"
            v-autofocus
            maxlength="50"
          />
        </div>
      </div>
      <div class="field">
        <label class="label has-text-black">Note</label>
        <div class="control">
          <textarea
            class="textarea"
            :placeholder="placeholderContent"
            v-model="modelValue.content"
            @input="$emit('update:modelValue', modelValue)"
            maxlength="150"
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
import { vAutofocus } from "@/directives/vAutofocus";

const textAreaRef = ref();

const props = defineProps<{
  modelValue: newNoteValue;
  bgColor: string;
  placeholderContent: string;
}>();

defineEmits(["update:modelValue"]);

const focusTextArea = () => {
  textAreaRef.value.focus();
};

defineExpose({
  focusTextArea,
});
</script>
