import Vue from 'vue'
import Router from 'vue-router'
import Resource from'vue-resource'
import { sync } from 'vuex-router-sync'

Vue.use(Router)
Vue.use(Resource)

// components
import App from './components/App.vue'
import Login from './components/Login/Login.vue'
import Dashboard from './components/Dashboard/Dashboard.vue'
import Counter from './components/Counter/Counter.vue'
// model
import store from './vuex/store.js'

// routing
var router = new Router()

router.map({
  '/login': {
    component: Login
  },
  '/dashboard': {
    component: Dashboard
  },
  '/counter': {
    component: Counter
  }
})

router.beforeEach(function() {
  window.scrollTo(0, 0)
})

router.redirect({
  '*': '/login'
})

sync(store, router)
router.start(App, 'body')

Vue.config.debug = true

Vue.http.interceptors.push({
  request: function(request) {
  	Vue.http.headers.common['Authorization'] = 'JWT' + sessionStorage.getItem('token')
    return request
  },
  response: function(response) {
    if (response.status === 401) {
      router.go('/login')
    }
    return response
  }
});