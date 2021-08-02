/*
 * @Date: 2021-06-10 23:20:58
 * @LastEditTime: 2021-06-13 18:27:24
 */
import React from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import { message } from 'antd'
import { useTranslation } from 'react-i18next'

axios.defaults.withCredentials = true

const AxiosConfig = (props) => {
  const { t } = useTranslation()

  axios.interceptors.request.use(
    (config) => config,
    (error) => Promise.reject(error)
  )
  axios.interceptors.response.use(
    (response) => {
      if (response.data.notLogin) {
        // message.error(t('请重新登录'))
        localStorage.removeItem('isLogin')
        localStorage.removeItem('userId')
        localStorage.removeItem('userName')
        props.history.push({ pathname: '/login' })
      }
      return response
    },
    (error) => Promise.reject(error)
  )
  return <></>
}

export default withRouter(AxiosConfig)
