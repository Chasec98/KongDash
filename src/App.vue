<template>
  <v-app>
    <v-app-bar dense app v-if="$vuetify.breakpoint.mdAndDown">
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
    </v-app-bar>
    <Navigation />
    <v-main>
      <router-view></router-view>
    </v-main>
    <v-snackbar multi-line v-model="snackbarOpen">{{message}}
      <template v-slot:action="{ attrs }">
        <v-btn
          color="primary"
          text
          v-bind="attrs"
          @click="close"
        >
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
    Navigation,
  },
  methods: {
    ...mapActions('snackbar', [
      'close'
    ])
  },
  computed: mapState({
    message: state => state.snackbar.message,
    snackbarOpen: state => state.snackbar.open
  }),
};
</script>
