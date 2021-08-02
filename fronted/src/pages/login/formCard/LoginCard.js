/*
 * @Date: 2021-06-12 20:09:04
 * @LastEditTime: 2021-06-13 14:46:38
 */
import React, { useState, useEffect, useRef } from 'react'
import { Card, Input, Button, Spin, Form, message } from 'antd'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import axios from 'axios'
import md5 from 'js-md5'
import VerificationCode from '@components/VerificationCode'
import '@style/pages/login.less'
import servicePath from '@config/api'

const LoginCard = (props) => {
  const codeRef = useRef()
  const history = useHistory()
  const [form] = Form.useForm()
  const { t } = useTranslation()
  const [needVerificationCode, setNeedVerificationCode] = useState(false)
  const [loginCount, setLoginCount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    localStorage.removeItem('isLogin')
    localStorage.removeItem('userId')
    localStorage.removeItem('username')
    localStorage.removeItem('restaurantId')
    if (localStorage.getItem('verificationCode')) {
      setNeedVerificationCode(true)
    }
  }, [])

  const validateCode = (inputCode) => {
    const verificationCode = codeRef.current.getShowNumber()
    if (inputCode === verificationCode.join('')) {
      return true
    }
    message.error(t('验证码错误'))
    codeRef.current.drawCanvas()
    return false
  }

  const loginSystem = (value) => {
    if (
      (needVerificationCode && validateCode(value.verificationCode)) ||
      !needVerificationCode
    ) {
      setIsLoading(true)
      const loginForm = {
        username: value.username,
        password: md5(value.password)
      }
      axios({
        ...servicePath.login,
        data: loginForm
      })
        .then((res) => {
          if (res.data.success) {
            const { data } = res.data
            localStorage.removeItem('verificationCode')
            localStorage.setItem('isLogin', 1)
            localStorage.setItem('userId', data.id)
            localStorage.setItem('username', data.username)
            localStorage.setItem('restaurantId', data.restaurantId)
            history.push({
              pathname: '/home'
            })
          } else {
            message.error(t(res.data.message || '登陆失败'))
            if (!needVerificationCode) {
              setLoginCount(loginCount + 1)
              if (loginCount >= 3) {
                localStorage.setItem('verificationCode', 1)
                setNeedVerificationCode(true)
              }
            } else {
              codeRef.current.drawCanvas()
            }
          }
        })
        .catch((err) => {
          console.log(err)
          message.error(t('登陆失败,请联系管理员'))
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
  }

  const gotoRegister = () => {
    form.resetFields()
    props.gotoRegister()
  }

  const formRules = {
    username: [{ required: true, message: t('请输入用户名') }],
    password: [{ required: true, message: t('请输入密码') }],
    verificationCode: [
      { required: needVerificationCode, message: t('请输入验证码') }
    ]
  }

  return (
    <Spin spinning={isLoading}>
      <Card bordered>
        <div className="login-icon">
          <img src="/image/img_logo.png" alt="logo" />
        </div>
        <div className="login-title">{t('餐厅后台管理系统')}</div>
        <div className="login-sub-title">{t('高效，便捷，易操作')}</div>
        <Form name="login-form" onFinish={loginSystem} form={form}>
          <Form.Item name="username" rules={formRules.username}>
            <Input
              placeholder={t('请输入用户名')}
              size="large"
              prefix={<UserOutlined className="site-form-item-icon" />}
            />
          </Form.Item>
          <Form.Item name="password" rules={formRules.password}>
            <Input.Password
              placeholder={t('请输入密码')}
              size="large"
              autoComplete="off"
              prefix={<LockOutlined className="site-form-item-icon" />}
            />
          </Form.Item>
          {needVerificationCode && (
            <Form.Item
              name="verificationCode"
              rules={formRules.verificationCode}
            >
              <div className="login-input login-code">
                <Input
                  size="large"
                  placeholder={t('请输入验证码')}
                  className="login-code-input"
                />

                <VerificationCode
                  ref={codeRef}
                  canvasWidth={120}
                  canvasHeight={40}
                />
              </div>
            </Form.Item>
          )}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className="login-form-button"
            >
              {t('登录')}
            </Button>
          </Form.Item>
          <Form.Item className="login-form-goto-sign">
            没有账号?
            <Button type="link" htmlType="button" onClick={gotoRegister}>
              {t('去注册')}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Spin>
  )
}

export default LoginCard
