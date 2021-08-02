/*
 * @Date: 2021-06-12 12:38:52
 * @LastEditTime: 2021-06-12 16:40:25
 */
const Controller = require('egg').Controller
const pump = require('pump')
const fs = require('fs')
const { success, fail } = require('../../public/requestBody')

class FileUploadController extends Controller {
  async uploadFile() {
    const { ctx } = this
    const parts = ctx.multipart({ autoFields: true })
    let files = {}
    let stream
    while ((stream = await parts()) != null) {
      if (!stream.filename) {
        break
      }
      const fieldname = stream.fieldname // file表单的名字
      // 上传图片的目录
      const dir = await this.service.uploadFileTools.getUploadFile(
        stream.filename
      )
      const target = dir.uploadDir
      const writeStream = fs.createWriteStream(target)

      await pump(stream, writeStream)

      files = Object.assign(files, {
        [fieldname]: dir.saveDir
      })
    }

    if (Object.keys(files).length > 0) {
      ctx.body = success(files)
    } else {
      ctx.body = fail('图片上传失败')
    }
  }
}

module.exports = FileUploadController
