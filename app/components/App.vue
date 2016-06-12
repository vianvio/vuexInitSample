<template>
  <div class='page-loading' v-show='bLoading'>
    <div class='cssload-ball'></div>
  </div>
  <navbar></navbar>
  <router-view></router-view>
</template>
<script>
import navbar from '../shared/navbar.vue'
import store from '../vuex/store.js'

export default {
  store,
  vuex: {
    getters: {
      bLoading: ({
        app
      }) => app.bLoading,
    },
    actions: {}
  },
  components: {
    navbar,
  },
  data() {
    return {}
  },
  events: {},
  replace: false
}
</script>
<style lang='sass'>
@import '../variables.scss';
@import '../common.scss';
@import '../index.scss';
@import '../../node_modules/bootstrap/dist/css/bootstrap.css';
</style>
