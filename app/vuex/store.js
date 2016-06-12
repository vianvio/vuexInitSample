import Vuex from 'vuex'
import Vue from 'vue'
import middlewares from './middlewares'
import * as type from './mutation-types'
import app from './modules/app'
import nav from './modules/nav'
import login from './modules/login'
import dashboard from './modules/dashboard'

const debug = process.env.NODE_ENV !== 'production'

Vue.use(Vuex)
Vue.config.debug = debug
Vue.config.warnExpressionErrors = debug

const mutations = {
  [type.INIT_STATE] (state, moduleName) {
    state[moduleName] = { ...module.exports.default._modules[moduleName].state }
  }
}

export default new Vuex.Store({
  modules: {
    app,
    nav,
    login,
    dashboard
  },
  mutations,
  strict: debug,
  middlewares
})

// console.log(module.exports.default._modules)