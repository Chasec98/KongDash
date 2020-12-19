<template>
  <v-app>
    <v-app-bar dense app v-if="$vuetify.breakpoint.mdAndDown">
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
    </v-app-bar>
    <Navigation />
    <v-main>
      <router-view></router-view>
    </v-main>
    <v-snackbar v-model="snackbar">testing snackbar
      <template v-slot:action="{ attrs }">
        <v-btn
          color="primary"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script>
import Navigation from "./components/Navigation";

export default {
  name: "App",
  data: () => ({
    snackbar: true,
  }),
  components: {
    Navigation,
  }
};
</script>
