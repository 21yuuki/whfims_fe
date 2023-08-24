<template>
    <div>
        <v-data-table
            :headers="tableData.headers"
            :items="tableData.items"
            class="elevation-1"
        >
            <template v-slot:top>
                <v-toolbar flat>
                    <v-toolbar-title>{{ tableData.title }}</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical />
                    <v-spacer></v-spacer>
    
                    <template>
                        <v-btn color="primary" dark class="mb-2">
                            {{ tableData.btnName }}
                        </v-btn>
                    </template>
                </v-toolbar>
    
            </template>
    
            <template v-slot:item.actions="{item}">
              <v-icon color="warning" small class="mr-2" @click="editItem(item.id)">
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
    
    export default {
        name: 'CrudTableComponent',
        components: {
            ConfirmationModalComponent
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
            async editItem(id) {
                this.$emit('editItem', id)
            },
            async deleteItem(id) {
                this.dialog = {
                    open: true,
                    title: 'Delete',
                    message: 'Are you sure you want to delete this item?'
                }

                this.item_id = id
                this.method = 'delete'
            },
            async closeDialog(isTrue) {
                if (isTrue && this.method !== null) {
                    if(this.method === 'delete') {
                        this.$emit('deleteItem', this.item_id)
                    }
                }

                this.dialog.open = false
            }
        }
    }
</script>