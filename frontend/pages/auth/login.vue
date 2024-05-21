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
          v-model="form.name"
          density="compact"
          placeholder="Ім'я"
          prepend-inner-icon="mdi-information-slab-circle-outline"
          variant="outlined"
        />

        <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
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
          Вхід
        </v-btn>
      </form>

      <v-card-text class="text-center">
        Ще нема аккаунта ?
        <NuxtLink
          to="/auth/registration"
          class="text-blue text-decoration-none"
          rel="noopener noreferrer"
        >
          Зареєструватись <v-icon icon="mdi-chevron-right"></v-icon>
        </NuxtLink>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const form = ref({
  name: '',
  password: ''
});

const visible = ref(false);

const sendForm = async () => {
  try {
    const response = await $fetch('http://localhost:5000/auth/login', {
      method: "POST",
      body: JSON.stringify(form.value),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (response && typeof response === 'object') {
      console.log('Registration successful', response);
    } else {
      console.error('Unexpected response format', response);
    }
  } catch (error) {
    console.error('Error during registration', error);
  }
};
</script>

<style scoped>
.text-subtitle-1 {
  font-size: 1.25rem;
}
.text-medium-emphasis {
  color: rgba(0, 0, 0, 0.6);
}
.text-blue {
  color: blue;
}
</style>