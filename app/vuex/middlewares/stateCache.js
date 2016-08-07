import Vue from 'vue'

function deepClone(obj) {
  if (Array.isArray(obj)) {
    return obj.map(deepClone)
  } else if (obj && typeof obj === 'object') {
    var cloned = {}
    var keys = Object.keys(obj)
    for (var i = 0, l = keys.length; i < l; i++) {
      var key = keys[i]
      cloned[key] = deepClone(obj[key])
    }
    return cloned
  } else {
    return obj
  }
}

const commonMutations = {
  INIT_STATE(state, moduleName) {
    state[moduleName] = deepClone(state.cache[moduleName])
  },
  CACHE_STATE(state, moduleName, newState) {
    state.cache[moduleName] = deepClone(newState)
  },
}

const commonActions = {
  initComponent({ dispatch }, name) {
    dispatch('INIT_STATE', name)
  },
  changeCacheState(store, module, state = store._vm[module]) {
    store.dispatch('CACHE_STATE', module, state)
  }
}

export default {
  onInit(state, store) {
    // hot load common mutations
    store.hotUpdate({
      mutations: commonMutations
    })
    // cache init state
    store._setupModuleState(state, {
        cache: {
          state: deepClone(state)
        }
      })
      // mixin all actions to the root vm
    Vue.mixin({
      vuex: {
        actions: commonActions
      }
    })
  }
}
