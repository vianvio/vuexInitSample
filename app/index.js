import Vue from 'vue'
import Router from 'vue-router'
import Resource from'vue-resource'
import { sync } from 'vuex-router-sync'
import VueValidator from 'vue-validator'

Vue.use(Router)
Vue.use(Resource)
Vue.use(VueValidator)

// components
import App from './components/App.vue'
import Login from './components/Login/Login.vue'
import Upload from './components/Upload/Upload.vue'
import Tree from './components/Tree/Tree.vue'
// model
import store from './vuex/store.js'

// routing
var router = new Router()

router.map({
  '/login': {
    component: Login
  },
  '/upload': {
    component: Upload
  },
  '/tree': {
    component: Tree
  }
})

router.beforeEach(function() {
  window.scrollTo(0, 0)
})

router.redirect({
  '*': '/upload'
})

sync(store, router)
router.start(App, 'body')

Vue.config.debug = true

Vue.http.interceptors.push({
  request: function(request) {
  	Vue.http.headers.common['Authorization'] = sessionStorage.getItem('token')
    return request
  },
  response: function(response) {
    if (response.status === 401) {
      router.go('/login')
    }
    return response
  }
});