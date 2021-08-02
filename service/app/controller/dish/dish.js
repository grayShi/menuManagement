/*
 * @Date: 2021-06-13 16:35:22
 * @LastEditTime: 2021-06-14 15:34:28
 */
const Controller = require('egg').Controller
const { success, fail } = require('../../public/requestBody')

class DishController extends Controller {
  async operate() {
    const formData = this.ctx.request.body
    let result
    let insertSuccess = false
    formData.hasChild = 1
    if (formData.id) {
      formData.updatedAt = new Date()
      result = await this.app.mysql.update('dish', formData)
    } else {
      formData.createdAt = new Date()
      formData.updatedAt = new Date()
      result = await this.app.mysql.insert('dish', formData)
    }
    insertSuccess = result.affectedRows === 1
    if (insertSuccess) {
      this.ctx.body = success()
    } else {
      this.ctx.body = fail(
        formData.id ? '编辑菜品名称失败' : '新增菜品名称失败'
      )
    }
  }

  async getAllDish() {
    const { restaurantId, current, pageSize } = this.ctx.query
    let sql = `SELECT dish.id, dish.name, dish.price, dish.stock, dish.description, dish.imageUri, section.name as menuKind FROM dish
    INNER JOIN section on dish.sectionId = section.id
     WHERE section.restaurantId = '${restaurantId}' 
     ORDER BY dish.id ASC`
    if (current && pageSize) {
      sql += ` LIMIT ${(current - 1) * pageSize},${pageSize}`
    }
    const countSql = `SELECT count(*) as totalCount FROM dish WHERE sectionId = '${restaurantId}'`
    const dishList = await this.app.mysql.query(sql)
    const dishTotalCount = await this.app.mysql.query(countSql)
    this.ctx.body = success({
      totalData: dishTotalCount[0].totalCount,
      list: dishList
    })
  }

  async getDishById() {
    const { id } = this.ctx.query
    const dish = await this.app.mysql.get('dish', { id })
    this.ctx.body = success(dish)
  }

  async deleteDishById() {
    const { id } = this.ctx.query
    await this.app.mysql.delete('dish', { id })
    this.ctx.body = success()
  }

  async updateDishKind() {
    const { id, dishKind } = this.ctx.request.body
    const createdTime = new Date()
    const updatedTime = new Date()

    await this.app.mysql.delete('childdish', { parentId: id })
    const result = await this.app.mysql.insert(
      'childdish',
      dishKind.map((item) => ({
        parentId: id,
        ...item,
        createdAt: createdTime,
        updatedAt: updatedTime
      }))
    )
    if (result.affectedRows === dishKind.length) {
      this.ctx.body = success()
    } else {
      this.ctx.body = fail('编辑菜品规格失败')
    }
  }

  async getDishKind() {
    const { id } = this.ctx.query
    const sql = `SELECT id, name, price, stock FROM childdish WHERE parentId = '${id}' ORDER BY id ASC`

    const dishKindList = await this.app.mysql.query(sql)
    this.ctx.body = success(dishKindList)
  }
}

module.exports = DishController
