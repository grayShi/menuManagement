/*
 * @Date: 2021-06-13 20:04:48
 * @LastEditTime: 2021-06-15 00:56:45
 */
import React, { useState, useEffect, useContext } from 'react'
import {
  Button,
  PageHeader,
  Table,
  Modal,
  Form,
  Input,
  InputNumber,
  message
} from 'antd'
import md5 from 'js-md5'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import '@style/pages/staff.less'
import myAxios from '@config/myAxios'
import { PageContext } from '@config/context'
import servicePath from '@config/api'

const { confirm } = Modal

const Staff = () => {
  const [form] = Form.useForm()
  const pageContext = useContext(PageContext)
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 }
  }
  const columns = [
    {
      title: '编号',
      dataIndex: 'index',
      render: (index) => (pagination.current - 1) * pagination.pageSize + index
    },
    {
      title: '用户名',
      dataIndex: 'username'
    },
    {
      title: '操作',
      key: 'action',
      width: '20%',
      render: (text, record) => (
        <>
          <Button type="link" onClick={() => handleEdit(record.id)}>
            编辑
          </Button>
          {`${record.id}` !== localStorage.getItem('userId') && (
            <Button type="link" onClick={() => handleDelete(record.id)}>
              删除
            </Button>
          )}
        </>
      )
    }
  ]

  const [tableData, setTableData] = useState([])
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10
  })
  const [editId, setEditId] = useState()
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    handleTableChange(pagination)
  }, [])

  const handleTableChange = (pageConfig) => {
    myAxios(
      {
        ...servicePath.getAllUser,
        params: {
          restaurantId: localStorage.getItem('restaurantId'),
          current: pageConfig.current,
          pageSize: pageConfig.pageSize
        }
      },
      (res) => {
        if (res.data.success) {
          const { list, totalData } = res.data.data
          setTableData(
            list.map((item, index) => ({
              id: item.id,
              index: index + 1,
              username: item.username
            }))
          )
          setPagination({
            ...pageConfig,
            total: totalData
          })
        } else {
          message.error(res.data.message)
        }
      },
      () => {
        message.error('查询信息失败,请联系管理员')
      },
      pageContext
    )
  }

  const handleAdd = () => {
    setShowModal(true)
  }

  const handleEdit = (id) => {
    myAxios(
      {
        ...servicePath.getUserById,
        params: {
          id
        }
      },
      (res) => {
        if (res.data.success) {
          const { data } = res.data
          form.setFieldsValue({
            username: data.username
          })
          setShowModal(true)
          setEditId(id)
        } else {
          message.error(res.data.message)
        }
      },
      () => {
        message.error('查询信息失败,请联系管理员')
      },
      pageContext
    )
  }

  const handleDelete = (id) => {
    confirm({
      title: '确定要删除吗?',
      icon: <ExclamationCircleOutlined />,
      cancelText: '取消',
      okText: '确定',
      onOk() {
        myAxios(
          {
            ...servicePath.deleteUserById,
            params: {
              id,
              restaurantId: localStorage.getItem('restaurantId')
            }
          },
          (res) => {
            if (res.data.success) {
              message.success('删除成功')
              handleTableChange(pagination)
            } else {
              message.error(res.data.message)
              return Promise.reject()
            }
          },
          () => {
            message.error('删除失败,请联系管理员')
            return Promise.reject()
          },
          pageContext
        )
      }
    })
  }

  const handleCancel = () => {
    form.resetFields()
    setEditId()
    setShowModal(false)
  }

  const handleSave = () => {
    form.validateFields().then(() => {
      const formValue = form.getFieldsValue()
      myAxios(
        {
          ...servicePath.operateUser,
          data: {
            id: editId,
            username: formValue.username,
            password: formValue.password && md5(formValue.password),
            restaurantId: localStorage.getItem('restaurantId')
          }
        },
        (res) => {
          if (res.data.success) {
            message.success('保存成功')
            handleCancel()
            handleTableChange(pagination)
          } else {
            message.error(res.data.message)
          }
        },
        () => {
          message.error('保存失败,请联系管理员')
        },
        pageContext
      )
    })
  }

  const formRules = {
    username: [{ required: true, message: '请输入用户名' }],
    password: [{ required: !editId, message: '请输入密码' }],
    repeatPassword: [
      { required: !editId, message: '请重复输入密码' },
      ({ getFieldValue }) => ({
        validator(_, value) {
          if (!value || getFieldValue('password') === value) {
            return Promise.resolve()
          }
          return Promise.reject(new Error('两次密码输入不同'))
        }
      })
    ]
  }

  return (
    <div className="desk-container">
      <PageHeader className="site-page-header" title="员工管理" />
      <div className="table-body">
        <div className="table-operate">
          <Button type="primary" onClick={handleAdd}>
            新增
          </Button>
        </div>
        <Table
          bordered
          columns={columns}
          dataSource={tableData}
          rowKey={(record) => record.id}
          pagination={pagination}
          onChange={handleTableChange}
        />
      </div>
      <Modal
        title={`${editId ? '修改' : '新增'}员工`}
        visible={showModal}
        maskClosable={false}
        okText="保存"
        onOk={handleSave}
        onCancel={handleCancel}
      >
        <Form {...layout} form={form}>
          <Form.Item label="用户名" name="username" rules={formRules.username}>
            <Input placeholder="请输入用户名" size="large" />
          </Form.Item>
          <Form.Item label="密码" name="password" rules={formRules.password}>
            <Input.Password
              placeholder="请输入密码"
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
              placeholder="请重复输入密码"
              size="large"
              autoComplete="off"
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default Staff
