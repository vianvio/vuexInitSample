import {
  INCREMENT_TOTAL_COUNT
} from '../mutation-types'

// initial state
const state = {
  totalMoveCount: 0
}

// mutations
const mutations = {
  [INCREMENT_TOTAL_COUNT](state) { state.totalMoveCount += 1 }
}

export default {
  state,
  mutations
}
