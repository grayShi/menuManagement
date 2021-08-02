/*
 * @Date: 2021-06-12 03:01:47
 * @LastEditTime: 2021-06-18 21:36:48
 */
import React, { useState, useEffect, useContext } from 'react'
import {
  Button,
  PageHeader,
  Table,
  Modal,
  Form,
  Input,
  Upload,
  message
} from 'antd'
import {
  LoadingOutlined,
  PlusOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons'
import '@style/pages/menuKind.less'
import myAxios from '@config/myAxios'
import { PageContext } from '@config/context'
import servicePath from '@config/api'

const { confirm } = Modal

const MenuKind = () => {
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
      title: '类名',
      dataIndex: 'kindName'
    },
    {
      title: '图片',
      dataIndex: 'kindImage',
      render: (url) => (
        <>
          {url ? (
            <img src={url} alt="菜单类名图片" className="kind-image" />
          ) : null}
        </>
      )
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
          <Button type="link" onClick={() => handleDelete(record.id)}>
            删除
          </Button>
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
  const [uploadLoading, setUploadLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [imageUrl, setImageUrl] = useState('')

  useEffect(() => {
    handleTableChange(pagination)
  }, [])

  const handleTableChange = (pageConfig) => {
    myAxios(
      {
        ...servicePath.getMenuAllKind,
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
              kindName: item.name,
              kindImage: item.imageUri
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
        ...servicePath.getMenuKindById,
        params: {
          id
        }
      },
      (res) => {
        if (res.data.success) {
          const { data } = res.data
          form.setFieldsValue({
            kindName: data.name
          })
          setImageUrl(data.imageUri)
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
            ...servicePath.deleteMenuKindById,
            params: {
              id
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
    setImageUrl('')
    setEditId()
    setShowModal(false)
  }

  const handleSave = () => {
    if (!imageUrl) {
      message.error('请上传图片')
      return
    }
    form.validateFields().then(() => {
      const formValue = form.getFieldsValue()
      myAxios(
        {
          ...servicePath.operateMenuKind,
          data: {
            id: editId,
            kindName: formValue.kindName,
            imageUrl,
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

  const uploadButton = (
    <div>
      {uploadLoading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  )

  return (
    <div className="menu-kind-container">
      <PageHeader className="site-page-header" title="菜单种类" />
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
        title={`${editId ? '修改' : '新增'}菜单种类`}
        visible={showModal}
        maskClosable={false}
        okText="保存"
        onOk={handleSave}
        onCancel={handleCancel}
      >
        <Form {...layout} form={form}>
          <Form.Item
            name="kindName"
            label="菜单类别名称"
            rules={[{ required: true }]}
          >
            <Input size="large" placeholder="请输入菜单类别名称" />
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
        </Form>
      </Modal>
    </div>
  )
}

export default MenuKind
