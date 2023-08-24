<template>
    <v-container fluid>
        <v-breadcrumbs large>
            <v-breadcrumbs-item disabled>
                Users
            </v-breadcrumbs-item>
        </v-breadcrumbs>

        <v-card style="margin-left: 24px">
            <crud-table-component :tableData="tableData" @editItem="editUser" @deleteItem="deleteUser" />
        </v-card>
    </v-container>
</template>

<script>
    import CrudTableComponent from '@/components/Tables/CrudTableComponent'

    export default {
        name: 'UserComponent',
        components: {
            CrudTableComponent
        },
        data() {
            return {
                tableData: {
                    headers: [
                        { text: 'Name', value: 'name' },
                        { text: 'Email', value: 'email' },
                        { text: 'Role', value: 'role' },
                        { text: 'Actions', value: 'actions', sortable: false }
                    ],
                    items: [],
                    title: 'Users',
                    btnName: 'Create User'
                }
            }
        },
        mounted() {
            this.fetchAllUsers()
        },
        methods: {
            async fetchAllUsers() {
                try {
                    const request = await this.$axios.get('/api/users/')

                    request.data.forEach(element => {
                        if(element.id !== this.returnCurrentUserID) {
                            element.role_details = element.role
                            element.role = element.role.name
                            this.tableData.items.push({
                                ...element
                            })
                        }
                    });
                } catch (err) {
                    console.log(err)
                }
            },
            async editUser(id) {
                alert('edit user with id ' + id)
            },
            async deleteUser(id) {
                try {
                    await this.$axios.delete(`api/users/${id}`)
                    
                    this.tableData.items = []

                    await this.fetchAllUsers()
                } catch (err) {
                    console.log(err)
                }
            }
        },
        computed: {
            returnCurrentUserID() {
                return this.$store.getters.getUserDetails.id
            }
        }
    }
</script>