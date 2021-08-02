/*
 * @Author: gl.shi
 * @Date: 2021-06-10 22:31:47
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-06-14 13:22:43
 */
import Home from '@pages/order/home'
import MenuKind from '@pages/menuKind/menuKind'
import Dish from '@pages/dish/dish'
import Desk from '@pages/desk/desk'
import Service from '@pages/service/service'
import Restaurant from '@pages/restaurant/restaurant'
import Staff from '@pages/staff/staff'

export const menuConfig = [
  {
    key: 'home',
    title: '订单管理'
  },
  {
    key: 'menuKind',
    title: '菜单种类'
  },
  {
    key: 'dish',
    title: '菜单菜品'
  },
  {
    key: 'desk',
    title: '桌椅管理'
  },
  {
    key: 'service',
    title: '服务管理'
  },
  {
    key: 'restaurant',
    title: '餐厅管理'
  },
  {
    key: 'staff',
    title: '员工管理'
  }
]

export const routerConfig = {
  home: {
    path: '/home',
    component: Home,
    exact: true
  },
  menuKind: {
    path: '/menuKind',
    component: MenuKind,
    exact: true
  },
  dish: {
    path: '/dish',
    component: Dish,
    exact: true
  },
  desk: {
    path: '/desk',
    component: Desk,
    exact: true
  },
  service: {
    path: '/service',
    component: Service,
    exact: true
  },
  restaurant: {
    path: '/restaurant',
    component: Restaurant,
    exact: true
  },
  staff: {
    path: '/staff',
    component: Staff,
    exact: true
  }
}
