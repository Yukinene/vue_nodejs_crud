import { createStore } from 'vuex'

export default createStore({
  state: {
    user: null,
    token: null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setToken(state, token) {
      state.token = token
    },
  },
  actions: {
    login({ commit }, { username, password }) {
      return new Promise((resolve, reject) => {
        axios
          .post('http://localhost:3000/api/auth/login', { username, password }, { withCredentials: true })
          .then((response) => {
            commit('setUser', response.data.user)
            resolve(response)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    logout({ commit }) {
      return new Promise((resolve, reject) => {
        axios
          .post('http://localhost:3000/api/auth/logout', {}, { withCredentials: true })
          .then(() => {
            commit('setUser', null)
            commit('setToken', null)
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
  },
  modules: {},
})
