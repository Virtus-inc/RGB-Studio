<template>
  <v-card
    class="mx-auto pa-12 pb-8 mt-10"
    elevation="8"
    max-width="800"
    width="800"
    rounded="lg"
  >
    <cropper
      :src="img"
      @change="change"
    />
    <form @submit.prevent="submit">
      <v-text-field
        v-model="state.email.value"
        :error-messages="state.email.errorMessage"
        label="Пошта"
      />

      <v-text-field
        v-model="state.name.value"
        :counter="10"
        :error-messages="state.name.errorMessage"
        label="Ім'я"
      />

      <v-text-field
        v-model="state.surname.value"
        :counter="10"
        :error-messages="state.surname.errorMessage"
        label="Прізвище"
      />

      <v-text-field
        v-model="state.password.value"
        type="password"
        :error-messages="state.password.errorMessage"
        label="Пароль"
      />

      <v-btn
        class="me-4"
        type="submit"
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
import { useForm } from 'vee-validate'
import { Cropper } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';
import { useUserData } from '~/composables/useUserData';

const initialState = {
  name: { value: '', errorMessage: '' },
  email: { value: '', errorMessage: '' },
  surname: { value: '', errorMessage: '' },
  password: { value: '', errorMessage: '' },
}

const img = 'https://images.pexels.com/photos/4323307/pexels-photo-4323307.jpeg';

const change = ({ coordinates, canvas }) => {
  console.log(coordinates, canvas);
}

const { handleSubmit, handleReset } = useForm({
  validationSchema: {
    email (value) {
      if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true

      return 'Має бути дійсна електронна адреса.'
    },
    name (value) {
      if (value?.length >= 2) return true

      return 'Ім\'я має містити принаймні 2 символи.'
    },
    surname (value) {
      if (value?.length >= 2) return true

      return 'Прізвище має містити принаймні 2 символи.'
    },
    password (value) {
      if (value?.length >= 6) return true

      return 'Пароль має містити принаймні 6 символів.'
    },
  },
})

const state = reactive({
  ...initialState,
})

const items = ref([
  'Item 1',
  'Item 2',
  'Item 3',
  'Item 4',
])

const submit = handleSubmit(values => {
  alert(JSON.stringify(values, null, 2))
})

const { data } = useUserData();

const getUser = async () => {
  try {
    const response = await $fetch(`http://localhost:5000/users/${data.value.user._id}`, {
      method: "GET",
      credentials: "include"
    });

    if (response && response.user) {
      state.email.value = response.user.email;
      state.name.value = response.user.name;
      state.surname.value = response.user.surname;
    }
  } catch (error) {
    console.error('Error during login', error);
  }
};

onMounted(() => {
  getUser();
});
</script>
