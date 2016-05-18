import {
  SET_UPLOAD_FILE_INFO_LIST,
  SET_UPLOAD_LOADING_FLAG,
  SET_UPLOAD_PROGRESS,
  SET_RESULT_MESSAGE,
} from '../mutation-types'

// initial state
const state = {
  name: '',
  percentage: 0,
  showLoading: false,
  size: '',
  successMessage: '',
  errorMessage: '',
  dataFileInfo: {
    name: '',
    size: ''
  }
}

// mutations
const mutations = {
  [SET_UPLOAD_FILE_INFO_LIST](state, {datafile}) { 
    state.dataFileInfo = datafile 
  },
  [SET_UPLOAD_LOADING_FLAG](state, flag) { state.showLoading = flag },
  [SET_UPLOAD_PROGRESS](state, percentage) { state.percentage = percentage },
  [SET_RESULT_MESSAGE](state, messageType, message) { state[messageType] = message },
}

export default {
  state,
  mutations
}
