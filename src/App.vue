<template>
  <v-app>
    <v-app-bar color="primary" dense flat dark app v-if="$vuetify.breakpoint.mdAndDown">
      <v-app-bar-nav-icon @click="toggleTopBar"></v-app-bar-nav-icon>
    </v-app-bar>
    <Navigation @transitioned="toggleNav" :open="leftBarOpen" />
    <v-main>
      <router-view></router-view>
    </v-main>
    <v-snackbar multi-line v-model="snackbarOpen"
      >{{ snackbar.message }}
      <template v-slot:action="{ attrs }">
        <v-btn color="secondary" text v-bind="attrs" @click="close">
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
    leftBarOpen: undefined,
  }),
  created() {
    if (this.$vuetify.breakpoint.mdAndDown) {
      this.leftBarOpen = false;
    } else {
      this.leftBarOpen = true;
    }
  },
  components: {
    Navigation
  },
  methods: {
    ...mapActions("snackbar", ["close"]),
    toggleTopBar() {
      this.leftBarOpen = !this.leftBarOpen;
    },
    toggleNav(value) {
      this.leftBarOpen = value;
    }
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
