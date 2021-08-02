/*
 * @Date: 2021-06-10 22:29:45
 * @LastEditTime: 2021-06-20 12:46:01
 */
/*
 * @Date: 2021-06-10 22:29:45
 * @LastEditTime: 2021-06-12 15:08:59
 */
module.exports = (app) => {
  const { router, controller } = app
  const adminAuth = app.middleware.adminAuth()
  router.post('/api/user/login', controller.user.login.login)
  router.get('/api/user/logout', controller.user.login.logout)
  router.post('/api/user/registerUser', controller.user.login.registerUser)
  router.post(
    '/api/menuKind/operate',
    adminAuth,
    controller.menuKind.menuKind.operate
  )
  router.get(
    '/api/menuKind/getMenuAllKind',
    adminAuth,
    controller.menuKind.menuKind.getMenuAllKind
  )
  router.get(
    '/api/menuKind/getMenuKindById',
    adminAuth,
    controller.menuKind.menuKind.getMenuKindById
  )
  router.get(
    '/api/menuKind/deleteMenuKindById',
    adminAuth,
    controller.menuKind.menuKind.deleteMenuKindById
  )
  router.post('/api/dish/operate', adminAuth, controller.dish.dish.operate)
  router.get('/api/dish/getAllDish', adminAuth, controller.dish.dish.getAllDish)
  router.get(
    '/api/dish/getDishById',
    adminAuth,
    controller.dish.dish.getDishById
  )
  router.get(
    '/api/dish/deleteDishById',
    adminAuth,
    controller.dish.dish.deleteDishById
  )
  router.post(
    '/api/dish/updateDishKind',
    adminAuth,
    controller.dish.dish.updateDishKind
  )
  router.get(
    '/api/dish/getDishKind',
    adminAuth,
    controller.dish.dish.getDishKind
  )
  router.get(
    '/api/menuKind/getAllDishesByChildDesk',
    controller.menuKind.menuKind.getAllDishesByChildDesk
  )
  router.post('/api/desk/operate', adminAuth, controller.desk.desk.operate)
  router.get('/api/desk/getAllDesk', adminAuth, controller.desk.desk.getAllDesk)
  router.get(
    '/api/desk/getAllChildDesk',
    adminAuth,
    controller.desk.desk.getAllChildDesk
  )
  router.get(
    '/api/desk/getAllEmptyChildDesk',
    adminAuth,
    controller.desk.desk.getAllEmptyChildDesk
  )
  router.get(
    '/api/desk/getDeskById',
    adminAuth,
    controller.desk.desk.getDeskById
  )
  router.get(
    '/api/desk/deleteDeskById',
    adminAuth,
    controller.desk.desk.deleteDeskById
  )

  router.post(
    '/api/service/operate',
    adminAuth,
    controller.service.service.operate
  )
  router.get(
    '/api/service/getAllService',
    adminAuth,
    controller.service.service.getAllService
  )
  router.get(
    '/api/service/getServiceById',
    adminAuth,
    controller.service.service.getServiceById
  )
  router.get(
    '/api/service/deleteServiceById',
    adminAuth,
    controller.service.service.deleteServiceById
  )
  router.get(
    '/api/restaurant/getMyRestaurant',
    adminAuth,
    controller.restaurant.restaurant.getMyRestaurant
  )
  router.post(
    '/api/restaurant/operate',
    adminAuth,
    controller.restaurant.restaurant.operate
  )
  router.get(
    '/api/restaurant/getAllRestaurant',
    adminAuth,
    controller.restaurant.restaurant.getAllRestaurant
  )
  router.get(
    '/api/restaurant/getRestaurantById',
    adminAuth,
    controller.restaurant.restaurant.getRestaurantById
  )
  router.get(
    '/api/restaurant/deleteRestaurantById',
    adminAuth,
    controller.restaurant.restaurant.deleteRestaurantById
  )
  router.post('/api/user/operate', adminAuth, controller.user.user.operate)
  router.get('/api/user/getAllUser', adminAuth, controller.user.user.getAllUser)
  router.get(
    '/api/user/getUserById',
    adminAuth,
    controller.user.user.getUserById
  )
  router.get(
    '/api/user/deleteUserById',
    adminAuth,
    controller.user.user.deleteUserById
  )
  router.post('/api/order/operate', adminAuth, controller.order.order.operate)
  router.get(
    '/api/order/getAllOrders',
    adminAuth,
    controller.order.order.getAllOrders
  )
  router.get(
    '/api/order/deleteOrderById',
    adminAuth,
    controller.order.order.deleteOrderById
  )
  router.get(
    '/api/order/payOrderById',
    adminAuth,
    controller.order.order.payOrderById
  )
  router.get(
    '/api/order/getOrderById',
    adminAuth,
    controller.order.order.getOrderById
  )
  router.get(
    '/api/order/getOrdersByUserId',
    adminAuth,
    controller.order.order.getOrdersByUserId
  )
  router.get(
    '/api/order/waitOrderPay',
    adminAuth,
    controller.order.order.waitOrderPay
  )
}
