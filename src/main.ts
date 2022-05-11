import { createApp } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";
import ViewNotes from "./views/ViewNotes.vue";
import ViewStats from "./views/ViewStats.vue";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      name: "notes",
      component: ViewNotes,
    },
    {
      path: "/stats",
      name: "stats",
      component: ViewStats,
    },
  ],
});

import App from "./App.vue";

createApp(App).use(router).mount("#app");
