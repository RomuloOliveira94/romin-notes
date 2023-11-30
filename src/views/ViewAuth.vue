<template>
  <progress
    v-if="storeAuth.loading"
    class="progress is-warning h-"
    max="100"
  ></progress>
  <div v-if="!storeAuth.loading" class="Auth">
    <div class="tabs is-centered">
      <ul>
        <li :class="{ 'is-active': !register }">
          <a @click.prevent="register = false">{{ $t("auth.login") }}</a>
        </li>
        <li :class="{ 'is-active': register }">
          <a @click.prevent="register = true">{{ $t("auth.register") }}</a>
        </li>
      </ul>
    </div>
    <div class="auth-form card">
      <div class="card-content">
        <div class="title has-text-centered">
          {{ formTitle }}
        </div>
        <form @submit.prevent="onSubmit">
          <div class="field">
            <label class="label">{{ $t("auth.email") }}</label>
            <div class="control">
              <input
                class="input"
                type="email"
                :placeholder="$t('auth.email_placeholder')"
                v-model="credentials.email"
              />
            </div>
          </div>
          <div class="field">
            <label class="label">{{ $t("auth.password") }}</label>
            <div class="control">
              <input
                class="input"
                type="password"
                :placeholder="$t('auth.password_placeholder')"
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
  import { useI18n } from "vue-i18n";
  const { t } = useI18n();

  const storeAuth = useStoreAuth();

  const register = ref(false);

  const formTitle = computed(() => {
    return register.value ? t("auth.register") : t("auth.login");
  });

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
