import createLogger from 'vuex/logger'
import stateCache from './middlewares/stateCache'

export default process.env.NODE_ENV !== 'production' ? [createLogger(), stateCache] : [stateCache]
