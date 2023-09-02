<template>
    <div>
        <v-data-table
            :headers="tableData.headers"
            :items="tableData.items"
            class="elevation-1"
        >
            <template v-slot:top>
                <v-toolbar flat>
                    <v-toolbar-title class="text-uppercase">{{ tableData.title }}</v-toolbar-title>
                    <v-spacer></v-spacer>
    
                    <template>
                        <create-button-component :btnName="tableData.btnName" @createItem="createItem" />
                    </template>
                </v-toolbar>
            </template>

            <template v-for="header in tableData.headers" v-slot:[`item.${header.value}`]="{item}">
                <slot :name="[`item.${header.value}`]" :item="item">
                    {{ getVal(item, header.value) }}
                </slot>
            </template>

            <template v-slot:item.actions="{item}">
              <v-icon color="warning" small class="mr-2" @click="editItem(item)">
                mdi-pencil
              </v-icon>
              
              <v-icon color="red" small @click="deleteItem(item.id)">
                mdi-delete
              </v-icon>
            </template>
        </v-data-table>
    
        <confirmation-modal-component :dialog="dialog" @closeDialog="closeDialog" />
    </div>
</template>

<script>
    import ConfirmationModalComponent from '@/components/Modals/ConfirmationModalComponent'
    import CreateButtonComponent from '@/components/Buttons/CreateButtonComponent'
    
    export default {
        name: 'CrudTableComponent',
        components: {
            ConfirmationModalComponent,
            CreateButtonComponent
        },
        props: {
            tableData: {
                type: Object
            }
        },
        data() {
            return {
                item_id: 0,
                method: null,
                dialog: {
                    open: false,
                    title: '',
                    message: ''
                }
            }
        },
        methods: {
            createItem() {
                this.$emit('createItem')  
            },
            editItem(id) {
                this.$emit('editItem', id)
            },
            deleteItem(id) {
                this.dialog = {
                    open: true,
                    title: 'Delete',
                    message: 'Are you sure you want to delete this item?'
                }

                this.item_id = id
                this.method = 'delete'
            },
            closeDialog(isTrue) {
                if (isTrue && this.method !== null) {
                    if(this.method === 'delete') {
                        this.$emit('deleteItem', this.item_id)
                    }
                }

                this.dialog.open = false
            },
            getVal(item, path) {
                if (typeof path === undefined)
                    return 'N/A'

                return path.split(".").reduce((res, prop) => (!res || false) ? null : res[prop], item)
            },
        },
    }
</script>