/*
 * @Date: 2021-06-13 22:54:52
 * @LastEditTime: 2021-06-14 13:06:21
 */
const Controller = require('egg').Controller
const { success, fail } = require('../../public/requestBody')

class UserController extends Controller {
  async operate() {
    const { id, username, password, restaurantId } = this.ctx.request.body
    let result
    let insertSuccess = false
    const userForm = {
      username
    }
    if (password) {
      userForm.password = password
    }
    if (id) {
      userForm.id = id
      userForm.updatedAt = new Date()
      result = await this.app.mysql.update('user', userForm)
      insertSuccess = result.affectedRows === 1
      if (insertSuccess) {
        this.ctx.body = success()
      } else {
        this.ctx.body = fail('修改员工失败')
      }
    } else {
      const user = await this.app.mysql.get('user', { username })
      if (user) {
        this.ctx.body = fail('用户名已存在')
        return
      }
      userForm.hasRestaurant = 0
      userForm.createdAt = new Date()
      userForm.updatedAt = new Date()
      result = await this.app.mysql.insert('user', userForm)
      if (result.affectedRows === 1) {
        const staffForm = {
          restaurantId,
          userId: result.insertId,
          isManager: 0,
          createdAt: new Date(),
          updatedAt: new Date()
        }
        const staff = await this.app.mysql.insert('staff', staffForm)
        if (staff.affectedRows === 1) {
          this.ctx.body = success()
        } else {
          await this.app.mysql.delete('user', { id })
          this.ctx.body = fail('新增员工关系失败')
        }
      } else {
        this.ctx.body = fail('新增员工失败')
      }
    }
  }

  async getAllUser() {
    const { restaurantId, current, pageSize } = this.ctx.query
    let sql = `SELECT user.id, user.username FROM user INNER JOIN staff on user.id = staff.userId WHERE staff.restaurantId = '${restaurantId}' ORDER BY user.id ASC`
    if (current && pageSize) {
      sql += ` LIMIT ${(current - 1) * pageSize},${pageSize}`
    }
    const countSql = `SELECT count(*) as totalCount FROM user INNER JOIN staff on user.id = staff.userId WHERE staff.restaurantId = '${restaurantId}'`
    const userList = await this.app.mysql.query(sql)
    const userTotalCount = await this.app.mysql.query(countSql)
    this.ctx.body = success({
      totalData: userTotalCount[0].totalCount,
      list: userList
    })
  }

  async getUserById() {
    const { id } = this.ctx.query
    const user = await this.app.mysql.get('user', { id })
    this.ctx.body = success({
      id: user.id,
      username: user.username
    })
  }

  async deleteUserById() {
    const { id, restaurantId } = this.ctx.query
    await this.app.mysql.delete('staff', { userId: id, restaurantId })
    await this.app.mysql.delete('user', { id })
    this.ctx.body = success()
  }
}

module.exports = UserController
