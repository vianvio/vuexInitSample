import {
  SET_START_TIME
} from '../mutation-types'

// initial state
const state = {
  startTime: undefined
}

// mutations
const mutations = {
  [SET_START_TIME] (state, datetime) { state.startTime = datetime }
}

export default {
  state,
  mutations
}
