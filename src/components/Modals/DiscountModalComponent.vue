<template>
    <v-row justify="center">
        <v-dialog v-model="dialog.open" max-width="350" persistent>
            <v-card>
                <v-card-title class="text-h5" color="orange">
                    {{ dialog.title }}
                </v-card-title>

                <v-card-text>
                    <v-form @submit.prevent="handleAddDiscount" ref="form">
                        <v-row>
                            <v-col sm="12" class="pb-0">
                                <v-select 
                                    v-model="discount.type"
                                    label="Type of Discount"
                                    :items="discountTypes"
                                    item-text="name"
                                    item-value="type"
                                    solo
                                    class="mb-0"
                                    :rules="[rules.required]"
                                />
                            </v-col>
    
                            <v-col sm="12" class="pb-0" v-if="discount.type === 'percentage'">
                                <v-text-field 
                                    v-model="discount.amount"
                                    type="number"
                                    label="Discount"
                                    :min="1"
                                    :max="100"
                                    solo
                                    class="mb-0 text-center"
                                    :rules="[rules.required]"
                                />
                            </v-col>
                            <v-col sm="12" class="pb-0" v-else-if="discount.type === 'raw'">
                                <v-text-field 
                                    v-model="discount.amount"
                                    type="number"
                                    label="Discount"
                                    :min="1"
                                    solo
                                    class="mb-0 text-center"
                                    :rules="[rules.required]"
                                />
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col>
                                <div class="text-right">
                                    <v-btn type="submit" text dark color="primary" class="mr-1">Confirm</v-btn>
                                    <v-btn text dark color="red" @click="closeDialog">Cancel</v-btn>
                                </div>
                            </v-col>
                        </v-row>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
    import mixins from '@/mixins/global'

    export default {
        name: 'DiscountModalComponent',
        props: {
            dialog: {
                type: Object
            }
        },
        data() {
            return {
                discountTypes: [
                    {
                        name: 'Percentage',
                        type: 'percentage'
                    },
                    {
                        name: 'Raw',
                        type: 'raw'
                    }
                ],
                discount: {
                    type: null,
                    amount: null,
                }
            }
        },
        methods: {
            handleAddDiscount() {
                if (this.$refs.form.validate()) {
                    this.$emit('handleAddDiscount', this.discount)
                    this.dialog.open = false
                }
            },
            closeDialog() {
                this.$refs.form.reset()
                this.dialog.open = false
            }
        },
        watch: {
            dialog: {
                deep: true,
                handler(item) {
                    if(item.open === false) {
                        this.$refs.form.reset()
                    }
                }
            }
        },
        mixins: [mixins]
    }
</script>