<template>
    <v-container fluid>
        <crud-table-component :tableData="tableData" @createItem="showFormCreateCategory" @editItem="showFormEditCategory" @deleteItem="deleteCategory" class="mx-5 my-5" />

        <create-or-edit-modal-component :formDetails="formDetails" @createOrUpdateItem="createOrUpdateCategory">
            <template v-slot:form>
                <v-text-field v-model="formData.name" label="Category" :rules="[rules.required]" />
            </template>
        </create-or-edit-modal-component>
    </v-container>
</template>

<script>
import mixins from '@/mixins/global'
import CrudTableComponent from '@/components/Tables/CrudTableComponent'
import CreateOrEditModalComponent from '@/components/Modals/CreateOrEditModalComponent'

export default {
    name: 'CategoryComponent',
    components: {
        CrudTableComponent,
        CreateOrEditModalComponent
    },
    data() {
        return {
            tableData: {
                headers: [
                    { text: 'Category', value: 'name' },
                    { text: 'Actions', value: 'actions', sortable: false }
                ],
                items: [],
                title: 'Categories',
                btnName: 'Create Category'
            },
            formDetails: {
                open: false,
                for: 'Category',
                action: ''
            },
            formData: {}
        }
    },
    mounted() {
        this.fetchAllCategories()
    },
    methods: {
        async fetchAllCategories() {
            try {
                this.tableData.items = (await this.$axios.get('api/categories/')).data
            } catch (err) {
                console.log(err)
            }
        },
        async deleteCategory(id) {
            try {
                await this.$axios.delete(`api/categories/${id}`)
                await this.fetchAllCategories()
            } catch (err) {
                console.log(err)
            }
        },
        async createOrUpdateCategory(willSubmit) {
            if (willSubmit) {
                try {
                    await this.$axios.post('api/categories/', this.formData)
                    await this.fetchAllCategories()
                } catch (err) {
                    console.log(err)
                }
            }

            this.closeDialog()
        },
        showFormCreateCategory() {
            this.formData.id = 0
            this.formDetails = {
                open: true,
                action: 'Create',
                for: 'Category'
            }
        },
        showFormEditCategory(item) {
            this.formDetails = {
                open: true,
                action: 'Edit',
                for: 'Category',
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