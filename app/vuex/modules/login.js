import {
  SET_LOGIN_LOADING_FLAG
} from '../mutation-types'

// initial state
const state = {
  showLoading: false
}

// mutations
const mutations = {
  [SET_LOGIN_LOADING_FLAG] (state, flag) { state.showLoading = flag }
}

export default {
  state,
  mutations
}
