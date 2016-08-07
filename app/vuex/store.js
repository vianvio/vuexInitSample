import Vuex from 'vuex'
import Vue from 'vue'
import middlewares from './middlewares'
import * as types from './mutation-types'
import sample1 from './modules/sample1'

const debug = process.env.NODE_ENV !== 'production'

Vue.use(Vuex)
Vue.config.debug = debug
Vue.config.warnExpressionErrors = debug


let vuexStore = new Vuex.Store({
  modules: {
    sample1,
  },
  strict: debug,
  middlewares
})

export default vuexStore
