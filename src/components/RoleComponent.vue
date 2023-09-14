<template>
    <v-container fluid>
        <crud-table-component :tableData="tableData" @createItem="showFormCreateRole" @editItem="showFormEditRole" @deleteItem="deleteRole" class="mx-5 my-5" />
        
        <create-or-edit-modal-component :formDetails="formDetails" @createOrUpdateItem="createOrUpdateRole">
            <template v-slot:form>
                <v-text-field
                    v-model="formData.name"
                    label="Role"
                    :rules="[rules.required]"
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
        name: 'RoleComponent',
        components: {
            CrudTableComponent,
            CreateOrEditModalComponent
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
                },
                formDetails: {
                    open: false,
                    for: 'Role',
                    action: ''
                },
                formData: {}
            }
        },
        mounted() {
            this.fetchAllRoles()
        },
        methods: {
            async fetchAllRoles() {
                try {
                    this.tableData.items = (await this.$axios.get('api/roles/')).data
                } catch (err) {
                    console.log(err)
                }
            },
            async deleteRole(id) {
                try {
                    await this.$axios.delete(`api/roles/${id}`)
                    await this.fetchAllRoles()
                } catch (err) {
                    console.log(err)
                }
            },
            async createOrUpdateRole(willSubmit) {
                if(willSubmit) {
                    try {
                        await this.$axios.post('api/roles/', this.formData)
                        await this.fetchAllRoles()
                    } catch (err) {
                        console.log(err)
                    }
                }

                this.closeDialog()
            },
            showFormCreateRole() {
                this.formData.id = 0
                this.formDetails = {
                    open: true,
                    action: 'Create',
                    for: 'Role'
                }
            },
            showFormEditRole(item) {
                this.formDetails = {
                    open: true,
                    action: 'Edit',
                    for: 'Role',
                }

                this.formData = JSON.parse(JSON.stringify(item))
            },
            closeDialog() {
                this.formDetails.open = false
            }
        },
        mixins: [
            mixins
        ]
    }
</script>