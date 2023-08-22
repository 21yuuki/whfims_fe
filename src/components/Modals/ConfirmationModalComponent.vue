<template>
    <v-row justify="center">
        <v-dialog v-model="dialog.open" max-width="350">
            <v-card>
                <v-card-title class="text-h5" color="orange">
                    {{ dialog.title }}
                </v-card-title>

                <v-card-text>
                    {{ dialog.message }}
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn color="success" text @click="closeDialog(true)">
                        Yes
                    </v-btn>

                    <v-btn color="red" text @click="closeDialog(false)">
                        No
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
    export default {
        name: 'LogoutModalComponent',
        props: {
            dialog: {
                type: Object
            }
        },
        methods: {
            async closeDialog(isTrue) {
                this.$emit('closeDialog', isTrue)
            }
        }
    }
</script>