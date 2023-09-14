<template>
    <v-container fluid>
        <crud-table-component :tableData="tableData" @createItem="showFormCreateUser" @editItem="showFormEditUser" @deleteItem="deleteUser" class="mx-5 my-5" />
        
        <create-or-edit-modal-component :formDetails="formDetails" @createOrUpdateItem="createOrUpdateUser">
            <template v-slot:form>
                <v-text-field
                    v-model="formData.name"
                    label="Full Name"
                    :rules="[rules.required]"
                    oultined
                />

                <v-text-field
                    v-model="formData.email"
                    type="email"
                    label="Email Address"
                    :rules="[rules.required, rules.email]"
                    oultined
                />

                <v-text-field
                    v-if="formDetails.action === 'Create'"
                    v-model="formData.password"
                    type="password"
                    label="Password"
                    :rules="[rules.required]"
                    oultined
                />

                <v-select 
                    v-model="formData.role_id"
                    label="Role"
                    :rules="[rules.required]"
                    :items="roles"
                    item-text="name"
                    item-value="id"
                />
            </template>
        </create-or-edit-modal-component>
    </v-container>
</template>

<script>
    import mixins from '@/mixins/global'
    import CrudTableComponent from '@/components/Tables/CrudTableComponent'
    import CreateOrEditModalComponent from '@/components/Modals/CreateOrEditModalComponent'

    export default {
        name: 'UserComponent',
        components: {
            CrudTableComponent,
            CreateOrEditModalComponent
        },
        data() {
            return {
                tableData: {
                    headers: [
                        { text: 'Name', value: 'name' },
                        { text: 'Email', value: 'email' },
                        { text: 'Role', value: 'role.name' },
                        { text: 'Actions', value: 'actions', sortable: false }
                    ],
                    items: [],
                    title: 'Users',
                    btnName: 'Create User',
                },
                formDetails: {
                    open: false,
                    action: '',
                    for: 'User'
                },
                formData: {},
                roles: []

            }
        },
        mounted() {
            this.fetchAllUsers()
        },
        methods: {
            async fetchAllUsers() {
                try {
                    this.tableData.items = (await this.$axios.get('/api/users/')).data

                    this.tableData.items.forEach((element, index) => {
                        if(element.id === this.curentUserID) {
                            this.tableData.items.splice(index, 1)
                        }
                    })
                } catch (err) {
                    console.log(err)
                }
            },
            async fetchAllRoles() {
                try {
                    this.roles = (await this.$axios.get('api/roles/')).data
                } catch (err) {
                    console.log(err)
                }
            },
            async deleteUser(id) {
                try {
                    await this.$axios.delete(`api/users/${id}`)
                    await this.fetchAllUsers()
                } catch (err) {
                    console.log(err)
                }
            },
            async createOrUpdateUser(willSubmit) {
                if(willSubmit) {
                    try {
                        await this.$axios.post('api/users/', this.formData)
                        await this.fetchAllUsers()
                    } catch (err) {
                        console.log(err)
                    }
                }

                this.closeDialog()
            },
            showFormCreateUser() {
                this.formData.id = 0
                this.formDetails = {
                    open: true,
                    action: 'Create',
                    for: 'User'
                }

                this.fetchAllRoles()
            },
            showFormEditUser(item) {
                this.formDetails = {
                    open: true,
                    action: 'Edit',
                    for: 'User',
                }

                this.fetchAllRoles()
                this.formData = JSON.parse(JSON.stringify(item))
            },
            closeDialog() {
                this.formDetails.open = false
            }
        },
        computed: {
            curentUserID() {
                return this.$store.getters.getUserDetails.id
            }
        },
        mixins: [
            mixins
        ]
    }
</script>