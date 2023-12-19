<template>
    <div class="position-relative h-100">
        <v-card class="px-5 py-5 position-absolute h-fill w-100">
            <v-flex d-flex>
                <v-layout wrap>
                    <v-flex md3 sm12 v-if="orders.length > 0" v-for="(order, index) in orders" :key="order.id">
                        <v-card dark class="mx-2 my-2" :color="getCardColor(order.order_status)" @click="handleClickOrder(index)">
                            <v-card-subtitle class="text-weight-black">
                                {{ order.order_status.toUpperCase() }} <br />
                                {{ order.dine_status }} <br />
                                {{ totalProductQuantity(order.order_items) }}
                            </v-card-subtitle>
                        </v-card>
                    </v-flex>

                    <v-flex md4 sm12 v-if="orders.length === 0">
                        <v-card-subtitle>
                            No orders at the moment.
                        </v-card-subtitle>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-card>
    </div>
</template>

<script>
import mixins from '@/mixins/global'
import { EventBus } from '@/eventBus'
import '@/assets/css/style.css'

export default {
    name: 'RightComponent',
    data() {
        return {
            orders: [],
            cardColors: [
                {
                    color: 'orange darken-3',
                    for: 'ongoing'
                },
                {
                    color: 'yellow darken-2',
                    for: 'preparing'
                },
                {
                    color: 'green darken-3',
                    for: 'served'
                },
                {
                    color: 'red darken-3',
                    for: 'void'
                },
                {
                    color: 'blue darken-4',
                    for: 'completed'
                },
            ]
        }
    },
    mounted() {
        this.getAllOrders()

        EventBus.$on('rerender', () => {
            this.getAllOrders()
        })
    },
    beforeDestroy() {
        EventBus.$off('rerender')
    },
    methods: {
        async getAllOrders() {
            try {
                this.orders = (await this.$axios.get('api/orders/findNonCompletedOrders')).data
            } catch (err) {
                console.log(err)
            }
        },
        getCardColor(order_status) {
            let color = null
            this.cardColors.forEach(card => {
                if(card.for === order_status) {
                    color = card.color
                }
            })

            return color
        },
        handleClickOrder(index) {
            this.$store.dispatch('setOrderDetailsAction', this.orders[index])
        },
        totalProductQuantity(order_items) {
            let totalProductQuantity = 0

            order_items.map(item => {
                totalProductQuantity += item.quantity
            })

            return totalProductQuantity + ' total items'
        }
    },
    mixins: [mixins]
}
</script>