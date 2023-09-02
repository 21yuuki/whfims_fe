export default {
    data() {
        return {
            rules: {
                required: (value) => !!value || 'Required.',
                email: v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Please use a valid email address.'
            }
        }
    },
    methods: {
        async getCurrentUser() {
            const user = await this.$axios.get('api/users/current-user')
            return user.data
        }
    }
}