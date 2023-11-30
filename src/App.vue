<template>
  <NavBarVue />
  <div class="container is-max-desktop px-2 py-4">
    <RouterView />
  </div>
</template>

<script setup lang="ts">
  import NavBarVue from "./components/Layout/NavBar.vue";
  import { useStoreAuth } from "@/stores/storeAuth";
  import { onMounted } from "vue";

  const storeAuth = useStoreAuth();

  onMounted(() => {
    storeAuth.init();
  });
  
</script>
<style lang="scss">
  @import "./assets/sass/customstyles.scss";
</style>
