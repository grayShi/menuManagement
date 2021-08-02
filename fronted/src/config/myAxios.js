/*
 * @Date: 2021-06-12 16:14:16
 * @LastEditTime: 2021-06-14 22:18:51
 */
import { SHOW_LOADING, HIDE_LOADING } from '@config/context'
import axios from 'axios'

const myAxios = (
  searchParams,
  successCallback = () => {},
  errorCallback = () => {},
  pageContext
) => {
  if (pageContext) {
    pageContext.dispatchLoading(SHOW_LOADING)
  }
  return axios(searchParams)
    .then((res) => successCallback(res))
    .catch((err) => {
      console.log(err)
      errorCallback(err)
    })
    .finally(() => {
      if (pageContext) {
        pageContext.dispatchLoading(HIDE_LOADING)
      }
    })
}

export default myAxios
