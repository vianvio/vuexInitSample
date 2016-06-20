import createLogger from 'vuex/logger'

const myMiddleware = {
  onInit(state, store) {
    // record initial state
    // check user login status
    // let userName = sessionStorage.getItem('userName')
    // if (!!userName) {
    //   afterLogin(store.dispatch, userName)
    // }
  },
  onMutation(mutation, state, store) {
    // called after every mutation.
    // The mutation comes in the format of { type, payload }
  }
}

export default process.env.NODE_ENV !== 'production' ? [createLogger(), myMiddleware] : [myMiddleware]
