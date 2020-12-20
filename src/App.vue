<template>
  <v-app>
    <v-app-bar dense flat app v-if="$vuetify.breakpoint.mdAndDown">
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
    </v-app-bar>
    <Navigation />
    <v-main>
      <router-view></router-view>
    </v-main>
    <v-snackbar multi-line v-model="snackbarOpen"
      >{{ snackbar.message }}
      <template v-slot:action="{ attrs }">
        <v-btn color="primary" text v-bind="attrs" @click="close">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script>
import Navigation from "./components/Navigation";
import { mapState, mapActions } from "vuex";

export default {
  name: "App",
  data: () => ({
    //
  }),
  components: {
    Navigation
  },
  methods: {
    ...mapActions("snackbar", ["close"])
  },
  computed: { 
    ...mapState({
      snackbar: state => state.snackbar,
    }),
    snackbarOpen: {
      get() { return this.snackbar.open },
      set(value) {
        if (!value) {
          this.close()
        }
      }
    }
  }
};
</script>
