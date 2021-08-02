/*
 * @Date: 2021-06-13 14:51:11
 * @LastEditTime: 2021-06-14 02:03:09
 */
const Controller = require('egg').Controller
const { success, fail, notLogin } = require('../../public/requestBody')

class RestaurantController extends Controller {
  async getMyRestaurant() {
    const { userId } = this.ctx.query
    if (!userId) {
      this.ctx.body = notLogin()
    }
    const restaurantList = await this.app.mysql.select('restaurant', {
      where: {
        managerId: userId
      },
      order: [['id', 'asc']]
    })
    this.ctx.body = success(restaurantList)
  }
  async operate() {
    const { id, restaurantName, subName, restaurantLogoUri, managerId } =
      this.ctx.request.body
    let result
    let insertSuccess = false
    const restaurantForm = {
      restaurantName,
      subName,
      restaurantLogoUri
    }
    if (id) {
      restaurantForm.id = id
      restaurantForm.updatedAt = new Date()
      result = await this.app.mysql.update('restaurant', restaurantForm)
      insertSuccess = result.affectedRows === 1
      if (insertSuccess) {
        this.ctx.body = success()
      } else {
        this.ctx.body = fail('编辑餐厅失败')
      }
    } else {
      restaurantForm.managerId = managerId
      restaurantForm.createdAt = new Date()
      restaurantForm.updatedAt = new Date()
      result = await this.app.mysql.insert('restaurant', restaurantForm)
      if (result.affectedRows === 1) {
        const staffForm = {
          restaurantId: result.insertId,
          userId: managerId,
          isManager: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        }
        const newStaff = await this.app.mysql.insert('staff', staffForm)
        if (newStaff.affectedRows === 1) {
          this.ctx.body = success()
        } else {
          await this.app.mysql.delete('restaurant', { id: result.insertId })

          this.ctx.body = fail('新增餐厅失败')
        }
      } else {
        this.ctx.body = fail('新增餐厅失败')
      }
    }
  }

  async getAllRestaurant() {
    const { userId, current, pageSize } = this.ctx.query
    let sql = `SELECT restaurant.id, restaurant.restaurantName, restaurant.subName, restaurant.restaurantLogoUri, restaurant.managerId FROM restaurant
    INNER JOIN staff on staff.restaurantId = restaurant.id WHERE staff.userId = '${userId}' ORDER BY restaurant.id ASC`

    if (current && pageSize) {
      sql += ` LIMIT ${(current - 1) * pageSize},${pageSize}`
    }
    const countSql = `SELECT count(*) as totalCount FROM restaurant INNER JOIN staff on staff.restaurantId = restaurant.id WHERE staff.userId = '${userId}'`
    const restaurantList = await this.app.mysql.query(sql)
    const restaurantTotalCount = await this.app.mysql.query(countSql)
    this.ctx.body = success({
      totalData: restaurantTotalCount[0].totalCount,
      list: restaurantList
    })
  }

  async getRestaurantById() {
    const { id } = this.ctx.query
    const desk = await this.app.mysql.get('restaurant', { id })
    this.ctx.body = success(desk)
  }

  async deleteRestaurantById() {
    const { id, userId } = this.ctx.query
    await this.app.mysql.delete('staff', { restaurantId: id, userId })
    await this.app.mysql.delete('restaurant', { id })
    this.ctx.body = success()
  }
}

module.exports = RestaurantController
