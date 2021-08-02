/*
 * @Date: 2021-06-10 23:20:58
 * @LastEditTime: 2021-06-16 22:52:36
 */
// import { apiTarget } from '@config/config'

const apiUrl = '/api'
// if (process.env.NODE_ENV === 'production') {
//   apiUrl = `${apiTarget}/api`
// }

const servicePath = {
  login: { url: `${apiUrl}/user/login`, method: 'post' }, // 通过密码登录
  logout: { url: `${apiUrl}/user/logout`, method: 'get' }, // 退出登录
  registerUser: {
    url: `${apiUrl}/user/registerUser`,
    method: 'post'
  }, // 用户注册
  operateMenuKind: { url: `${apiUrl}/menuKind/operate`, method: 'post' }, // 新增、修改菜单种类
  getMenuAllKind: { url: `${apiUrl}/menuKind/getMenuAllKind`, method: 'get' }, // 获取菜单种类
  getMenuKindById: { url: `${apiUrl}/menuKind/getMenuKindById`, method: 'get' },
  deleteMenuKindById: {
    url: `${apiUrl}/menuKind/deleteMenuKindById`,
    method: 'get'
  },
  getMyRestaurant: {
    url: `${apiUrl}/restaurant/getMyRestaurant`,
    method: 'get'
  }, // 获取我的餐馆列表
  operateDish: { url: `${apiUrl}/dish/operate`, method: 'post' }, // 新增、修改菜品
  getAllDish: { url: `${apiUrl}/dish/getAllDish`, method: 'get' }, // 获取菜品种类
  getDishById: { url: `${apiUrl}/dish/getDishById`, method: 'get' },
  deleteDishById: {
    url: `${apiUrl}/dish/deleteDishById`,
    method: 'get'
  },
  updateDishKind: { url: `${apiUrl}/dish/updateDishKind`, method: 'post' }, // 修改菜品规格
  getDishKind: { url: `${apiUrl}/dish/getDishKind`, method: 'get' }, // 查看菜品规格
  operateDesk: { url: `${apiUrl}/desk/operate`, method: 'post' }, // 新增、修改桌椅
  getAllDesk: { url: `${apiUrl}/desk/getAllDesk`, method: 'get' }, // 获取桌椅
  getAllChildDesk: { url: `${apiUrl}/desk/getAllChildDesk`, method: 'get' }, // 获取全部桌椅
  getAllEmptyChildDesk: {
    url: `${apiUrl}/desk/getAllEmptyChildDesk`,
    method: 'get'
  }, // 获取全部桌椅
  getDeskById: { url: `${apiUrl}/desk/getDeskById`, method: 'get' },
  deleteDeskById: {
    url: `${apiUrl}/desk/deleteDeskById`,
    method: 'get'
  },
  operateService: { url: `${apiUrl}/service/operate`, method: 'post' }, // 新增、修改服务
  getAllService: { url: `${apiUrl}/service/getAllService`, method: 'get' }, // 获取服务
  getServiceById: { url: `${apiUrl}/service/getServiceById`, method: 'get' },
  deleteServiceById: {
    url: `${apiUrl}/service/deleteServiceById`,
    method: 'get'
  },
  operateRestaurant: { url: `${apiUrl}/restaurant/operate`, method: 'post' }, // 新增、修改餐馆
  getAllRestaurant: {
    url: `${apiUrl}/restaurant/getAllRestaurant`,
    method: 'get'
  }, // 获取餐馆
  getRestaurantById: {
    url: `${apiUrl}/restaurant/getRestaurantById`,
    method: 'get'
  },
  deleteRestaurantById: {
    url: `${apiUrl}/restaurant/deleteRestaurantById`,
    method: 'get'
  },
  operateUser: { url: `${apiUrl}/user/operate`, method: 'post' }, // 新增、修改员工
  getAllUser: {
    url: `${apiUrl}/user/getAllUser`,
    method: 'get'
  }, // 获取餐馆
  getUserById: {
    url: `${apiUrl}/user/getUserById`,
    method: 'get'
  },
  deleteUserById: {
    url: `${apiUrl}/user/deleteUserById`,
    method: 'get'
  },
  operateOrder: {
    url: `${apiUrl}/order/operate`,
    method: 'post'
  },
  getAllOrders: {
    url: `${apiUrl}/order/getAllOrders`,
    method: 'get'
  },
  deleteOrderById: {
    url: `${apiUrl}/order/deleteOrderById`,
    method: 'get'
  },
  payOrderById: {
    url: `${apiUrl}/order/payOrderById`,
    method: 'get'
  },
  getOrderById: {
    url: `${apiUrl}/order/getOrderById`,
    method: 'get'
  },
  waitOrderPay: {
    url: `${apiUrl}/order/waitOrderPay`,
    method: 'get'
  }
}

export default servicePath
