import Vue from 'vue'
import * as types from './mutation-types'

export const initComponent = ({ dispatch }, name) => {
  dispatch(types.INIT_STATE, name)
}

export const controlModal = ({ dispatch }, module, modalState, flag) => {
  dispatch(types.CONTROL_MODAL, module, modalState, flag)
}

export const setLoginFlag = ({ dispatch }, flag) => {
  dispatch(types.SET_LOGIN_FLAG, flag)
}

export const loginAction = ({ dispatch, router }, loginObj) => {
  dispatch(types.CONTROL_LOADING, 'login', 'showLoading', true)
  Vue.http.post('/babyMoveApi/api-token-auth/', loginObj).then((resp) => {
    dispatch(types.CONTROL_LOADING, 'login', 'showLoading', false)
    dispatch(types.SET_LOGIN_FLAG, false)
    sessionStorage.clear();
    sessionStorage.setItem('token', resp.data.token);
    router.go('/dashboard')
  }, (err) => {
    dispatch(types.CONTROL_LOADING, 'login', 'showLoading', false)
  })
}

export const logoutAction = ({ dispatch, router }) => {
  sessionStorage.clear();
  dispatch(types.SET_LOGIN_FLAG, true)
  if (router._currentRoute.path !== '/login') {
    router.go('/login')
  }
}

export const incrementTotalCount = ({ dispatch }) => {
  dispatch(types.INCREMENT_TOTAL_COUNT)
}

export const saveCountResult = ({ dispatch }) => {
  // load app loader
  dispatch(types.CONTROL_LOADING, 'app', 'showLoading', true)
    // get local storage result
  let result = JSON.parse(localStorage.getItem('babyMoveCounter'))
  Vue.http.post('/babyMoveApi/api/test_insert', result).then((resp) => {

  }, (err) => {})
}
