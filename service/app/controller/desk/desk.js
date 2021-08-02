/*
 * @Date: 2021-06-13 22:54:52
 * @LastEditTime: 2021-06-16 23:06:00
 */
const Controller = require('egg').Controller
const { success, fail } = require('../../public/requestBody')

class DeskController extends Controller {
  async operate() {
    const deskForm = this.ctx.request.body
    let result
    if (deskForm.id) {
      deskForm.updatedAt = new Date()
      result = await this.app.mysql.update('desk', deskForm)
      await this.app.mysql.delete('childdesk', { parentId: deskForm.id })
    } else {
      deskForm.createdAt = new Date()
      deskForm.updatedAt = new Date()
      result = await this.app.mysql.insert('desk', deskForm)
    }
    if (result.affectedRows === 1) {
      const itemDesk = new Array(deskForm.number)
        .fill('')
        .map((item, index) => ({
          deskName: `${deskForm.type}${index + 1}`,
          parentId: deskForm.id || result.insertId,
          createdAt: new Date(),
          updatedAt: new Date()
        }))
      const deskList = await this.app.mysql.insert('childdesk', itemDesk)
      if (deskList.affectedRows === itemDesk.length) {
        this.ctx.body = success()
      } else {
        this.ctx.body = fail('编辑桌椅失败')
      }
    } else {
      this.ctx.body = fail('编辑桌椅失败')
    }
  }

  async getAllDesk() {
    const { restaurantId, current, pageSize } = this.ctx.query
    let sql = `SELECT id, type, number, seatAmount, peopleAmount FROM desk WHERE restaurantId = '${restaurantId}' ORDER BY id ASC`
    if (current && pageSize) {
      sql += ` LIMIT ${(current - 1) * pageSize},${pageSize}`
    }
    const countSql = `SELECT count(*) as totalCount FROM desk WHERE restaurantId = '${restaurantId}'`
    const deskList = await this.app.mysql.query(sql)
    const deskTotalCount = await this.app.mysql.query(countSql)
    this.ctx.body = success({
      totalData: deskTotalCount[0].totalCount,
      list: deskList
    })
  }

  async getAllChildDesk() {
    const { restaurantId, deskId, current, pageSize } = this.ctx.query
    let sql = `SELECT childdesk.id, childdesk.deskName FROM childdesk
    INNER JOIN desk on childdesk.parentId = desk.id
    WHERE desk.restaurantId = '${restaurantId}' AND childdesk.parentId = '${deskId}'
    ORDER BY childdesk.id ASC`
    if (current && pageSize) {
      sql += ` LIMIT ${(current - 1) * pageSize},${pageSize}`
    }
    const countSql = `SELECT count(*) as totalCount FROM childdesk
    INNER JOIN desk on childdesk.parentId = desk.id
    WHERE desk.restaurantId = '${restaurantId}' AND childdesk.parentId = '${deskId}'`
    const deskList = await this.app.mysql.query(sql)
    const deskTotalCount = await this.app.mysql.query(countSql)
    this.ctx.body = success({
      totalData: deskTotalCount[0].totalCount,
      list: deskList
    })
  }

  async getAllEmptyChildDesk() {
    const { restaurantId, current, pageSize } = this.ctx.query
    let sql = `SELECT childdesk.id, childdesk.deskName FROM childdesk
    INNER JOIN desk on childdesk.parentId = desk.id
    WHERE desk.restaurantId = '${restaurantId}'
    AND childdesk.id NOT IN (SELECT restaurantChildDeskId From orders WHERE restaurantId = '${restaurantId}' and orderStatus != 3)
    ORDER BY childdesk.id ASC`
    if (current && pageSize) {
      sql += ` LIMIT ${(current - 1) * pageSize},${pageSize}`
    }
    const countSql = `SELECT count(*) as totalCount FROM childdesk
    INNER JOIN desk on childdesk.parentId = desk.id
    WHERE desk.restaurantId = '${restaurantId}'
    AND childdesk.id NOT IN (SELECT restaurantChildDeskId From orders WHERE restaurantId = '${restaurantId}' and orderStatus != 3)`
    const deskList = await this.app.mysql.query(sql)
    const deskTotalCount = await this.app.mysql.query(countSql)
    this.ctx.body = success({
      totalData: deskTotalCount[0].totalCount,
      list: deskList
    })
  }

  async getDeskById() {
    const { id } = this.ctx.query
    const desk = await this.app.mysql.get('desk', { id })
    this.ctx.body = success(desk)
  }

  async deleteDeskById() {
    const { id } = this.ctx.query
    await this.app.mysql.delete('childdesk', { parentId: id })
    await this.app.mysql.delete('desk', { id })
    this.ctx.body = success()
  }
}

module.exports = DeskController
