<template>
  <div>
    <v-card
      class="mx-auto pa-12 pb-8 mt-10"
      elevation="8"
      max-width="448"
      rounded="lg"
    >
      <form @submit.prevent="sendForm">
        <div class="text-subtitle-1 text-medium-emphasis">Аккаунт</div>

        <v-text-field
          v-model="form.email"
          density="compact"
          placeholder="Пошта"
          prepend-inner-icon="mdi-email-outline"
          variant="outlined"
        />

        <v-text-field
          v-model="form.name"
          density="compact"
          placeholder="Ім'я"
          prepend-inner-icon="mdi-information-slab-circle-outline"
          variant="outlined"
        />

        <v-text-field
          v-model="form.surname"
          density="compact"
          placeholder="Прізвище"
          prepend-inner-icon="mdi-information-slab-circle-outline"
          variant="outlined"
        />

        <div
          class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"
        >
          Пароль
        </div>

        <v-text-field
          v-model="form.password"
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          density="compact"
          placeholder="Введіть пароль"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          @click:append-inner="visible = !visible"
        />

        <v-btn
          class="mb-8 mt-5"
          color="blue"
          size="large"
          variant="tonal"
          block
          type="submit"
        >
          Зареєструватись
        </v-btn>
      </form>

      <v-card-text class="text-center">
        Вже є аккаунт ?
        <NuxtLink
          to="/auth/login"
          class="text-blue text-decoration-none"
          href="#"
          rel="noopener noreferrer"
        >
          Вхід <v-icon icon="mdi-chevron-right" />
        </NuxtLink>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "nuxt/app";
import { useUserData } from "~/composables/useUserData";

const visible = ref(false);
const { setUserData } = useUserData();
const router = useRouter();

const form = ref({
  email: "",
  name: "",
  surname: "",
  password: "",
});

const sendForm = async () => {
  try {
    const response = await $fetch("https://localhost:5000/auth/register", {
      method: "POST",
      body: JSON.stringify(form.value),
      credentials: "include",
    });

    if (response) {
      setUserData(response);
      router.push("/profile");
    }
  } catch (error) {
    console.error("Error during registration", error);
  }
};
</script>
