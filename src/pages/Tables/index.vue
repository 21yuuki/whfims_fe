<template>
    <div>
        <crud-table-component :tableData="tableData" @createItem="showFormCreateTable" @editItem="showFormEditTable"
            @deleteItem="deleteTable" class="mx-5 my-5" />

        <create-or-edit-modal-component :formDetails="formDetails" @createOrUpdateItem="createOrUpdateTable">
            <template v-slot:form>
                <v-text-field v-model="formData.identifier" label="Identifier" :rules="[rules.required]" />
            </template>
        </create-or-edit-modal-component>
    </div>
</template>

<script>
import mixins from '@/mixins/global'
import CrudTableComponent from '@/components/Tables/CrudTableComponent'
import CreateOrEditModalComponent from '@/components/Modals/CreateOrEditModalComponent'

export default {
    name: 'TableComponent',
    components: {
        CrudTableComponent,
        CreateOrEditModalComponent
    },
    data() {
        return {
            tableData: {
                headers: [
                    { text: 'Identifier', value: 'identifier' },
                    { text: 'Actions', value: 'actions', sortable: false }
                ],
                items: [],
                title: 'Tables',
                btnName: 'Create Table'
            },
            formDetails: {
                open: false,
                for: 'Table',
                action: ''
            },
            formData: {}
        }
    },
    mounted() {
        this.fetchAllTables()
    },
    methods: {
        async fetchAllTables() {
            try {
                this.tableData.items = (await this.$axios.get('api/tables/')).data
            } catch (err) {
                console.log(err)
            }
        },
        async deleteTable(id) {
            try {
                await this.$axios.delete(`api/tables/${id}`)
                await this.fetchAllTables()
            } catch (err) {
                console.log(err)
            }
        },
        async createOrUpdateTable(willSubmit) {
            if (willSubmit) {
                try {
                    await this.$axios.post('api/tables/', this.formData)
                    await this.fetchAllTables()
                } catch (err) {
                    console.log(err)
                }
            }

            this.closeDialog()
        },
        showFormCreateTable() {
            this.formData.id = 0
            this.formDetails = {
                open: true,
                action: 'Create',
                for: 'Table'
            }
        },
        showFormEditTable(item) {
            this.formDetails = {
                open: true,
                action: 'Edit',
                for: 'Table',
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