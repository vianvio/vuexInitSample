import Vue from 'vue'

// components
import App from './components/App.vue'
// model
import store from './vuex/store'

var app = new Vue(App).$mount('body')
