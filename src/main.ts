import { createApp, markRaw } from "vue";
import { createPinia } from "pinia";
import router from "@/routes/routes";

import App from "./App.vue";

const pinia = createPinia();

pinia.use(({ store }) => (store.router = markRaw(router)));

createApp(App).use(pinia).use(router).mount("#app");

//test git-hub actions
