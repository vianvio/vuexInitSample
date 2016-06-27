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
          <div class='col-xs-7'>{{ totalMoveCount }}</div>
        </div>
        <div class='row'>
          <div class='col-xs-5 result-title'>5分钟内次数</div>
          <div class='col-xs-7'>{{ countInPeriod }}</div>
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
      <div class='col-xs-6 down-btn-holder'>
        <button class='start-btn down-btn {{ bMoving ? "moving-btn" : "" }}' :disabled='!bStarted' @click='keepMoving'>一直在动</button>
        <div class='moving-img-holder' v-if='bMoving'>
          <img src='../../assets/moving.gif'>
        </div>
      </div>
      <div class='col-xs-6 down-btn-holder'>
        <button class='start-btn down-btn' :disabled='!bStarted || bMoving' @click='oneHit'>动了一下</button>
        <div class='moving-img-holder' v-if='bOneHit'>
          <img src='../../assets/onehit.jpg'>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { initComponent, incrementTotalCount, saveCountResult } from '../../vuex/action.js'
import clock from '../../shared/clock.vue'
import moment from 'moment'

export default {
  vuex: {
    getters: {
      totalMoveCount: ({ counter }) => counter.totalMoveCount,
    },
    actions: {
      initComponent,
      incrementTotalCount,
      saveCountResult,
    }
  },
  components: {
    clock
  },
  data() {
    return {
      timerTotal: {
        onFinish: () => {
          this.$data.bStarted = false
            // when finish, save result to localstorage, since 1 hour is long time for token.
          let results = {
            startTime: this.$data.startTime,
            totalMoveCount: this.totalMoveCount
          }
          localStorage.setItem('babyMoveCounter', JSON.stringify(results))
            // save to server
          this.saveCountResult()
        },
        onSubtract: () => {
          // check current time and the overall start time
          let secondsPassed = Math.ceil(((new Date()).getTime() - this.timerTotal.getStartTime()) / 1000) - 1
          let secondsPassedInPeriod = Math.ceil(((new Date()).getTime() - this.timerPeriod.getStartTime()) / 1000) - 1
          let secondsPassedInInterval = Math.ceil(((new Date()).getTime() - this.timerInterval.getStartTime()) / 1000) - 1
          console.log(secondsPassed)
          if (secondsPassed !== this.timerTotal.getRemainingSecond()) {
            // reset timer status, fix issue for lock screen on ipad
            if (this.$data.bMoving) {
              // if baby is in moving mode, need to calculate move counters
              // only when passed period larger then remaining sec
              if (secondsPassedInPeriod > this.timerPeriod.getRemainingSecond()) {
                // at least plus 1
                this.incrementTotalCount()
                  // maybe passed many periods
                for (let i = 0; i < Math.floor((secondsPassedInPeriod - this.timerPeriod.getRemainingSecond()) / 300); i++) {
                  this.incrementTotalCount()
                }
                // reset count in period, for reset, it always 1
                this.$data.countInPeriod = 1
              }
            }

            // reset timers
            if (secondsPassed < 3600) {
              // 1. reset total timer
              this.timerTotal.init(3600 - secondsPassed)
                // 2. reset period timer
              if (secondsPassedInPeriod > this.timerPeriod.getRemainingSecond()) {
                this.timerPeriod.init(300 - (secondsPassedInPeriod - Math.floor(secondsPassedInPeriod / 300) * 300 - this.timerPeriod.getRemainingSecond()))
              }
              // 3. reset interval timer
              if (secondsPassedInInterval > this.timerInterval.getRemainingSecond()) {
                this.timerInterval.init(60 - (secondsPassedInInterval - Math.floor(secondsPassedInInterval / 60) * 60 - this.timerInterval.getRemainingSecond()))
              }
            } else if (secondsPassed === 3600) {
              this.timerTotal.forceFinish()
            }
          }
        }
      },
      timerPeriod: {
        onFinish: () => {
          console.log('period finish')
            // init count for next period
          this.$data.countInPeriod = 0
          if (this.$data.bStarted) {
            // whenever total timer is working, call next period
            this.$data.timerPeriod.init()
            if (this.$data.bMoving) {
              // if still moving, should add 1 for count
              this.incrementTotalCount()
              this.$data.countInPeriod += 1
            }
          }
        }
      },
      timerInterval: {
        onFinish: () => {
          this.$data.bWithinInterval = false
        }
      },
      startTime: '',
      bStarted: false,
      bMoving: false,
      bOneHit: false,
      bWithinInterval: false,
      countInPeriod: 0,
    }
  },
  methods: {
    startCount() {
      // init states
      this.$data.bMoving = false
      this.$data.bOneHit = false
      this.$data.bWithinInterval = false
      this.$data.countInPeriod = 0
      this.initComponent('counter')

      this.$data.bStarted = true
      this.$data.startTime = new Date()
      this.$data.timerTotal.init()
        // start the first period
      this.$data.timerPeriod.init()
      localStorage.setItem('startTime', this.$data.startTime.getTime())
    },
    initInterval() {
      this.$data.timerInterval.init()
    },
    keepMoving() {
      this.$data.bMoving = !this.$data.bMoving;
      if (this.$data.bMoving) {
        // check if is in interval
        if (!this.$data.bWithinInterval) {
          this.$data.countInPeriod += 1
          this.incrementTotalCount()
        }
        // start moving, so no need to watch interval
        this.timerInterval.forceFinish()
      } else {
        // finish moving, start watching interval
        this.timerInterval.init()
        this.$data.bWithinInterval = true
      }
    },
    oneHit() {
      this.$data.bOneHit = true;
      if (this._onehitTimer) {
        clearTimeout(this._onehitTimer)
      }
      this._onehitTimer = setTimeout(() => this.$data.bOneHit = false, 1000)

      // if out of interval
      if (!this.$data.bWithinInterval) {
        this.$data.bWithinInterval = true
        this.$data.countInPeriod += 1
        this.incrementTotalCount()
          // start watching interval
        this.$data.timerInterval.init()
      } else {
        // within interval, if baby hits, should restart the interval
        this.$data.timerInterval.init()
      }
    }
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
  .down-btn-holder {
    text-align: center;
    padding: 5rem;
  }
  .down-btn {
    padding: 3rem 5rem;
    height: auto;
  }
  .start-btn.moving-btn {
    background-color: $dark-coffee;
  }
  .moving-img-holder {
    margin-top: 1.5rem;
  }
}
</style>
