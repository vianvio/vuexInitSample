import Vuex from 'vuex'
import Vue from 'vue'
import middlewares from './middlewares'
import * as types from './mutation-types'
import app from './modules/app'
import nav from './modules/nav'
import login from './modules/login'
import register from './modules/register'
import dashboard from './modules/dashboard'
import counter from './modules/counter'

const debug = process.env.NODE_ENV !== 'production'

Vue.use(Vuex)
Vue.config.debug = debug
Vue.config.warnExpressionErrors = debug

const mutations = {
  // common mutations
  [types.INIT_STATE] (state, moduleName) {
    state[moduleName] = { ...module.exports.default._modules[moduleName].state }
  },
  [types.CONTROL_MODAL](state, module, modalProperty, flag) {
    state[module][modalProperty] = flag
  },
  [types.CONTROL_LOADING](state, module, loadingProperty, flag) {
    state[module][loadingProperty] = flag
  }
}

export default new Vuex.Store({
  modules: {
    app,
    nav,
    login,
    dashboard,
    counter,
    register,
  },
  mutations,
  strict: debug,
  middlewares
})

// console.log(module.exports.default._modules)