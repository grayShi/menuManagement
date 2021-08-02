/*
 * @Date: 2021-06-12 20:09:13
 * @LastEditTime: 2021-06-12 22:14:11
 */
import React, { useState } from 'react'
import { Card, Input, Button, Spin, Form, Upload, message } from 'antd'
import { useTranslation } from 'react-i18next'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import servicePath from '@config/api'
import md5 from 'js-md5'
import axios from 'axios'

const RegisterCard = (props) => {
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 }
  }
  const tailLayout = {
    wrapperCol: { span: 24 }
  }
  const { t } = useTranslation()
  const [form] = Form.useForm()

  const [isLoading, setIsLoading] = useState(false)
  const [uploadLoading, setUploadLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState('')

  const registerSystem = (values) => {
    if (!imageUrl) {
      message.error('请上传图片')
      return
    }
    form.validateFields().then(() => {
      setIsLoading(true)
      axios({
        ...servicePath.registerUser,
        data: {
          username: values.username,
          password: md5(values.password),
          restaurantForm: {
            restaurantName: values.restaurantName,
            subName: values.restaurantSubName,
            restaurantLogoUri: imageUrl
          }
        }
      })
        .then((res) => {
          if (res.data.success) {
            message.success('注册成功,前往登录')
            gotoLogin()
          } else {
            message.error(res.data.message)
          }
        })
        .catch((err) => {
          console.log(err)
          message.error(t('注册失败,请联系管理员'))
        })
        .finally(() => {
          setIsLoading(false)
        })
    })
  }

  const gotoLogin = () => {
    form.resetFields()
    setImageUrl('')
    props.gotoLogin()
  }

  const beforeUpload = (file) => {
    const isJpgOrPng =
      file.type === 'image/jpg' ||
      file.type === 'image/jpeg' ||
      file.type === 'image/png'
    if (!isJpgOrPng) {
      message.error('只能上传jpg/jpeg/png格式的图片')
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error('图片格式不能超过2M')
    }
    return isJpgOrPng && isLt2M
  }

  const handleChangeImage = (info) => {
    if (info.file.status === 'uploading') {
      setUploadLoading(true)
      return
    }
    if (info.file.status === 'done') {
      setImageUrl(info.file.response.data.image)
      setUploadLoading(false)
    }
    if (info.file.status === 'error') {
      setUploadLoading(false)
      message.error('上传失败,请重试')
    }
  }

  const formRules = {
    username: [{ required: true, message: t('请输入用户名') }],
    password: [{ required: true, message: t('请输入密码') }],
    repeatPassword: [
      { required: true, message: t('请重复输入密码') },
      ({ getFieldValue }) => ({
        validator(_, value) {
          if (!value || getFieldValue('password') === value) {
            return Promise.resolve()
          }
          return Promise.reject(new Error('两次密码输入不同'))
        }
      })
    ],
    restaurantName: [{ required: true, message: t('请输入餐厅名字') }],
    restaurantSubName: [{ required: true, message: t('请输入餐厅详细名字') }]
  }

  const uploadButton = (
    <div>
      {uploadLoading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  )

  return (
    <Spin spinning={isLoading}>
      <Card bordered className="register-card">
        <div className="login-icon">
          <img src="/image/img_logo.png" alt="logo" />
        </div>
        <div className="login-title">{t('餐厅后台管理系统')}</div>
        <div className="login-sub-title">{t('高效，便捷，易操作')}</div>
        <Form
          name="register-form"
          onFinish={registerSystem}
          form={form}
          {...layout}
        >
          <div className="register-form">
            <div className="left-form">
              <p className="register-info">
                <span className="register-title">用户信息</span>
              </p>
              <Form.Item
                label="用户名"
                name="username"
                rules={formRules.username}
              >
                <Input placeholder={t('请输入用户名')} size="large" />
              </Form.Item>
              <Form.Item
                label="密码"
                name="password"
                rules={formRules.password}
              >
                <Input.Password
                  placeholder={t('请输入密码')}
                  size="large"
                  autoComplete="off"
                />
              </Form.Item>
              <Form.Item
                label="重复密码"
                name="repeatPassword"
                rules={formRules.repeatPassword}
              >
                <Input.Password
                  placeholder={t('请重复输入密码')}
                  size="large"
                  autoComplete="off"
                />
              </Form.Item>
            </div>
            <div className="right-form">
              <p className="register-info">
                <span className="register-title">餐厅信息</span>
                <span className="register-subtitle">
                  后续可继续添加其他餐厅信息
                </span>
              </p>
              <Form.Item
                label="餐厅名字"
                name="restaurantName"
                rules={formRules.restaurantName}
              >
                <Input
                  placeholder={t('请输入餐厅名字')}
                  size="large"
                  autoComplete="off"
                />
              </Form.Item>
              <Form.Item
                label="详细名字"
                name="restaurantSubName"
                rules={formRules.restaurantSubName}
              >
                <Input
                  placeholder={t('请输入餐厅详细名字')}
                  size="large"
                  autoComplete="off"
                />
              </Form.Item>
              <Form.Item label="上传图片">
                <Upload
                  name="image"
                  listType="picture-card"
                  showUploadList={false}
                  action="/api/file/uploadFile"
                  beforeUpload={beforeUpload}
                  onChange={handleChangeImage}
                >
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt="上传图片"
                      className="upload-image-show"
                    />
                  ) : (
                    uploadButton
                  )}
                </Upload>
              </Form.Item>
            </div>
          </div>

          <Form.Item {...tailLayout} className="btn-form">
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className="login-form-button"
            >
              {t('注册')}
            </Button>
          </Form.Item>
          <Form.Item className="login-form-goto-sign" {...tailLayout}>
            已有账号?
            <Button type="link" htmlType="button" onClick={gotoLogin}>
              {t('去登录')}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Spin>
  )
}

export default RegisterCard
