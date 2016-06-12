<template>
  <div class='counter-holder container-fluid'>
    <div class='up-holder row'>
      <div class='result-holder'>
        <div class='row'>
          <div class='col-xs-5 result-title'>开始时间</div>
          <div class='col-xs-7'>{{ startTime | moment}}</div>
        </div>
        <div class='row'>
          <div class='col-xs-5 result-title'>剩余时间</div>
          <div class='col-xs-7'>
            <clock class='timer-total-color' :ref.sync='timerTotal' :duration='3600'></clock>
          </div>
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
        <div class='row'>
          <button class='start-btn pull-right' @click='startCount'>开始记时</button>
        </div>
      </div>
      <div class='timer-holder'>
        <div class='timer-border'>
          <clock :ref.sync='timerPeriod' :duration='300'></clock>
        </div>
      </div>
      <div class='timer-holder'>
        <div class='timer-border'>
          <clock :ref.sync='timerInterval' :duration='60'></clock>
        </div>
      </div>
    </div>
    <div class='down-holder'>
      <button>一直在动</button>
      <button @click='initInterval'>动了一下</button>
    </div>
  </div>
</template>
<script>
import { initComponent, setStartTime } from '../../vuex/action.js'
import clock from '../../shared/clock.vue'
import moment from 'moment'

export default {
  vuex: {
    getters: {
      startTime: ({ counter }) => counter.startTime
    },
    actions: {
      initComponent,
      setStartTime,
    }
  },
  components: {
    clock
  },
  data() {
    return {
      timerTotal: {
        onFinish: () => {
          console.log('finished')
        }
      },
      timerPeriod: {
        onFinish: () => {
          console.log('period finish')
        }
      },
      timerInterval: {

      }
    }
  },
  methods: {
    startCount() {
      this.setStartTime()
      this.$data.timerTotal.init()
    },
    initInterval() {
      this.$data.timerInterval.init()
    }

    // when finish, save result to localstorage, since 1 hour is long time for token.
  },
  filters: {
    moment: (date) => {
      return date ? moment(date).format('MMM-DD HH:mm:ss') : '';
    }
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
  .up-holder {
    display: table;
    width: 100%;
    padding-left: 5%;
  }
  .start-btn {
    @extend %btn;
    background-color: $basic-blue;
    color: $white;
  }
  .result-holder {
    display: table-cell;
    width: 45%;
    @extend %material-shadow;
    padding: 1.5rem;
    .row {
      margin: 0.5rem 0;
    }
    .result-title {
      text-align: right;
    }
    .timer-total-color {
      color: $dark-coffee;
    }
  }
  .timer-holder {
    display: table-cell;
    width: 22%;
    text-align: center;
    vertical-align: middle;
    padding-left: 3%;
    .timer-border {
      border-radius: 1rem;
      border: 1px solid $shadow-dark;
      padding: 5rem 0;
      .clock-holder {
        font-size: 3rem;
        color: $dark-coffee;
      }
    }
  }
}
</style>
