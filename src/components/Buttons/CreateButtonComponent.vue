<template>
    <v-btn color="primary" dark class="mb-2" @click="btnCreateItemClicked">
        {{ btnName }}
    </v-btn>
</template>

<script>
    export default {
        name: 'CreateButtonComponent',
        props: {
            btnName: {
                type: String
            }
        },
        methods: {
            btnCreateItemClicked() {
                this.$emit('createItem')
            }
        }
    }
</script>