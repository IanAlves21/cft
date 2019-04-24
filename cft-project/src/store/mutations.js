// https://vuex.vuejs.org/en/mutations.html

export default {
  setIsAuthenticated(state, payload) {
    state.isAuthenticated = payload;
  },
  setToken(state, payload) {
    state.token = payload;
  },
  setListId(state, payload) {
    state.list_id = payload;
  },
  setUserId(state, payload) {
    state.user_id = payload;
  },
  setEmailUser(state, payload){
    state.user_email = payload;
  }
}
