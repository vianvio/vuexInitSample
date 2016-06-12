<template>
  <div class='nav-holder'>
    <div class='info-holder'>
      数胎动
    </div>
    <nav class='nav'>
      <a class='float-right logout-tab' @click='logoutAction' v-if='!bLoginPage' :disabled='showLoading'>
        <div class="cssload-ball cssload-ball-small" v-if="showLoading"></div>
        登出
      </a>
      <a v-link='"/dashboard"' class='float-left nav-tab' v-if='!bLoginPage' v-bind:class='route === "/dashboard" ? "current-tab": ""'>统计数据</a>
      <a v-link='"/counter"' class='float-left nav-tab' v-if='!bLoginPage' v-bind:class='route === "/counter" ? "current-tab": ""'>计数</a>
    </nav>
  </div>
</template>

<script>
import { logoutAction } from '../vuex/action.js'

export default {
  vuex:{
      getters:{
        bLoginPage: ({ app }) => app.bLoginPage,
        showLoading: ({ nav }) => nav.showLoading,
        route: ({ route }) => route.path
      },
      actions:{
        logoutAction,
      }
    },
  data() {
    return {
      
    }
  },
  methods:{
  },
  events:{
  },
  created() {
  }
};
</script>

<style lang='sass'>
@import '../variables.scss';
@import '../common.scss';

.nav-holder{
  background-color: $basic-blue;
  color: $white;
  height: $nav-height;
  border-bottom: 1px solid $shadow-dark;
  line-height: $nav-height;
  padding: 0 1.5rem;
  overflow: hidden;
  .logout-tab {
    padding: 2.9rem 0.5rem 0.5rem 0.5rem;
    line-height: 2rem;
    color: $white;
    cursor: pointer;
    margin: 0 3rem;
    &:hover{
      color: $white;
      border-bottom: 2px solid $white;
    }
  }
}

.info-holder{ 
  text-align: center;
  float: left;
  font-size: 2.5rem;
  margin-right: 5rem;
}

.nav-tab {
  font-size: 1.6rem;
  color: $white;
  cursor: pointer;
  padding: 0 3rem;
  &:hover {
    color: $white;
    background-color: $basic-green;
  }
}

.nav .current-tab {
  color: $white;
  background-color: $basic-green;
}

</style>