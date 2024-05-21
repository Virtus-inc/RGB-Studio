<template>
    <v-card
      color="black"
      rounded="0"
      elevation="5"
      flat
    >
      <v-toolbar density="comfortable">
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
  
        <v-toolbar-title>
            <h4>
                <strong class="red">R</strong>
                <strong class="green">G</strong>
                <strong class="blue">B</strong>-Studio
            </h4>
        </v-toolbar-title>
  
        <v-spacer></v-spacer>
  
        <v-btn prepend-icon="mdi-file-multiple" variant="text">
          Мої файли
        </v-btn>
  
        <v-btn prepend-icon="mdi-account" variant="text">
          Профіль
        </v-btn>
        <NuxtLink
            to="/auth/login"
            class="text-black text-decoration-none"
            rel="noopener noreferrer"
        >
            <v-btn prepend-icon="mdi-check" variant="text">
                Вхід
            </v-btn>
        </NuxtLink>
        <NuxtLink
            to="/auth/registration"
            class="text-black text-decoration-none"
            rel="noopener noreferrer"
        >
            <v-btn prepend-icon="mdi-plus" variant="text">
                Реєстрація
            </v-btn>
        </NuxtLink>
      </v-toolbar>
    </v-card>
</template>

<style scoped>
.red {
    color: red;
}
.green {
    color: green;
}
.blue {
    color: blue;
}
</style>