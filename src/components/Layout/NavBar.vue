<template>
  <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
    <div class="container is-max-desktop px-2">
      <div class="navbar-brand">
        <div class="navbar-item is-size-4">Romin Notes</div>
        <a
          role="button"
          class="navbar-burger"
          :class="{ 'is-active': showMobileNav }"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
          @click.prevent="showMobileNav = !showMobileNav"
          ref="burgerMenuRef"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div
        id="navbarBasicExample"
        class="navbar-menu"
        :class="{ 'is-active': showMobileNav }"
        ref="navBarRef"
      >
        <div class="navbar-start">
          <RouterLink
            @click="showMobileNav = false"
            class="navbar-item"
            to="/"
            active-class="is active"
          >
            Notes
          </RouterLink>
          <RouterLink
            @click="showMobileNav = false"
            class="navbar-item"
            to="/stats"
            active-class="is active"
          >
            Stats
          </RouterLink>
        </div>
        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <a class="button is-link">
                <strong>Sign up</strong>
              </a>
              <a class="button is-light"> Log in </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { onClickOutside } from "@vueuse/core";

const showMobileNav = ref(false);

const navBarRef = ref(null);
const burgerMenuRef = ref(null);
onClickOutside(navBarRef, () => (showMobileNav.value = false), {
  ignore: [burgerMenuRef],
});
</script>

<style>
@media (max-width: 1023px) {
  .navbar-menu {
    position: absolute;
    left: 0;
    width: 100%;
  }
}
</style>