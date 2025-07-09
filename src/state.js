import { reactive } from 'vue'

const state = reactive({
    user: JSON.parse(localStorage.getItem('user')) || null
})

export function useUserStore() {
    return {
        get user() {
            return state.user
        },
        setUser(userData) {
            state.user = userData
            localStorage.setItem('user', JSON.stringify(userData))
        },
        clearUser() {
            state.user = null
            localStorage.removeItem('user')
        }
    }
}