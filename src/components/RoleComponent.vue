<template>
    <v-container fluid>
        <v-breadcrumbs large>
            <v-breadcrumbs-item disabled>
                Roles
            </v-breadcrumbs-item>
        </v-breadcrumbs>

        <v-card style="margin-left: 24px">
            <crud-table-component :tableData="tableData" @editItem="editRole" @deleteItem="deleteRole" />
        </v-card>
    </v-container>
</template>

<script>
    import CrudTableComponent from '@/components/Tables/CrudTableComponent'
    
    export default {
        name: 'RoleComponent',
        components: {
            CrudTableComponent
        },
        data() {
            return {
                tableData: {
                    headers: [
                        { text: 'Role', value: 'name' },
                        { text: 'Actions', value: 'actions', sortable: false }
                    ],
                    items: [],
                    title: 'Roles',
                    btnName: 'Create Role'
                }
            }
        },
        mounted() {
            this.fetchAllRoles()
        },
        methods: {
            async fetchAllRoles() {
                try {
                    const request = await this.$axios.get('api/roles/')
                    
                    this.tableData.items = request.data
                } catch (err) {
                    console.log(err)
                }
            },
            async editRole(id) {
                alert('edit role with id ' + id)
            },
            async deleteRole(id) {
                try {
                    await this.$axios.delete(`api/roles/${id}`)

                    await this.fetchAllRoles()
                } catch (err) {
                    console.log(err)
                }
            }
        }
    }
</script>