import Vue from 'vue'
import * as types from './mutation-types'

export const changeSomething = ({ dispatch }) => {
  dispatch(types.CHANGE, '名字改啦', {
    content: '里面都没啦',
    random: Math.floor(Math.random() * 100)
  })
}
