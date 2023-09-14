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
  import DashboardComponent from '@/components/DashboardComponent'
  import UserComponent from '@/components/UserComponent'
  import RoleComponent from '@/components/RoleComponent'
  import TableComponent from '@/components/TableComponent'
  import CategoryComponent from '@/components/CategoryComponent'

  export default {
    name: 'HomeComponent',
    components: {
      NavigationComponent,
      DashboardComponent,
      UserComponent,
      RoleComponent,
      TableComponent,
      CategoryComponent
    },
    data() {
      return {
        loadComponent: DashboardComponent
      }
    },
    mounted() {
      this.getComponent
    },
    methods: {
      returnComponent(component) {
        switch(component) {
          case 'Dashboard':
            this.loadComponent = DashboardComponent
          break

          case 'Users':
            this.loadComponent = UserComponent
          break

          case 'Roles':
            this.loadComponent = RoleComponent
          break
          
          case 'Tables':
            this.loadComponent = TableComponent
          break

          case 'Categories':
            this.loadComponent = CategoryComponent
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