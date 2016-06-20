import {
  SET_LOGIN_FLAG,
  SET_LOADING_FLAG
} from '../mutation-types'

// initial state
const state = {
  bLoginPage: false,
  showLoading: false
}

// mutations
const mutations = {
    [SET_LOGIN_FLAG] (state, flag) { state.bLoginPage = flag },
    [SET_LOADING_FLAG] (state, flag) { state.showLoading = flag }
}

export default {
  state,
  mutations
}
