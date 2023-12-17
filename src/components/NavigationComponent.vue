<template>
    <v-navigation-drawer app>
        <v-list>
            <v-list-item>
                <v-list-item-content class="text-center">
                    <v-list-item-title class="text-h6">
                        {{ user.name }}
                    </v-list-item-title>
                    <v-list-item-subtitle> {{ user.email }} </v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
        </v-list>

        <v-list>
            <v-list-item link to="/dashboard">
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
                    <v-list-item v-for="(item, index) in maintenance" :key="index" link :to="item.link">
                        <v-list-item-icon>
                            <v-icon v-text="item.icon"></v-icon>
                        </v-list-item-icon>

                        <v-list-item-title v-text="item.label"></v-list-item-title>
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
                    <v-list-item v-for="(item, index) in reports" :key="index" link :to="item.link">
                        <v-list-item-icon>
                            <v-icon v-text="item.icon"></v-icon>
                        </v-list-item-icon>

                        <v-list-item-title v-text="item.label"></v-list-item-title>
                    </v-list-item>
                </v-list-item-group>
            </v-list-group>

            <v-list-item link to="/pos" active-class>
                <v-list-item-icon>
                    <v-icon>mdi-network-pos</v-icon>
                </v-list-item-icon>

                <v-list-item-title>Point of Sales</v-list-item-title>
            </v-list-item>

            <v-list-item link to="/orders">
                <v-list-item-icon>
                    <v-icon>mdi-cart-outline</v-icon>
                </v-list-item-icon>

                <v-list-item-title>Orders</v-list-item-title>
            </v-list-item>

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
                    {
                        label: 'Users',
                        icon: 'mdi-account-circle',
                        link: '/users'
                    },
                    {
                        label: 'Roles',
                        icon: 'mdi-account-lock',
                        link: '/roles'
                    },
                    {
                        label: 'Tables',
                        icon: 'mdi-list-box-outline',
                        link: '/tables'
                    },
                    {
                        label: 'Categories',
                        icon: 'mdi-list-box-outline',
                        link: '/categories'
                    },
                    {
                        label: 'Products',
                        icon: 'mdi-list-box-outline',
                        link: '/products'
                    },
                ],
                reports: [
                    {
                        label: 'Sales',
                        icon: 'mdi-list-box-outline',
                        link: '/sales'
                    },
                    {
                        label: 'Withdrawals',
                        icon: 'mdi-list-box-outline',
                        link: '/withdrawals'
                    }
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