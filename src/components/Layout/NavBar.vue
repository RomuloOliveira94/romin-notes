<template>
  <nav class="navbar is-primary py-2" role="navigation" aria-label="main navigation">
    <div class="container is-max-desktop px-2">
      <div class="navbar-brand">
        <RouterLink @click="showMobileNav = false" to="/">
          <img
            src="../../../public/rnotes-nobg.png"
            class="image"
            width="150"
          />
        </RouterLink>
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
          <!-- <RouterLink
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
          </RouterLink> -->
          <div class="navbar-item">
            <button
              class="button is-small is-warning"
              @click.prevent="logout"
              v-if="storeAuth.user?.id"
            >
              Log out {{ storeAuth.user?.email }}
            </button>
          </div>
        </div>
        <div class="navbar-end">
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
          <!-- <div class="buttons">
             <RouterLink
                @click="showMobileNav = false"
                class="navbar-item button is-warning"
                to="/auth"
                active-class="is active"
                v-if="!storeAuth.user?.id"
              >
                <strong>Sign up</strong>
              </RouterLink>
              <RouterLink
                @click="showMobileNav = false"
                class="navbar-item button is-warning"
                to="/auth"
                active-class="is active"
                v-if="!storeAuth.user?.id"
              >
                <strong>Login</strong>
              </RouterLink>
            </div> -->
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
  import { ref } from "vue";
  import { onClickOutside } from "@vueuse/core";
  import { useStoreAuth } from "@/stores/storeAuth";

  const storeAuth = useStoreAuth();

  const showMobileNav = ref(false);

  const navBarRef = ref(null);
  const burgerMenuRef = ref(null);
  onClickOutside(navBarRef, () => (showMobileNav.value = false), {
    ignore: [burgerMenuRef],
  });

  const logout = () => {
    storeAuth.logoutUser();
    showMobileNav.value = false;
  };
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
