<template>
  <v-app>
    <navigation-component />

    <v-app-bar app>
      <!-- -->
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
</template>

<script>
  import NavigationComponent from '@/components/NavigationComponent'
  import '@/assets/css/style.css'

  export default {
    name: 'App',
    components: {
      NavigationComponent
    },
    data: () => ({
    }),
  };
</script>
