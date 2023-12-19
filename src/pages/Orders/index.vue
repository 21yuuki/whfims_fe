<template>
    <v-row class='px-5 pt-5 h-100 position-relative'>
        <v-col md="8">
            <left-component />
        </v-col>
        <v-col md="4">
            <right-component />
        </v-col>
    </v-row>
</template>

<script>
    import LeftComponent from '@/components/OrderComponents/LeftComponent'
    import RightComponent from '@/components/OrderComponents/RightComponent'

    export default {
        name: 'PointOfSalesComponent',
        components: {
            LeftComponent,
            RightComponent
        }
    }
</script>