/*
 * @Date: 2021-06-13 22:54:52
 * @LastEditTime: 2021-06-13 23:45:53
 */
const Controller = require('egg').Controller
const { success, fail } = require('../../public/requestBody')

class ServiceController extends Controller {
  async operate() {
    const serviceForm = this.ctx.request.body
    let result
    let insertSuccess = false
    if (serviceForm.id) {
      serviceForm.updatedAt = new Date()
      result = await this.app.mysql.update('service', serviceForm)
    } else {
      serviceForm.createdAt = new Date()
      serviceForm.updatedAt = new Date()
      result = await this.app.mysql.insert('service', serviceForm)
    }
    insertSuccess = result.affectedRows === 1
    if (insertSuccess) {
      this.ctx.body = success()
    } else {
      this.ctx.body = fail(serviceForm.id ? '编辑桌椅失败' : '新增桌椅失败')
    }
  }

  async getAllService() {
    const { restaurantId, current, pageSize } = this.ctx.query
    let sql = `SELECT id, name FROM service WHERE restaurantId = '${restaurantId}' ORDER BY id ASC`
    if (current && pageSize) {
      sql += ` LIMIT ${(current - 1) * pageSize},${pageSize}`
    }
    const countSql = `SELECT count(*) as totalCount FROM service WHERE restaurantId = '${restaurantId}'`
    const serviceList = await this.app.mysql.query(sql)
    const serviceTotalCount = await this.app.mysql.query(countSql)
    this.ctx.body = success({
      totalData: serviceTotalCount[0].totalCount,
      list: serviceList
    })
  }

  async getServiceById() {
    const { id } = this.ctx.query
    const service = await this.app.mysql.get('service', { id })
    this.ctx.body = success(service)
  }

  async deleteServiceById() {
    const { id } = this.ctx.query
    await this.app.mysql.delete('service', { id })
    this.ctx.body = success()
  }
}

module.exports = ServiceController
