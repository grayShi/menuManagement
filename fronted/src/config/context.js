/*
 * @Date: 2021-06-10 23:20:58
 * @LastEditTime: 2021-06-10 23:40:34
 */
import { createContext } from 'react'

export const SHOW_LOADING = 'show loading mask'
export const HIDE_LOADING = 'hide loading mask'
export const CLEAR_LOADING = 'clear loading mask'
export const PageContext = createContext({})
PageContext.displayName = 'loadingMask'

export const Reducer = (state, action) => {
  switch (action) {
    case SHOW_LOADING:
      return state + 1
    case HIDE_LOADING:
      return state > 0 ? state - 1 : 0
    case CLEAR_LOADING:
      return 0
    default:
      return state
  }
}
