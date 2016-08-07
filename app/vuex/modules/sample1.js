import {
  CHANGE
} from '../mutation-types'

// initial state
let state = {
  nickName: '磐冲',
  detail: {
    job: '前端',
    workPlace: {
      city: '杭州',
      location: '西溪园区'
    }
  }
}

// mutations
let mutations = {
  [CHANGE](state, name, innerObj) {
    state.nickName = name
    state.detail.workPlace = innerObj
  }
}

export default {
  state,
  mutations
}
