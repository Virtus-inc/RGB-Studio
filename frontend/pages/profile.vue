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
          v-model="email.value.value"
          :error-messages="email.errorMessage.value"
          label="Пошта"
        />

        <v-text-field
          v-model="name.value.value"
          :counter="10"
          :error-messages="name.errorMessage.value"
          label="Ім'я"
        />

        <v-text-field
          v-model="surname.value.value"
          :counter="10"
          :error-messages="name.errorMessage.value"
          label="Прізвище"
        />

        <v-text-field
          v-model="password.value.value"
          type="password"
          :error-messages="name.errorMessage.value"
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
    import { ref } from 'vue'
    import { useField, useForm } from 'vee-validate'
    import { Cropper } from 'vue-advanced-cropper';
    import 'vue-advanced-cropper/dist/style.css';

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
  
          return 'Ім\'я має містити принаймні 2 символи.'
        },
        password (value) {
          if (value?.length >= 6) return true
  
          return 'Пароль має містити принаймні 6 символів.'
        },
      },
    })
    const name = useField('name')
    const surname = useField('surname')
    const email = useField('email')
    const password = useField('password')
  
    const items = ref([
      'Item 1',
      'Item 2',
      'Item 3',
      'Item 4',
    ])
  
    const submit = handleSubmit(values => {
      alert(JSON.stringify(values, null, 2))
    })
  </script>