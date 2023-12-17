<template>
    <div class="position-relative h-100">
        <div class='mb-3 pb-0'>
            <v-flex d-flex>
                <v-row>
                    <v-col sm="12" md="4">
                        <v-text-field 
                            v-model="searchedProduct"
                            label="Search"
                            solo
                            class="mb-0"
                            hide-details
                        />
                    </v-col>
                    <v-col sm="12" md="4">
                        <v-select 
                            v-model="selectedCategory"
                            label="Categories"
                            :items="categories"
                            item-text="name"
                            item-value="id"
                            solo
                            clearable
                            class="mb-0"
                            hide-details
                        />
                    </v-col>
                </v-row>
            </v-flex>
        </div>
    
        <v-card class='px-5 py-5 position-absolute h-fill w-100 overflow-y-scroll'>
            <v-flex d-flex>
                <v-layout wrap>
                    <v-flex md4 sm12 v-if="products.length > 0" v-for="product in products" :key="product.id">
                        <v-card class="mx-1 my-1" @click="addToCart(product)">
                            <v-card-title>{{ product.name }}</v-card-title>
                            <v-card-subtitle>
                                {{ product.category.name }} - ₱{{ product.price }}
                            </v-card-subtitle>
                        </v-card>
                    </v-flex>

                    <v-flex md4 sm12 v-if="products.length === 0">
                        <v-card-subtitle>
                            No products available.
                        </v-card-subtitle>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-card>
    </div>
</template>

<script>
    import mixins from '@/mixins/global'
    import '@/assets/css/style.css'

    export default {
        name: 'LeftComponent',
        data() {
            return {
                categories: [],
                products: [],
                searchedProduct: '',
                selectedCategory: null,
                cart: []
            }
        },
        mounted() {
            this.fetchAllCategories()
            this.fetchAllProducts()
        },
        methods: {
            async fetchAllCategories() {
                try {
                    this.categories = (await this.$axios.get('api/categories/')).data
                } catch (err) {
                    console.log(err)
                }
            },
            async fetchAllProducts() {
                try {
                    this.products = (await this.$axios.get('/api/products')).data
                } catch (err) {
                    console.log(err)
                }
            },
            async fetchAllProductsByNameAndCategoryId(productName, categoryId) {
                try {
                    const data = { productName, categoryId }
                    this.products = (await this.$axios.post('/api/products/getProductsByNameAndCategoryId', data)).data
                } catch (err) {
                    console.log(err)
                }
            },
            async addToCart(product) {
                const mappedProduct = {
                    category_id: product.category_id,
                    product_id: product.id,
                    product_name: product.name,
                    product_price: product.price,
                    product_cost: product.cost,
                    category_name: product.category.name
                }

                // Check if cart is empty
                if(this.cart.length === 0) {
                    // Add new product if empty cart
                    mappedProduct.quantity = 1

                    // Push to cart
                    this.cart.push(mappedProduct)
                } else {
                    // Check if product exists in cart by product id
                    const existingProduct = this.cart.find(o => o.product_id === product.id)

                    // If existing add quantity
                    if(existingProduct) {
                        existingProduct.quantity++

                    // If not existing let quantity be 1 and push to cart
                    } else {
                        mappedProduct.quantity = 1
                        this.cart.push(mappedProduct)
                    }
                }

                await this.$store.dispatch('setCartItemsAction', this.cart)
            }
        },
        watch: {
            searchedProduct: {
                async handler(productName) {
                    await this.fetchAllProductsByNameAndCategoryId(productName, this.selectedCategory)
                }
            },
            selectedCategory: {
                async handler(categoryId) {
                    await this.fetchAllProductsByNameAndCategoryId(this.searchedProduct, categoryId)
                }
            }
        },
        mixins: [mixins]
    }
</script>