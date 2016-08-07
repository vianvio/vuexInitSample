<template>
  <div class='half'>
    案例1
    <div class="code-holder">
      {{{sample1 | jsFormat}}}
    </div>
    <button class='btn' @click='changeSomething'>改变一下内容</button>
    <button class='btn' @click='initComponent("sample1")'>初始化一下</button>
    <button class='btn' @click='changeCacheState("sample1")'>保存当前状态</button>
  </div>
  <div class='half'>
    状态缓存
    <div class="code-holder">
      {{{cache | jsFormat}}}
    </div>
  </div>
</template>
<script>
import store from '../vuex/store'
import { changeSomething } from '../vuex/action'

export default {
  store,
  vuex: {
    getters: {
      sample1: ({ sample1 }) => sample1,
      cache: ({ cache }) => cache,
    },
    actions: {
      changeSomething,
    }
  },
  components: {

  },
  data() {
    return {}
  },
  filters: {
    jsFormat: (obj) => {
      return obj && JSON.stringify(obj).replace(/,/g, ',<br/>').replace(/{/g, ' {<div class="space">').replace(/}/g, '<div class="minus-space">}')
    }
  },
  replace: false
}
</script>
<style lang='sass'>
@import '../variables.scss';
@import '../common.scss';
@import '../index.scss';
@import '../../node_modules/bootstrap/dist/css/bootstrap.css';
.space {
  padding-left: 2rem;
}

.minus-space {
  margin-left: -2rem;
}

.code-holder {
  margin: 1rem 0;
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: $light-dark;
  border: 1px solid $shadow-dark;
}

.half {
  width: 50%;
  padding: 1rem;
  float: left;
}

.btn {
  @extend %btn;
  border: 1px solid $basic-blue;
  background-color: transparent;
  color: $basic-blue !important;
  &:hover {
    background-color: $basic-blue;
    color: $white !important;
  }
}
</style>
