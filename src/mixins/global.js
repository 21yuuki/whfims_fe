export default {
    methods: {
        async getCurrentUser() {
            const user = await this.$axios.get('api/users/current-user')
            return user.data
        }
    }
}