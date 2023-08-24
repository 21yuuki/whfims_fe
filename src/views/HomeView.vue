<template>
  <v-container fluid fill-height pa-0>
    <navigation-component @returnComponent="returnComponent" />

    <v-main style="height: 100%; background-color: #f5f5f5;">
      <component :is="getComponent" />
    </v-main>
  </v-container>
</template>

<script>
  import NavigationComponent from '@/components/NavigationComponent'
  import UserComponent from '@/components/UserComponent'
  import RoleComponent from '@/components/RoleComponent'
  import TableComponent from '@/components/TableComponent'

  export default {
    name: 'HomeComponent',
    components: {
      NavigationComponent,
      UserComponent,
      RoleComponent,
      TableComponent
    },
    data() {
      return {
        loadComponent: UserComponent
      }
    },
    mounted() {
      this.getComponent
    },
    methods: {
      returnComponent(component) {
        switch(component) {
          case 'Users':
            this.loadComponent = UserComponent
          break

          case 'Roles':
            this.loadComponent = RoleComponent
          break
          
          case 'Tables':
            this.loadComponent = TableComponent
          break
        }
      }
    },
    computed: {
      getComponent() {
        return this.loadComponent
      }
    }
  }
</script>