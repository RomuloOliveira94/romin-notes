<template>
  <div class="Auth">
    <div class="tabs is-centered">
      <ul>
        <li :class="{ 'is-active': !register }">
          <a @click.prevent="register = false">Login</a>
        </li>
        <li :class="{ 'is-active': register }">
          <a @click.prevent="register = true">Register</a>
        </li>
      </ul>
    </div>
    <div class="auth-form card">
      <div class="card-content">
        <div class="title has-text-centered">{{ formTitle }}</div>
        <form @submit.prevent="onSubmit">
          <div class="field">
            <label class="label">Email</label>
            <div class="control">
              <input
                class="input"
                type="email"
                placeholder="Enter your email"
                v-model="credentials.email"
              />
            </div>
          </div>
          <div class="field">
            <label class="label">Password</label>
            <div class="control">
              <input
                class="input"
                type="password"
                placeholder="Enter your password"
                v-model="credentials.password"
              />
            </div>
          </div>
          <div class="field is-grouped is-grouped-right">
            <p class="control">
              <button class="button is-primary">{{ formTitle }}</button>
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, reactive } from "vue";
  import { useStoreAuth } from "@/stores/storeAuth";

  const storeAuth = useStoreAuth();

  const register = ref(false);

  const formTitle = computed(() => (register.value ? "Register" : "Login"));

  const credentials = reactive({
    email: "",
    password: "",
  });

  const onSubmit = () => {
    if (!credentials.email || !credentials.password) {
      alert("Please enter email and password");
      return;
    } else if (credentials.password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    } else if (register.value) {
      storeAuth.registerUser(credentials);
    } else {
      storeAuth.loginUser(credentials);
      credentials.email = "";
      credentials.password = "";
      
    }
    console.log("submit");
  };
</script>

<style>
  .auth-form {
    max-width: 400px;
    margin: 0 auto;
  }
</style>
