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
      currentTime: undefined,
      remainingSecond: 0,
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
    Object.assign(this.ref, {
      init: () => {
        if (this._timer) {
          clearInterval(this._timer)
        }
        // duration is seconds
        this.currentTime = moment().hour(0).minute(0).second(0).add(this.duration, 'second')
          // make it easier to stop
        this.remainingSecond = this.duration
        this._timer = setInterval(() => {
          // should be less then 1, otherwise will be 1 sec more then duration
          if (this.remainingSecond <= 1) {
            clearInterval(this._timer)
            this.ref.onFinish()
          } else {
            this.currentTime = moment(this.currentTime).subtract(1, 'second')
            this.remainingSecond = this.remainingSecond - 1
          }
        }, 1000)
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
