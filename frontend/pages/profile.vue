<template>
  <v-card
    class="mx-auto pa-12 pb-8 mt-10"
    elevation="8"
    max-width="800"
    width="800"
    rounded="lg"
  >
    <!-- <cropper
      :src="img"
      @change="change"
    /> -->
    <form @submit.prevent="submit">
      <v-text-field
        v-model="state.email"
        label="Пошта"
      />

      <v-text-field
        v-model="state.name"
        label="Ім'я"
      />

      <v-text-field
        v-model="state.surname"
        label="Прізвище"
      />

      <v-text-field
        v-model="state.password"
        type="password"
        label="Пароль"
      />

      <v-btn
        class="me-4"
        type="submit"
        @click="updateUser()"
      >
        submit
      </v-btn>

      <v-btn @click="handleReset">
        clear
      </v-btn>
    </form>
  </v-card>
</template>

<script setup>
import { ref, reactive } from 'vue'
// import { Cropper } from 'vue-advanced-cropper';
// import 'vue-advanced-cropper/dist/style.css';
import { useUserData } from '~/composables/useUserData';

// const img = 'https://images.pexels.com/photos/4323307/pexels-photo-4323307.jpeg';

// const change = ({ coordinates, canvas }) => {
//   console.log(coordinates, canvas);
// }

const form = {
  email: '',
  name: '',
  surname: '',
  password: ''
};

const state = reactive({
  ...form
}) 

const submit = (values) => {
  alert(JSON.stringify(values, null, 2))
}

const { data } = useUserData();

const getUser = async () => {
  try {
    const response = await $fetch(`http://localhost:5000/users/${data.value.user._id}`, {
      method: "GET",
      credentials: "include"
    });

    if (response && response.user) {
      state.email = response.user.email;
      state.name = response.user.name;
      state.surname = response.user.surname;
    }
  } catch (error) {
    console.error('Error during login', error);
  }
};

const updateUser = async () => {
  try {
    const response = await fetch(`http://localhost:5000/users/${data.value.user._id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(serialize),
      credentials: "include"
    });

    if (!response.ok) {
      throw new Error(`Ошибка: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error updating user:', error);
  }
};

onMounted(() => {
  getUser();
});
</script>
