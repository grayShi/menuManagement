/*
 * @Date: 2021-06-11 00:03:31
 * @LastEditTime: 2021-06-14 13:27:22
 */
import React, { useEffect, useState, useContext } from 'react'
import { Layout, Menu, Dropdown, Select, Avatar, Button, message } from 'antd'
import { menuConfig, routerConfig } from '@config/menuConfig'
import { Route, Switch } from 'react-router-dom'
import servicePath from '@config/api'
import { useTranslation } from 'react-i18next'
import NotFound from '@pages/notFound'
import myAxios from '@config/myAxios'
import { PageContext } from '@config/context'
import '@style/components/menuContainer.less'
import { DownOutlined } from '@ant-design/icons'
import _ from 'lodash'

const { Option } = Select
const { SubMenu } = Menu
const { Sider, Content } = Layout

const MenuContainer = (props) => {
  const pageContext = useContext(PageContext)

  const { t } = useTranslation()
  const [selectKeys, setSelectKeys] = useState([])
  const [selectedRestaurant, setSelectedRestaurant] = useState()
  const [restaurantList, setRestaurantList] = useState([])
  const [restaurantImg, setRestaurantImg] = useState('')
  useEffect(() => {
    const path = props.history.location.pathname
    Object.keys(routerConfig).forEach((key) => {
      if (routerConfig[key].path === path) {
        setSelectKeys([key])
      }
    })
  }, [])

  useEffect(() => {
    getMyRestaurantList()
  }, [])

  const getMyRestaurantList = () => {
    myAxios(
      {
        ...servicePath.getMyRestaurant,
        params: {
          userId: localStorage.getItem('userId')
        }
      },
      (res) => {
        if (res.data.success) {
          const list = res.data.data.map((item) => ({
            id: `${item.id}`,
            name: item.restaurantName,
            subName: item.subName,
            imageUrl: item.restaurantLogoUri
          }))
          setRestaurantList(list)
          changeRestaurantInfo(localStorage.getItem('restaurantId'), list)
        } else {
          message.error(res.data.message)
        }
      },
      () => {
        message.error('查询餐厅失败,请联系管理员')
      },
      pageContext
    )
  }

  const changeRestaurantInfo = (restaurantId, searchList) => {
    const myList = searchList || restaurantList
    setSelectedRestaurant(restaurantId)
    const find = _.find(myList, (item) => item.id === restaurantId)
    if (find) {
      setRestaurantImg(find.imageUrl)
    }
  }

  const gotoNewPage = (e) => {
    if (routerConfig[e.key]) {
      setSelectKeys([e.key])
      props.history.push(routerConfig[e.key].path)
    }
  }

  const logout = () => {
    myAxios(
      {
        ...servicePath.logout
      },
      (res) => {
        if (res.data.success) {
          props.history.push('/login')
        }
      },
      () => {
        message.error(t('退出登陆失败,请联系管理员'))
      },
      pageContext
    )
  }

  const changeRestaurant = (value) => {
    changeRestaurantInfo(value)
    localStorage.setItem('restaurantId', value)
    window.location.reload()
  }

  return (
    <Layout>
      <Sider trigger={null} collapsible={false}>
        <div className="menu-logo" />
        <Menu selectedKeys={selectKeys} mode="inline" onClick={gotoNewPage}>
          {menuConfig.map((item) => {
            if (item.subMenu) {
              return (
                <SubMenu
                  key={item.key}
                  title={
                    <span>
                      <span>{item.title}</span>
                    </span>
                  }
                >
                  {item.subMenu.map((sub) => (
                    <Menu.Item key={sub.key}>{sub.title}</Menu.Item>
                  ))}
                </SubMenu>
              )
            }
            return (
              <Menu.Item key={item.key}>
                <span>{item.title}</span>
              </Menu.Item>
            )
          })}
        </Menu>
      </Sider>
      <Layout>
        <Content>
          <div className="header-container">
            <span>我的餐厅:</span>
            <Select
              size="large"
              onChange={changeRestaurant}
              value={selectedRestaurant}
              className="my-restaurant-list"
            >
              {restaurantList.map((item) => (
                <Option key={item.id} value={item.id}>
                  {`${item.name}-${item.subName}`}
                </Option>
              ))}
            </Select>
            <Avatar size="large" src={restaurantImg} />
            <Dropdown
              className="header-operate"
              placement="bottomCenter"
              overlay={
                <Menu>
                  <Menu.Item onClick={logout}>
                    <span className="drop-item">退出登陆</span>
                  </Menu.Item>
                </Menu>
              }
              arrow
            >
              <span>
                <span className="user-name">
                  {localStorage.getItem('username') || '用户名'}
                </span>
                <DownOutlined />
              </span>
            </Dropdown>
          </div>
          <div className="page-container">
            <div className="page-body">
              <Switch>
                {Object.keys(routerConfig).map((key) => {
                  const item = routerConfig[key]
                  return (
                    <Route
                      key={key}
                      path={item.path}
                      exact={item.exact}
                      component={item.component}
                    />
                  )
                })}
                <Route component={NotFound} />
              </Switch>
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}

export default MenuContainer
