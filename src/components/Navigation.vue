<template>
  <v-navigation-drawer color="primary" v-model="open" expand-on-hover app>
    <v-list>
      <v-list-item link>
        <v-list-item-content>
          <v-list-item-title class="title white--text">
            Chase Carter
          </v-list-item-title>
          <v-list-item-subtitle class="white--text"
            >ccarter98@gmail.com</v-list-item-subtitle
          >
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list nav dense>
      <v-list-item link v-for="item in items" :key="item.link" :to="item.link">
        <v-list-item-icon>
          <v-icon class="white--text">{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-title class="white--text">{{
          item.title
        }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
export default {
  props: {
    open: Boolean
  },
  watch: {
    open: function(value) {
      this.$emit("transitioned", value);
    }
  },
  data: () => ({
    items: [
      {
        icon: "mdi-view-dashboard",
        title: "Dashboard",
        link: "/"
      },
      {
        icon: "mdi-cloud",
        title: "Services",
        link: "/services"
      },
      {
        icon: "mdi-account-group",
        title: "Consumers",
        link: "/consumers"
      },
      {
        icon: "mdi-arrow-decision",
        title: "Routes",
        link: "/routes"
      },
      {
        icon: "mdi-power-plug",
        title: "Plugins",
        link: "/plugins"
      },
      {
        icon: "mdi-arrow-up",
        title: "Upstreams",
        link: "/upstreams"
      },
      {
        icon: "mdi-certificate",
        title: "Certificates",
        link: "/certificates"
      }
    ]
  })
};
</script>
