/*
 * @Date: 2021-06-13 15:56:10
 * @LastEditTime: 2021-06-14 14:54:50
 */
import React, { useState, useEffect, useContext } from 'react'
import {
  Button,
  PageHeader,
  Table,
  Modal,
  Form,
  Select,
  Input,
  InputNumber,
  Upload,
  Space,
  message
} from 'antd'
import {
  LoadingOutlined,
  PlusOutlined,
  ExclamationCircleOutlined,
  MinusCircleOutlined
} from '@ant-design/icons'
import '@style/pages/dish.less'
import myAxios from '@config/myAxios'
import { PageContext } from '@config/context'
import servicePath from '@config/api'

const { Option } = Select
const { confirm } = Modal

const Dish = () => {
  const [form] = Form.useForm()
  const [kindForm] = Form.useForm()
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
      title: '菜品名称',
      dataIndex: 'name'
    },
    {
      title: '菜品种类',
      dataIndex: 'menuKind'
    },
    {
      title: '价格',
      dataIndex: 'price'
    },
    {
      title: '数量',
      dataIndex: 'stock'
    },
    {
      title: '描述',
      dataIndex: 'description'
    },
    {
      title: '图片',
      dataIndex: 'dishImage',
      render: (url) => (
        <>
          {url ? (
            <img src={url} alt="菜品类名图片" className="kind-image" />
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
          <Button type="link" onClick={() => handleDishKind(record.id)}>
            添加规格
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
  const [showKindModal, setShowKindModal] = useState(false)
  const [imageUrl, setImageUrl] = useState('')
  const [menuKindList, setMenuKindList] = useState([])

  useEffect(() => {
    handleTableChange(pagination)
    getMenuKind()
  }, [])

  const handleTableChange = (pageConfig) => {
    myAxios(
      {
        ...servicePath.getAllDish,
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
              name: item.name,
              price: item.price,
              menuKind: item.menuKind,
              stock: item.stock,
              description: item.description,
              dishImage: item.imageUri
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

  const getMenuKind = () => {
    myAxios(
      {
        ...servicePath.getMenuAllKind,
        params: {
          restaurantId: localStorage.getItem('restaurantId')
        }
      },
      (res) => {
        if (res.data.success) {
          const { list } = res.data.data
          setMenuKindList(
            list.map((item) => ({
              id: item.id,
              name: item.name
            }))
          )
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
        ...servicePath.getDishById,
        params: {
          id
        }
      },
      (res) => {
        if (res.data.success) {
          const { data } = res.data
          form.setFieldsValue({
            name: data.name,
            price: data.price,
            stock: data.stock,
            description: data.description,
            menuKind: data.sectionId
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
            ...servicePath.deleteDishById,
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

  const handleDishKind = (id) => {
    myAxios(
      {
        ...servicePath.getDishKind,
        params: {
          id
        }
      },
      (res) => {
        if (res.data.success) {
          kindForm.setFieldsValue({
            kinds: res.data.data
          })
          setEditId(id)
          setShowKindModal(true)
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
          ...servicePath.operateDish,
          data: {
            id: editId,
            name: formValue.name,
            price: formValue.price,
            stock: formValue.stock,
            description: formValue.description,
            imageUri: imageUrl,
            sectionId: formValue.menuKind
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

  const handleKindCancel = () => {
    kindForm.resetFields()
    setEditId()
    setShowKindModal(false)
  }

  const handleKindSave = () => {
    kindForm.validateFields().then(() => {
      const kindFormValue = kindForm.getFieldsValue()
      if (kindFormValue.kinds.length === 0) {
        message.error('请添加菜品规格')
        return
      }
      myAxios(
        {
          ...servicePath.updateDishKind,
          data: {
            id: editId,
            dishKind: kindFormValue.kinds
          }
        },
        (res) => {
          if (res.data.success) {
            message.success('保存成功')
            handleKindCancel()
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

  const uploadButton = (
    <div>
      {uploadLoading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  )

  return (
    <div className="dish-container">
      <PageHeader className="site-page-header" title="菜单菜品" />
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
        title={`${editId ? '修改' : '新增'}菜品种类`}
        visible={showModal}
        maskClosable={false}
        okText="保存"
        onOk={handleSave}
        onCancel={handleCancel}
      >
        <Form {...layout} form={form}>
          <Form.Item name="name" label="菜品名称" rules={[{ required: true }]}>
            <Input size="large" placeholder="请输入菜品名称" />
          </Form.Item>
          <Form.Item
            name="menuKind"
            label="菜品种类"
            rules={[{ required: true }]}
          >
            <Select placeholder="请选择菜品种类" size="large">
              {menuKindList.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="price" label="菜品价格" rules={[{ required: true }]}>
            <InputNumber
              size="large"
              min={0}
              placeholder="请输入菜品价格"
              style={{ width: '100%' }}
            />
          </Form.Item>
          <Form.Item name="stock" label="菜品数量" rules={[{ required: true }]}>
            <InputNumber
              size="large"
              min={0}
              placeholder="请输入菜品数量"
              style={{ width: '100%' }}
            />
          </Form.Item>
          <Form.Item
            name="description"
            label="菜品描述"
            rules={[{ required: true }]}
          >
            <Input.TextArea placeholder="请输入菜品描述" rows={4} />
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
      <Modal
        title="编辑菜品规格"
        visible={showKindModal}
        maskClosable={false}
        width={800}
        okText="保存"
        onOk={handleKindSave}
        onCancel={handleKindCancel}
      >
        <Form {...layout} form={kindForm}>
          <Form.List name="kinds">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, fieldKey, ...restField }) => (
                  <Space
                    key={key}
                    style={{
                      display: 'flex',
                      marginBottom: 8
                    }}
                    align="baseline"
                  >
                    <Form.Item
                      {...restField}
                      name={[name, 'name']}
                      fieldKey={[fieldKey, 'name']}
                      label="名称"
                      rules={[{ required: true, message: '请输入规格名称' }]}
                    >
                      <Input size="large" placeholder="请输入规格名称" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'price']}
                      fieldKey={[fieldKey, 'price']}
                      label="价格"
                      rules={[{ required: true, message: '请输入价格' }]}
                    >
                      <InputNumber
                        size="large"
                        min={0}
                        placeholder="请输入价格"
                        style={{ width: '100%' }}
                      />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'stock']}
                      fieldKey={[fieldKey, 'stock']}
                      label="数量"
                      rules={[{ required: true, message: '请输入数量' }]}
                    >
                      <InputNumber
                        size="large"
                        min={0}
                        placeholder="请输入数量"
                        style={{ width: '100%' }}
                      />
                    </Form.Item>
                    <MinusCircleOutlined
                      style={{ marginLeft: 20 }}
                      onClick={() => remove(name)}
                    />
                  </Space>
                ))}
                <Form.Item wrapperCol={{ span: 24 }}>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    style={{ width: '100%' }}
                    icon={<PlusOutlined />}
                  >
                    添加规格
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form>
      </Modal>
    </div>
  )
}

export default Dish
