<template>
    <div v-if="orderDetails.length !== 0" class="position-relative h-100">
        <v-card class="px-5 py-5 position-absolute h-fill w-100">
            <v-row class="mb-5">
                <v-col lg="4" sm="12" v-if="orderDetails.order_status !== 'completed'">
                    <v-btn
                        v-if="orderDetails.order_status === 'ongoing'"
                        dark
                        rounded-lg
                        color="yellow accent-3"
                        block
                        @click="handleChangeStatus(orderDetails.id, 'preparing')"
                    >
                        Prepare
                    </v-btn>

                    <v-btn
                        v-if="orderDetails.order_status === 'preparing'"
                        dark
                        rounded-lg
                        color="green accent-3"
                        block
                        @click="handleChangeStatus(orderDetails.id, 'served')"
                    >
                        Serve
                    </v-btn>

                    <v-btn
                        v-if="orderDetails.order_status === 'served'"
                        dark
                        rounded-lg
                        color="blue accent-3"
                        block
                        @click="handleChangeStatus(orderDetails.id, 'completed')"
                    >
                        Complete
                    </v-btn>
                </v-col>

                <v-col lg="4" sm="12">
                    <v-btn
                        dark
                        rounded-lg
                        color="orange accent-3"
                        block
                    >
                        Update Order
                    </v-btn>
                </v-col>

                <v-col lg="4" sm="12" v-if="orderDetails.order_status !== 'completed' && orderDetails.order_status !== 'served'">
                    <v-btn
                        dark
                        rounded-lg
                        color="red accent-3"
                        block
                        @click="handleChangeStatus(orderDetails.id, 'voided')"
                    >
                        Void Order
                    </v-btn>
                </v-col>
            </v-row>

            <!-- Details -->
            <v-row class="mb-3">
                <v-col md="6">
                    <div class="mx-1 font-v-card font-weight-black">{{ orderDetails.table.identifier }}</div>
                </v-col>
                <v-col md="6">
                    <div class="mx-1 font-v-card text-right font-weight-black">{{ orderTime }}</div>
                </v-col>
            </v-row>

            <!-- Items -->
            <v-row>
                <v-col md="7">
                    <div class="mx-1 font-v-card">Product</div>
                </v-col>

                <v-col md="2">
                    <div class="mx-1 font-v-card text-center">Qty</div>
                </v-col>
    
                <v-col md="3">
                    <div class="mx-1 font-v-card text-left">Sum</div>
                </v-col>
            </v-row>

            <v-row v-for="(item, index) in orderDetails.order_items" :key="item.product_id" class="mt-0">
                <v-col md="7">
                    <div class="mx-1 font-v-card">
                        {{ item.product_name }} @ {{ '₱' + item.product_price }}    
                    </div>
                </v-col>

                <v-col md="2">
                    <div class="mx-1 font-v-card text-center">{{ item.quantity }}</div>
                </v-col>

                <v-col md="3">
                    <div class="mx-1 font-v-card text-left">
                        ₱{{ item.quantity * item.product_price }}  
                    </div>
                </v-col>
            </v-row>

            <div class="position-absolute w-100 bottom-0">
                <v-row class="mt-0 mr-5 pr-2 mb-5">
                    <v-col md="7">
                        <div class="mx-1 font-v-card">
                            Subtotal: <br />
                            Discount: <br />
                            <span class="text-h5 font-weight-black">Total:</span>
                        </div>
                    </v-col>
    
                    <v-col md="2">
                        <div class="mx-1 font-v-card text-center"></div>
                    </v-col>
    
                    <v-col md="3">
                        <div class="mx-1 font-v-card text-left">
                            ₱{{ returnTotalPrice }} <br />
                            ₱{{ returnDiscount }}  <br />
                            <span class="text-h5 font-weight-black text-left">
                                ₱{{ returnTotalPrice - returnDiscount }}  
                            </span>
                        </div>
                    </v-col>
                </v-row>
            </div>
        </v-card>
    </div>
</template>

<script>
import mixins from '@/mixins/global'
import { EventBus } from '@/eventBus'
import '@/assets/css/style.css'

export default {
    name: 'RightComponent',
    mounted() {
        this.clearRightComponentOnMount()
    },
    methods: {
        clearRightComponentOnMount() {
            this.$store.dispatch('setOrderDetailsAction', [])
        },
        async handleChangeStatus(orderId, status) {
            const data = {
                id: orderId,
                order_status: status
            }

            try {
                await this.$axios.post('api/orders/', data)
                EventBus.$emit('rerender')
                this.clearRightComponentOnMount()
            } catch (err) {
                console.log(err)
            }
        }
    },
    computed: {
        orderDetails() {
            return this.$store.getters.getOrderDetails
        },
        orderTime() {
            return new Date(this.orderDetails.created_at).toLocaleDateString() + ' ' + new Date(this.orderDetails.created_at).toLocaleTimeString()
        },
        returnTotalQuantity() {
            let totalQuantity = 0

            this.orderDetails.order_items.map(item => {
                totalQuantity += item.quantity
            })

            return totalQuantity
        },
        returnTotalPrice() {
            let totalPrice = 0

            this.orderDetails.order_items.map(item => {
                totalPrice += item.quantity * item.product_price
            })

            return totalPrice
        },
        returnDiscount() {
            const totalPrice = this.returnTotalPrice
            const discountType = this.orderDetails.discount_type
            const discountAmount = this.orderDetails.discount_amount
            
            switch (discountType) {
                case 'none': return 0
                case 'raw': return discountAmount
                case 'percentage': return (totalPrice * discountAmount) / 100
            }
        }
    },
    mixins: [mixins]
}
</script>