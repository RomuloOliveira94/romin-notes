import { defineStore } from "pinia";

export const useStoreNotes = defineStore("notes", {
  state: () => {
    return {
      notes: [
        {
          id: "1",
          title: "My first note",
          content:
            "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eius eni, asdushaduhas, daidasda amet consectetur adipisicing elit amet consectetur adipisicing elit amet consectetur adipisicing elit",
        },
        {
          id: "2",
          title: "My second note",
          content:
            "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eius eni, asdushaduhas, daidasda amet consectetur adipisicing elit amet consectetur adipisicing elit amet consectetur adipisicing elit",
        },
      ],
    };
  },
});
