/*
 * @Date: 2021-06-12 12:37:42
 * @LastEditTime: 2021-06-18 21:31:59
 */
module.exports = (app) => {
  const { router, controller } = app
  router.post('/api/file/uploadFile', controller.file.fileUpload.uploadFile)
}
