<template>
  <div class='clock-holder'>
    {{ currentTime | moment }}
  </div>
</template>
<script>
import moment from 'moment'

export default {
  props: {
    duration: {
      type: Number,
      default: 0
    },
    ref: {
      type: Object,
      twoWay: true
    }
  },
  data() {
    return {
      currentTime: moment().hour(0).minute(0).second(0),
      remainingSecond: 0,
      startTime: '',
    }
  },
  methods: {},
  events: {},
  filters: {
    moment: (date) => {
      return moment(date).format('HH:mm:ss');
    }
  },
  created() {
    // cannot use default for ref, {} is not undefined
    this.ref && Object.assign(this.ref, {
      init: (duration) => {
        if (!!duration) {
          this.duration = duration
        }
        if (this._timer) {
          clearInterval(this._timer)
        }
        // duration is seconds
        this.startTime = (new Date()).getTime()
        this.currentTime = moment().hour(0).minute(0).second(0).add(this.duration, 'second')
          // make it easier to stop
          // should minus 1, otherwise will be 1 sec more then duration
        this.remainingSecond = this.duration - 1
        this._timer = setInterval(() => {
          if (this.remainingSecond <= 0) {
            clearInterval(this._timer)
              // last change of time
            this.currentTime = moment(this.currentTime).subtract(1, 'second')
            this.ref.onFinish && this.ref.onFinish()
          } else {
            this.currentTime = moment(this.currentTime).subtract(1, 'second')
            this.remainingSecond = this.remainingSecond - 1
            this.ref.onSubtract && this.ref.onSubtract()
          }
        }, 1000)
      },
      forceFinish: () => {
        if (this._timer) {
          clearInterval(this._timer)
          this.currentTime = moment().hour(0).minute(0).second(0)
          this.ref.onFinish && this.ref.onFinish()
        }
      },
      getStartTime: () => {
        return this.startTime
      },
      getRemainingSecond: () => {
        return this.remainingSecond
      }
    })
  }
};
</script>
<style lang='sass'>
@import '../variables.scss';
@import '../common.scss';
.clock-holder {}
</style>
