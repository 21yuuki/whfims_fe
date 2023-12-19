<template>
    <div class="position-relative h-100">
        <v-card class='px-5 py-5 overflow-auto position-absolute w-100 h-73' elevation='2'>
            <v-row>
                <v-col lg="6" sm="12">
                    <v-select 
                        v-model="selectedDineStatus"
                        label="Dine Status"
                        :items="dineStatus"
                        solo
                        class="mb-0"
                        hide-details
                    />
                </v-col>

                <v-col lg="6" sm="12" v-if="selectedDineStatus === 'Dine In'">
                    <v-select 
                        v-model="selectedTable"
                        label="Select a Table"
                        :items="availableTables"
                        solo
                        item-text="identifier"
                        item-value="id"
                        class="mb-0"
                        hide-details
                    />
                </v-col>
            </v-row>

            <v-row>
                <v-col md="3">
                    <div class="mx-1 font-v-card">Qty</div>
                </v-col>

                <v-col md="5">
                    <div class="mx-1 font-v-card">Product</div>
                </v-col>

                <v-col md="3">
                    <div class="mx-1 font-v-card">Partial Sum</div>
                </v-col>
            </v-row>

            <v-row v-for="(item, index) in cartItems" :key="item.product_id" class="mt-0">
                <v-col md="3">
                    <div class="mx-1 font-v-card">
                        <v-text-field 
                            type="number"
                            :min="1"
                            v-model="item.quantity"
                            solo
                            class="mb-0 text-center"
                            hide-details
                            required
                        />
                    </div>
                </v-col>

                <v-col md="5">
                    <div class="mx-1 font-v-card">
                        {{ item.product_name }} @ {{ '₱' + item.product_price }}    
                    </div>
                </v-col>

                <v-col md="3">
                    <div class="mx-1 font-v-card">
                        ₱{{ item.quantity * item.product_price }}  
                    </div>
                </v-col>

                <v-col md="1">
                    <div class="font-v-card">
                        <v-icon @click="handleRemoveItemFromCart(index)">mdi-close</v-icon>
                    </div>
                </v-col>
            </v-row>
        </v-card>

        <v-card class='px-5 py-5 position-absolute w-100 h-fill top-75' elevation='2'>
            <v-row>
                <v-col md="6" class="pb-0">
                    <div class="mx-1 font-v-card">
                        {{ `${totalItems} ${totalItems === 1 ? 'item' : 'items'}`  }}
                    </div>
                </v-col>
                <v-col md="6" class="pb-0">
                    <div class="mx-1 font-v-card text-right">
                        Subtotal: ₱<span class="font-weight-bold">{{ subTotal }}</span>
                    </div>
                </v-col>   
            </v-row>

            <v-row>
                <v-col md="6" class="py-0">
                    <div class="mx-1 font-v-card">
                        <span v-if="discount.amount < 1" @click="handleAddDiscountButtonClicked" class="color-teal-accent3 font-weight-bold cursor-pointer">Add Discount</span>
                        <span v-else @click="handleRemoveDiscountButtonClicked" class="color-teal-accent3 font-weight-bold cursor-pointer">Remove Discount</span>
                    </div>
                </v-col>
                <v-col md="6" class="py-0">
                    <div class="mx-1 text-right font-v-card">
                        Discount: 
                        <span v-if="discount.type === 'percentage'">{{ ' (' + discount.amount + '%)' }}</span>
                        ₱<span class="font-weight-bold">{{ getDiscount }}</span>
                    </div>
                </v-col>
            </v-row>

            <v-row>
                <v-col md="12" class="pt-0">
                    <div class="mx-1 text-right text-h5">
                        Total: ₱<span class="font-weight-bold">{{ totalPrice }}</span>
                    </div>
                </v-col>
            </v-row>

            <v-row class="position-relative">
                <div class="position-absolute w-100 px-5 my-5">
                    <v-btn
                        block
                        dark
                        rounded-lg
                        color="teal accent-3"
                        @click="handleSubmit"
                    >
                        Add Order
                    </v-btn>
                </div>
            </v-row>
        </v-card>

        <discount-modal-component :dialog="dialog" @handleAddDiscount="handleAddDiscount" />
    </div>
</template>

<script>
    import DiscountModalComponent from '@/components/Modals/DiscountModalComponent'
    import mixins from '@/mixins/global'
    import '@/assets/css/style.css'

    export default {
        name: 'RightComponent',
        components: {
            DiscountModalComponent
        },
        data() {
            return {
                availableTables: null,
                dialog: {
                    open: false,
                    title: '',
                },
                discount: {
                    type: 'none',
                    amount: 0
                },
                dineStatus: [
                    'Dine In', 'Take Out'
                ],
                selectedDineStatus: 'Dine In',
                selectedTable: null
            }
        },
        mounted() {
            this.fetchAllTables()
            this.clearRightComponentOnMount()
        },
        methods: {
            clearRightComponentOnMount() {
                this.$store.dispatch('setCartItemsAction', [])
            },
            async fetchAllTables() {
                try {
                    this.availableTables = (await this.$axios.get('api/tables/availableTables')).data
                    this.selectedTable = this.availableTables[0].id
                } catch (err) {
                    console.log(err)
                }
            },
            handleRemoveItemFromCart(index) {
                this.$store.dispatch('removeCartItemAction', index)
            },
            handleAddDiscountButtonClicked() {
                this.dialog = {
                    open: true,
                    title: 'Add Discount',
                    message: 'Are you sure you want to add discount?'
                }
            },
            handleAddDiscount(discount) {
                this.discount.type = discount.type
                this.discount.amount = discount.amount
            },
            handleRemoveDiscountButtonClicked() {
                this.discount.type = 'none'
                this.discount.amount = 0
            },
            async handleSubmit() {
                if(this.cartItems.length > 0) {
                    const data = {
                        dine_status: this.selectedDineStatus,
                        table_id: this.selectedDineStatus === 'Dine In' ? this.selectedTable : null,
                        discount_type: this.discount.type,
                        discount_amount: parseFloat(this.discount.amount),
                        cart_items: this.cartItems
                    }
    
                    try {
                        await this.$axios.post('api/orders/saveOrderAndOrderItems', data)
                        this.clearRightComponentOnMount()
                    } catch (err) {
                        console.log(err)
                    }
                }
            }
        },
        computed: {
            cartItems() {
                return this.$store.getters.getCartItems
            },
            totalItems() {
                let totalItems = 0
                this.cartItems.forEach(item => totalItems += parseInt(item.quantity))

                return totalItems
            },
            getDiscount() {
                if(this.discount.type === 'none' || this.discount.type === 'raw') {
                    return this.discount.amount
                } else {
                    return this.subTotal * (this.discount.amount / 100)
                }      
            },
            subTotal() {
                let subTotal = 0
                this.cartItems.forEach(item => subTotal += (parseInt(item.quantity) * parseFloat(item.product_price)))
                
                return subTotal
            },
            totalPrice() {
                return this.subTotal - this.getDiscount
            }
        },
        mixins: [mixins]
    }
</script>