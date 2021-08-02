/*
 * @Date: 2021-06-10 22:29:45
 * @LastEditTime: 2021-06-14 00:22:50
 */
const Controller = require('egg').Controller
const { success, fail } = require('../../public/requestBody')

class LoginController extends Controller {
  async login() {
    const { username, password } = this.ctx.request.body
    const sql = `SELECT id, username FROM user WHERE username = '${username}' and password = '${password}'`
    const result = await this.app.mysql.query(sql)
    if (result.length > 0) {
      const openId = new Date().getTime()
      this.ctx.session.openId = openId
      const userInfo = result[0]
      const staffSql = `SELECT restaurantId FROM staff WHERE userId = '${userInfo.id}' ORDER BY createdAt ASC`
      const findResult = await this.app.mysql.query(staffSql)
      if (findResult.length > 0) {
        this.ctx.body = success({
          ...userInfo,
          restaurantId: findResult[0].restaurantId
        })
      } else {
        this.ctx.body = fail('查找用户餐厅失败,请联系管理员')
      }
    } else {
      const newSql = `SELECT username FROM user WHERE username = '${username}'`
      const newResult = await this.app.mysql.query(newSql)
      if (newResult.length > 0) {
        this.ctx.body = fail('用户名或密码错误')
      } else {
        this.ctx.body = fail('用户不存在')
      }
    }
  }
  async logout() {
    this.ctx.session = {}
    this.ctx.body = success()
  }

  async registerUser() {
    const { username, password, restaurantForm } = this.ctx.request.body
    const userForm = {
      username,
      password,
      hasRestaurant: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    const newRestaurantForm = {
      ...restaurantForm,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    const user = await this.app.mysql.get('user', { username })
    if (user) {
      this.ctx.body = fail('用户名已存在')
      return
    }

    const result = await this.app.mysql.insert('user', userForm)
    if (result.affectedRows === 1) {
      newRestaurantForm.managerId = result.insertId
      const newResult = await this.app.mysql.insert(
        'restaurant',
        newRestaurantForm
      )
      if (newResult.affectedRows === 1) {
        const staffForm = {
          restaurantId: newResult.insertId,
          userId: result.insertId,
          isManager: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        }
        const newStaff = await this.app.mysql.insert('staff', staffForm)
        if (newStaff.affectedRows === 1) {
          this.ctx.body = success()
        } else {
          await this.app.mysql.delete('user', { id: result.insertId })
          await this.app.mysql.delete('restaurant', { id: newResult.insertId })
          this.ctx.body = fail('注册用户关系失败')
        }
      } else {
        await this.app.mysql.delete('user', { id: result.insertId })
        this.ctx.body = fail('注册用户餐馆失败')
      }
    } else {
      this.ctx.body = fail('注册用户失败')
    }
  }
}

module.exports = LoginController
