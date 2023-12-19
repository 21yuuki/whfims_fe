<template>
  <v-app v-if="this.$route.path !== '/'">
    <navigation-component :drawer="drawer" />

    <v-app-bar app>
      <v-app-bar-nav-icon @click="handleDrawer"></v-app-bar-nav-icon>
    </v-app-bar>

    <v-main>
      <v-container fluid class="main-component">
        <router-view></router-view>
      </v-container>
    </v-main>

    <v-footer app>
      WHFIMS
    </v-footer>
  </v-app>

  <v-app  v-else>
    <v-main>
      <v-container fluid class="main-component">
        <router-view></router-view>
      </v-container>
    </v-main>

    <v-footer app>
      WHFIMS
    </v-footer>
  </v-app>
</template>

<script>
  import NavigationComponent from '@/components/NavigationComponent'
  import '@/assets/css/style.css'

  export default {
    name: 'App',
    components: {
      NavigationComponent
    },
    data() {
      return {
        drawer: true
      }
    },
    methods: {
      handleDrawer() {
        this.drawer = !this.drawer
      }
    }
  };
</script>
