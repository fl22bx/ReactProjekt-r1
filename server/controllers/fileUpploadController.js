
const multer = require('multer')
const mkdirp = require('mkdirp')
const path = require('path')
const repository = require('../repository/users')

let imgUrl = null
let type = null

// Storage Engine
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    let dirPath = './client/upploads/images/profile/' +
      req.user.username + '/' + req.body.id

    mkdirp(dirPath, function (err) {
      if (err) console.error(err)
      else {
        callback(null, dirPath)
      }
    })
  },
  filename: (req, file, callback) => {
    let imgName = file.fieldname + Date.now() + path.extname(file.originalname)
    callback(null, imgName)

    updateDB(req.body.id, imgName, req.user.username)

    imgUrl = imgName
    type = req.body.id
  }
})

let upload = multer({storage: storage}).single('img')

/**
 * Get img url for user
 *
 * @param {any} req
 * @param {any} resp
 */
async function img (req, resp) {
  upload(req, resp, function (e) {
    if (e) {
      resp.status(400).send({error: 'Kunde inte ladda upp bilden, Vänligen försök igen'})
    } else {
      resp.status(200).send({ success: imgUrl, type: type })
    }
  })
}

/**
 * update bd when pic cahnge
 *
 * @param {any} action
 * @param {any} url
 * @param {any} id
 */
async function updateDB (action, url, id) {
  if (action === 'headerimg') {
    await repository.updateHeaderImg(id, url)
  }
  if (action === 'profileImg') {
    await repository.updateProfileImg(id, url)
  }
}

module.exports = {
  img
}
