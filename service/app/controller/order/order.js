/*
 * @Date: 2021-06-14 16:29:08
 * @LastEditTime: 2021-06-17 22:03:17
 */
const Controller = require('egg').Controller
const { success, fail } = require('../../public/requestBody')

class OrderController extends Controller {
  async operate() {
    const data = new Date()
    let { id, orderForm, childOrderForm } = this.ctx.request.body
    if (id) {
      const result = await this.app.mysql.update('orders', orderForm, {
        where: {
          orderId: id
        }
      })
      if (result.affectedRows === 1) {
        await this.app.mysql.delete('orderdish', { orderId: id })
        const orderId = id
        childOrderForm = childOrderForm.map((item) => ({
          ...item,
          orderId,
          createdAt: data,
          updatedAt: data
        }))
        const newResult = await this.app.mysql.insert(
          'orderdish',
          childOrderForm
        )
        if (newResult.affectedRows === childOrderForm.length) {
          this.ctx.body = success()
        } else {
          this.ctx.body = fail('修改订单失败')
        }
      } else {
        this.ctx.body = fail('修改订单失败')
      }
      this.ctx.body = success()
    } else {
      orderForm.orderStatus = 1
      orderForm.createdAt = data
      orderForm.updatedAt = data
      const result = await this.app.mysql.insert('orders', orderForm)
      if (result.affectedRows === 1) {
        const orderId = result.insertId
        childOrderForm = childOrderForm.map((item) => ({
          ...item,
          orderId,
          createdAt: data,
          updatedAt: data
        }))
        const newResult = await this.app.mysql.insert(
          'orderdish',
          childOrderForm
        )
        if (newResult.affectedRows === childOrderForm.length) {
          this.ctx.body = success()
        } else {
          this.ctx.body = fail('下单失败')
        }
      } else {
        this.ctx.body = fail('下单失败')
      }
    }
  }

  async getAllOrders() {
    const { restaurantId, orderStatus, searchDate } = this.ctx.query
    let statusSql = ''
    if (Number(orderStatus) > 0) {
      statusSql = ` and orders.orderStatus = ${orderStatus}`
    }
    const orderSql = `SELECT orders.orderId, orders.totalPrice, orders.orderStatus, childdesk.deskName as desk, service.name as service FROM orders
      INNER JOIN childdesk ON orders.restaurantChildDeskId = childdesk.id
      INNER JOIN service ON orders.restaurantServiceId = service.id where orders.restaurantId = '${restaurantId}' ${statusSql}
      and to_days(orders.createdAt) = to_days('${searchDate}') and orders.orderStatus != 4`

    const orderList = await this.app.mysql.query(orderSql)

    const newFormatOrder = await Promise.all(
      orderList.map(async (order) => {
        const orderDishSql = `SELECT dish.name FROM orderdish
      INNER JOIN dish on orderdish.dishId = dish.id
      WHERE orderdish.orderId = '${order.orderId}'`
        const findOrderDish = await this.app.mysql.query(orderDishSql)

        return {
          ...order,
          findOrderDish
        }
      })
    )
    this.ctx.body = success(newFormatOrder)
  }

  async deleteOrderById() {
    const { id } = this.ctx.query
    const orderForm = {
      deletedAt: new Date(),
      orderStatus: 4
    }
    const result = await this.app.mysql.update('orders', orderForm, {
      where: {
        orderId: id
      }
    })
    if (result.affectedRows === 1) {
      this.ctx.body = success()
    } else {
      this.ctx.body = fail('取消订单失败')
    }
  }

  async payOrderById() {
    const { id } = this.ctx.query
    const orderForm = {
      orderStatus: 3,
      updatedAt: new Date()
    }
    const result = await this.app.mysql.update('orders', orderForm, {
      where: {
        orderId: id
      }
    })
    if (result.affectedRows === 1) {
      this.ctx.body = success()
    } else {
      this.ctx.body = fail('取消订单失败')
    }
  }

  async waitOrderPay() {
    const { id } = this.ctx.query
    const orderForm = {
      orderStatus: 2,
      updatedAt: new Date()
    }
    const result = await this.app.mysql.update('orders', orderForm, {
      where: {
        orderId: id
      }
    })
    if (result.affectedRows === 1) {
      this.ctx.body = success()
    } else {
      this.ctx.body = fail('操作订单失败')
    }
  }

  async getOrderById() {
    const { id } = this.ctx.query
    const orderSql = `SELECT orders.orderId, orders.restaurantServiceId, orders.restaurantChildDeskId, orders.orderStatus, service.name, childdesk.deskName FROM orders
    INNER JOIN service ON orders.restaurantServiceId = service.id
    INNER JOIN childdesk ON orders.restaurantChildDeskId = childdesk.id
    where orders.orderId = '${id}'`
    const orderdishSql = `SELECT orderdish.dishId, orderdish.childDishId, orderdish.count, dish.name as dishName, childdish.name as childDishName FROM orderdish
    INNER JOIN dish ON orderdish.dishId = dish.id
    INNER JOIN childdish ON orderdish.childDishId = childdish.id
    where orderdish.orderId = '${id}'`
    const order = await this.app.mysql.query(orderSql)
    const orderdish = await this.app.mysql.query(orderdishSql)
    if (order.length > 0) {
      this.ctx.body = success({
        order: order[0],
        orderdish
      })
    } else {
      this.ctx.body = fail('未找到该订单')
    }
  }

  async getOrdersByUserId() {
    const { userId } = this.ctx.query
    const orderSql = `SELECT orders.orderId, orders.restaurantServiceId, orders.restaurantChildDeskId, orders.orderStatus, service.name, childdesk.deskName FROM orders
    INNER JOIN service ON orders.restaurantServiceId = service.id
    INNER JOIN childdesk ON orders.restaurantChildDeskId = childdesk.id
     where orderedBy = '${userId}'`
    const order = await this.app.mysql.query(orderSql)

    const orderData = await Promise.all(
      order.map(async (item) => {
        const orderdishSql = `SELECT orderdish.dishId, orderdish.childDishId, orderdish.count, dish.name as dishName, childdish.name as childDishName FROM orderdish
        INNER JOIN dish ON orderdish.dishId = dish.id
        INNER JOIN childdish ON orderdish.childDishId = childdish.id
        where orderId = '${item.orderId}'`
        const dishForm = await this.app.mysql.query(orderdishSql)
        return {
          order: item,
          orderdish: dishForm
        }
      })
    )

    if (orderData.length > 0) {
      this.ctx.body = success(orderData)
    } else {
      this.ctx.body = fail('未找到该订单')
    }
  }
}

module.exports = OrderController
