<template>
    <div>
        <crud-table-component :tableData="tableData" @createItem="showFormCreateProduct" @editItem="showFormEditProduct"
            @deleteItem="deleteProduct" class="mx-5 my-5" />

        <create-or-edit-modal-component :formDetails="formDetails" @createOrUpdateItem="createOrUpdateProduct">
            <template v-slot:form>
                <v-text-field v-model="formData.name" label="Product Name" :rules="[rules.required]" />

                <v-select v-model="formData.category_id" label="Category Name" :rules="[rules.required]" :items="categories"
                    item-text="name" item-value="id" />

                <v-text-field v-model="formData.cost" type="number" label="Cost" :rules="[rules.required]" />

                <v-text-field v-model="formData.price" type="number" label="Price" :rules="[rules.required]" />
            </template>
        </create-or-edit-modal-component>
    </div>
</template>

<script>
import mixins from '@/mixins/global'
import CrudTableComponent from '@/components/Tables/CrudTableComponent'
import CreateOrEditModalComponent from '@/components/Modals/CreateOrEditModalComponent'

export default {
    name: 'ProductComponent',
    components: {
        CrudTableComponent,
        CreateOrEditModalComponent
    },
    data() {
        return {
            tableData: {
                headers: [
                    { text: 'Product', value: 'name' },
                    { text: 'Category', value: 'category.name' },
                    { text: 'Cost', value: 'cost' },
                    { text: 'Price', value: 'price' },
                    { text: 'Actions', value: 'actions', sortable: false }
                ],
                items: [],
                title: 'Products',
                btnName: 'Create Product'
            },
            formDetails: {
                open: false,
                for: 'Product',
                action: ''
            },
            formData: {},
            categories: []
        }
    },
    mounted() {
        this.fetchAllProducts()
    },
    methods: {
        async fetchAllProducts() {
            try {
                this.tableData.items = (await this.$axios.get('api/products/')).data
            } catch (err) {
                console.log(err)
            }
        },
        async fetchAllCategories() {
            try {
                this.categories = (await this.$axios.get('api/categories/')).data
            } catch (err) {
                console.log(err)
            }
        },
        async deleteProduct(id) {
            try {
                await this.$axios.delete(`api/products/${id}`)
                await this.fetchAllProducts()
            } catch (err) {
                console.log(err)
            }
        },
        async createOrUpdateProduct(willSubmit) {
            if (willSubmit) {
                try {
                    await this.$axios.post('api/products/', this.formData)
                    await this.fetchAllProducts()
                } catch (err) {
                    console.log(err)
                }
            }

            this.closeDialog()
        },
        showFormCreateProduct() {
            this.formData.id = 0
            this.formDetails = {
                open: true,
                action: 'Create',
                for: 'Product'
            }

            this.fetchAllCategories()
        },
        showFormEditProduct(item) {
            this.formDetails = {
                open: true,
                action: 'Edit',
                for: 'Product',
            }

            this.fetchAllCategories()
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