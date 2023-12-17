export default {
    data() {
        return {
            rules: {
                required: v => !!v || 'Required.',
                email: v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Please use a valid email address.'
            }
        }
    },
    methods: {
        async getCurrentUser() {
            return (await this.$axios.get('api/users/current-user')).data
        },
    }
}