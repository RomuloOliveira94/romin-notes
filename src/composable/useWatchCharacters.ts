import type { newNoteValue } from "./../types/NewNoteValue";
import { watch } from "vue";

export function useWatchCharacters(
  valueToWatch: newNoteValue,
  maxLength = 100
) {
  watch(valueToWatch, (newValue) => {
    if (newValue.content.length === maxLength)
      return alert(`Only ${maxLength} character allowed`);
  });
}
