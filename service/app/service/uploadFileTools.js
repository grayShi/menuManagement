/*
 * @Date: 2021-06-12 12:42:59
 * @LastEditTime: 2021-06-19 01:43:01
 */
const Service = require('egg').Service
const path = require('path')
const sd = require('silly-datetime')
const mkdirp = require('mkdirp')

const uploadPath = 'app/public/uploadImage'

class ToolsService extends Service {
  /**
   * 获取文件上传目录
   * @param {*} filename
   */
  async getUploadFile(filename) {
    // 1.获取当前日期
    const day = sd.format(new Date(), 'YYYYMMDD')
    // 2.创建图片保存的路径
    const dir = path.join(uploadPath, day)
    await mkdirp(dir) // 不存在就创建目录
    const date = Date.now() // 毫秒数
    // 返回图片保存的路径
    const uploadDir = path.join(dir, date + path.extname(filename))
    return {
      uploadDir,
      saveDir:
        'http://' +
        this.ctx.request.header.host +
        uploadDir.slice(3).replace(/\\/g, '/')
    }
  }
}

module.exports = ToolsService
