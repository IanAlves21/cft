// https://vuex.vuejs.org/en/actions.html
import router from "../router/index"
export default {
    userLogin({ commit }, { token_user, new_user_id, email_user}) {
          commit('setToken', token_user);
          commit('setEmailUser', email_user);
          commit('setUserId', new_user_id);
          commit('setListId', 0)
          router.push('/list')
    },
    userSignOut({ commit }) {
      commit('setToken', '');
      commit('setUserId', '');
      router.push('/login');
    },
    userSetList({ commit }, { user_list_id } ) {
      commit('setListId', user_list_id);
      router.push('/imprimir');
    }
}
