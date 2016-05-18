import Vue from 'vue'
import * as types from './mutation-types'

export const setLoginFlag = ({ dispatch }, flag) => {
  dispatch(types.SET_LOGIN_FLAG, flag)
}

export const loginAction = ({ dispatch, router }, loginObj) => {
  dispatch(types.SET_LOGIN_LOADING_FLAG, true)
    // loginObj.pwd = window.btoa(loginObj.pwd)
  Vue.http.post('/api/userModels/login', loginObj).then(function(resp) {
    dispatch(types.SET_LOGIN_LOADING_FLAG, false)
    Vue.http.headers.common['Authorization'] = resp.data.id;
    sessionStorage.clear();
    sessionStorage.setItem('token', resp.data.id);
    sessionStorage.setItem('userId', resp.data.userId);
    sessionStorage.setItem('userName', resp.data.userName);
    router.go('/upload')
  }, function(err) {
    dispatch(types.SET_LOGIN_LOADING_FLAG, false)
  })
}

export const updateUploadList = ({ dispatch }, fileInfoObject) => {
  dispatch(types.SET_UPLOAD_FILE_INFO_LIST, fileInfoObject)
}

export const uploadFile = ({ dispatch }, { datafile }, { recordId, type }) => {
  dispatch(types.SET_UPLOAD_LOADING_FLAG, true)

  // create form data
  let formData = new FormData()
  formData.append("files", datafile)

  formData.append("recordId", recordId)
  formData.append("type", type)

  Vue.http.headers.common['Content-Type'] = 'multipart/form-data'
  Vue.http.post('/api/containers/babyRecord/upload', formData, {
    upload: {
      onprogress: function(event) {
        // progress callback
        if (event.lengthComputable) {
          var percentComplete = Math.round(event.loaded * 100 / event.total);
          dispatch(types.SET_UPLOAD_PROGRESS, percentComplete)
        } else {
          console.warn('cannot calculate upload progress')
          dispatch(types.SET_UPLOAD_PROGRESS, 0)
        }
      }
    }
  }).then(function(res) {
    Vue.http.headers.common['Content-Type'] = 'application/json'
    dispatch(types.SET_UPLOAD_LOADING_FLAG, false)
    dispatch(types.SET_RESULT_MESSAGE, 'successMessage', 'Success')
  }, function(err) {
    Vue.http.headers.common['Content-Type'] = 'application/json'
    dispatch(types.SET_UPLOAD_LOADING_FLAG, false)
    dispatch(types.SET_UPLOAD_PROGRESS, 0)
    dispatch(types.SET_RESULT_MESSAGE, 'errorMessage', err.data.error.message)
  })
}
