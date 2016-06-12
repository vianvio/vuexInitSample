<template>
  <div class='counter-holder container-fluid'>
    <div class='up-holder row'>
      <div class='result-holder col-xs-4 col-xs-offset-1'>
        <div class='row'>
          <div class='col-xs-5 result-title'>开始时间</div>
          <div class='col-xs-7'></div>
        </div>
        <div class='row'>
          <div class='col-xs-5 result-title'>时间间隔</div>
          <div class='col-xs-7'>5分钟</div>
        </div>
        <div class='row'>
          <div class='col-xs-5 result-title'>最小间隔</div>
          <div class='col-xs-7'>1分钟</div>
        </div>
        <hr/>
        <div class='row'>
          <div class='col-xs-5 result-title'>胎动总数</div>
          <div class='col-xs-7'></div>
        </div>
        <div class='row'>
          <div class='col-xs-5 result-title'>5分钟内次数</div>
          <div class='col-xs-7'></div>
        </div>
      </div>
      <div class='col-xs-6 col-xs-offset-1'>
        <div class='col-xs-6'>
          <clock :ref.sync='timerTotal' :duration='10'></clock>
        </div>
        <div class='col-xs-6'>timer2</div>
      </div>
    </div>
    <div class='down-holder'>
      <button @click='testTimer'>一直在动</button>
      <button>动了一下</button>
    </div>
  </div>
</template>
<script>
import { initComponent } from '../../vuex/action.js'
import clock from '../../shared/clock.vue'

export default {
  vuex: {
    getters: {

    },
    actions: {
      initComponent
    }
  },
  components: {
    clock
  },
  data() {
    return {
      timerTotal: {
        onFinish: ()=>{
          console.log('finished')
        }
      }
    }
  },
  methods: {
    testTimer() {
      this.$data.timerTotal.init()
    }
  },
  filters: {

  },
  route: {
    data() {
      this.initComponent('counter')
    }
  }
}
</script>
<style lang='sass'>
@import '../../variables.scss';
@import '../../common.scss';
.counter-holder {
  padding-top: 1.5rem;
  .result-holder {
    @extend %material-shadow;
    padding: 1.5rem;
    .row {
      margin: 0.5rem 0;
    }
    .result-title {
      text-align: right;
    }
  }
}
</style>
