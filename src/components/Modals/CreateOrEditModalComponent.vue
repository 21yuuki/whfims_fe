<template>
    <v-row justify="center">
        <v-dialog v-model="formDetails.open" :max-width="maxWidth">
            <v-card>
                <v-card-title class="text-h5" color="orange">
                    {{  formTitle }}
                </v-card-title>

                <v-card-text>
                    <v-form @submit.prevent="createOrUpdateItem" ref="form">
                        <slot name="form"></slot>

                        <div class="text-right">
                            <v-btn text type="submit" dark color="primary" class="mr-1">Save</v-btn>
                            <v-btn text dark color="red" @click="closeDialog(false)">Cancel</v-btn>
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
        methods: {
            createOrUpdateItem() {
                if(this.$refs.form.validate()) {
                    this.closeDialog(true)
                }
            },
            closeDialog(willSubmit) {
                this.$emit('createOrUpdateItem', willSubmit)
            }
        },
        computed: {
            formTitle() {
                return this.formDetails.action + ' ' + this.formDetails.for
            }
        }
    }
</script>