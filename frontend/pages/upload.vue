<template>
  <v-container>
    <v-col class="d-flex flex-column justify-center align-center">
      <v-card width="800" elevation="0">
        <file-pond
          ref="pond"
          name="file"
          label-idle="Перетягніть файли сюди або <span class='filepond--label-action'>Виберіть їх</span>"
          accepted-file-types="application/pdf"
          @addfile="handleAddFile"
          class="mt-10"
        />
      </v-card>
      <v-card v-for="item of files" :key="item" width="800" elevation="1" class="mt-5">
        <v-col class="d-flex pb-0">
          <v-col class="d-flex flex-column pa-0">
            <v-card-title>
              {{ item.name }}
            </v-card-title>

            <v-card-subtitle>
              К-ть сторінок: {{ item.pages }} <br/>
              Розмір: {{ item.size }} <br/>
              Формат: {{ item.contentType }} <br/>
            </v-card-subtitle>
          </v-col>
          
          <v-card-actions>
            <v-btn
              :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
              @click="show = !show"
            />
          </v-card-actions>
        </v-col>
        <v-col>
          <v-expand-transition>
            <div v-show="show">
              <v-divider></v-divider>

              <v-card-title>
                Завантаживший файл
              </v-card-title>
              <v-card-subtitle>
                Пошта: {{ state.email.value }} <br />
                Ім'я: {{ state.name.value }} <br />
                Фамілія: {{ state.surname.value }} <br />
              </v-card-subtitle>
            </div>
          </v-expand-transition>
        </v-col>
      </v-card>
    </v-col>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import vueFilePond from 'vue-filepond';
import 'filepond/dist/filepond.min.css';
import { useRouter } from 'vue-router';

const FilePond = vueFilePond();
const pond = ref(null);
const show = ref(false);
const router = useRouter();

const initialState = {
  name: { value: '', errorMessage: '' },
  email: { value: '', errorMessage: '' },
  surname: { value: '', errorMessage: '' },
  password: { value: '', errorMessage: '' },
}

const files = ref([]);

const handleAddFile = async (error: any, file: any) => {
  if (error) {
    console.error('Error adding file:', error);
    return;
  }

  const formData = new FormData();
  formData.append('file', file.file, file.file.name.toString());

  try {
    const response = await $fetch('http://localhost:5000/files', {
      method: "POST",
      body: formData,
      credentials: "include"
    });

    if (response) {
      getFiles();
    }
  } catch (error) {
    console.error('Error uploading file', error);
  }
};

const state = reactive({
  ...initialState,
})

const getFiles = async () => {
  try {
    const response = await $fetch('http://localhost:5000/files', {
      method: "GET",
      credentials: "include"
    });

    if (response && response.user) {
      state.email.value = response.user.email;
      state.name.value = response.user.name;
      state.surname.value = response.user.surname;

      files.value = response.files; // Обновляем весь массив файлов
    }
  } catch (error) {
    console.error('Error during login', error);
  }
};

onMounted(() => {
  getFiles();
});
</script>