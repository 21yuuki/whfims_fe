<template>
    <v-row justify="center">
        <v-dialog v-model="form.open" :max-width="maxWidth" persistent>
            <v-card>
                <v-card-title class="text-h5" color="orange">
                    {{  formTitle }}
                </v-card-title>

                <v-card-text>
                    <v-form @submit.prevent="createOrUpdateItem" ref="form">
                        <slot name="form"></slot>

                        <div class="text-right">
                            <v-btn text type="submit" dark color="primary" class="mr-1">Save</v-btn>
                            <v-btn text dark color="red" @click="closeDialog">Cancel</v-btn>
                        </div>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
    export default {
        name: 'CreateOrEditModalComponent',
        props: {
            formDetails: {
                type: Object
            },
            maxWidth: {
                type: String,
                default: '500'
            }
        },
        data() {
            return {
                form: {}
            }
        },
        methods: {
            createOrUpdateItem() {
                if(this.$refs.form.validate()) {
                    this.$emit('createOrUpdateItem', true)
                    this.form.open = false
                }
            },
            closeDialog() {
                this.form.open = false
                this.$refs.form.reset()
            }
        },
        computed: {
            formTitle() {
                return this.form.action + ' ' + this.form.for
            },
            isOpen() {
                return this.form.open
            }
        },
        watch: {
            formDetails: {
                deep: true,
                handler(item) {
                    this.form = JSON.parse(JSON.stringify(item))
                }
            }
        }
    }
</script>