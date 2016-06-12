import Vue from 'vue'
import * as types from './mutation-types'

export const setLoginFlag = ({ dispatch }, flag) => {
  dispatch(types.SET_LOGIN_FLAG, flag)
}

export const loginAction = ({ dispatch, router }, loginObj) => {
  dispatch(types.SET_LOGIN_LOADING_FLAG, true)
  Vue.http.post('/api-token-auth/', loginObj).then(function(resp) {
    dispatch(types.SET_LOGIN_LOADING_FLAG, false)
    sessionStorage.clear();
    sessionStorage.setItem('token', resp.data.token);
    router.go('/dashboard')
  }, function(err) {
    dispatch(types.SET_LOGIN_LOADING_FLAG, false)
  })
}

export const initComponent = ({ dispatch }, name) => {
  dispatch(types.INIT_STATE, name)
}
