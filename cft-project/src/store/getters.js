// https://vuex.vuejs.org/en/getters.html

export default {
  getToken(state) {
    return state.token;
  },
  getListId(state) {
    return state.list_id;
  },
  getUserId(state) {
    return state.user_id;
  },
  getEmail(state){
    return state.user_email;
  }
}
