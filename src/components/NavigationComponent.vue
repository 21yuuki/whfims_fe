<template>
    <v-navigation-drawer>
        <v-list>
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title class="text-h6">
                        {{ user.name }}
                    </v-list-item-title>
                    <v-list-item-subtitle> {{ user.email }} </v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list>
            <v-list-item link @click="returnComponent('Dashboard')">
                <v-list-item-icon>
                    <v-icon>mdi-view-dashboard</v-icon>
                </v-list-item-icon>

                <v-list-item-title>Dashboard</v-list-item-title>
            </v-list-item>

            <v-list-group no-action sub-group>
                <template v-slot:activator>
                    <v-list-item-content>
                        <v-list-item-title>Maintenance</v-list-item-title>
                    </v-list-item-content>
                </template>

                <v-list-item-group>
                    <v-list-item v-for="([title, icon], i) in maintenance" :key="i" link @click="returnComponent(title)">
                        <v-list-item-icon>
                            <v-icon v-text="icon"></v-icon>
                        </v-list-item-icon>

                        <v-list-item-title v-text="title"></v-list-item-title>
                    </v-list-item>
                </v-list-item-group>
            </v-list-group>

            <v-list-group no-action sub-group>
                <template v-slot:activator>
                    <v-list-item-content>
                        <v-list-item-title>Reports</v-list-item-title>
                    </v-list-item-content>
                </template>

                <v-list-item-group>
                    <v-list-item v-for="([title, icon], i) in reports" :key="i" link @click="returnComponent(title)">
                        <v-list-item-icon>
                            <v-icon v-text="icon"></v-icon>
                        </v-list-item-icon>

                        <v-list-item-title v-text="title"></v-list-item-title>
                    </v-list-item>
                </v-list-item-group>
            </v-list-group>

            <v-list-item link @click="logoutBtnClicked">
                <v-list-item-icon>
                    <v-icon>mdi-logout</v-icon>
                </v-list-item-icon>

                <v-list-item-title>Logout</v-list-item-title>
            </v-list-item>
        </v-list>

        <confirmation-modal-component :dialog="dialog" @closeDialog="closeDialog" />
    </v-navigation-drawer>
</template>

<script>
    import ConfirmationModalComponent from '@/components/Modals/ConfirmationModalComponent'

    export default {
        name: 'NavigationComponent', 
        components: {
            ConfirmationModalComponent
        },
        data() {
            return {
                maintenance: [
                    ['Users', 'mdi-account-circle'],
                    ['Roles', 'mdi-account-lock'],
                    ['Tables', 'mdi-list-box-outline'],
                    ['Categories', 'mdi-list-box-outline'],
                    ['Products', 'mdi-list-box-outline']
                ],
                reports: [
                    ['Sales', 'mdi-list-box-outline'],
                    ['Withdrawals', 'mdi-list-box-outline']
                ],
                dialog: {
                    open: false,
                    title: '',
                    message: ''
                }
            }
        },
        methods: {
            logoutBtnClicked() {
                this.dialog = {
                    open: true,
                    title: 'Logout',
                    message: 'Are you sure you want to logout?'
                }
            },
            async closeDialog(isTrue) {
                if(isTrue) { 
                    await this.$axios.post('/api/users/logout')
                    await this.$store.dispatch('destroySessionAction')
                    this.$router.push({ name: 'login' })
                }
                
                this.dialog.open = false
            },
            async returnComponent(title) {
                this.$emit('returnComponent', title)
            }
        },
        computed: {
            user() {
                return this.$store.getters.getUserDetails
            }
        }
    }
</script>