<template>
    <v-container fluid fill-height>
        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4 lg3>
                <v-card class="elevation-6">
                    <v-card-title>
                        <h2 text-center>WHFIMS</h2>
                    </v-card-title>
                    <v-card-text>
                        <v-form @submit.prevent="login" ref="form">
                            <v-text-field
                                v-model="loginData.username"
                                type="email"
                                label="Email Address"
                                :rules="[rules.required, rules.email]"
                                oultined
                                required
                            />
            
                            <v-text-field
                                v-model="loginData.password"
                                type="password"
                                label="Password"
                                :rules="[rules.required]"
                                oultined
                                required
                            />
            
                            <v-input v-if="invalidCreds"
                                :error-messages="['Invalid user credentials.']"
                                error
                                readonly
                            />
            
                            <v-btn type="submit" block dark color="primary">Login</v-btn>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import mixins from '@/mixins/global'

    export default {
        name: "LogIn",
        data() {
            return {
                loginData: {},
                rules: {
                    required: (value) => !!value || 'Required.',
                    email: v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Please use a valid email address.'
                },
                invalidCreds: false
            }
        },
        methods: {
            async login() {
                if(this.$refs.form.validate()) {
                    this.loginData.grant_type = process.env.VUE_APP_GRANT_TYPE
                    this.loginData.client_id = process.env.VUE_APP_CLIENT_ID
                    this.loginData.client_secret = process.env.VUE_APP_CLIENT_SECRET
                    
                    try {
                        const token = await this.$axios.post('oauth/token', this.loginData)
                        
                        await this.$store.dispatch('storeTokenAction', token.data)

                        await this.getCurrentUser()

                        this.$router.push({ name: 'home' })
                    } catch (e) {
                        this.invalidCreds = true;
                    }
                }
            }
        }, 
        mixins: [
            mixins
        ]
    }
</script>