
const packRepository = require('../repository/packs')
const userRepository = require('../repository/users')
/**
 * Controller, creates new trekk plan with a packing list
 *
 * @param {any} req
 * @param {any} resp
 */
async function pack (req, resp) {
  let data = req.body.data
  await packRepository.newPack(data.name, data.date, data.trekk, data.pack, data.creator, data.users, data.id)
  userRepository.addPack(data.users, data.id)
  resp.status(200)
}

/**
 * Controller, set responsibility for pack item
 *
 * @param {any} req
 * @param {any} resp
 */
async function takeResp (req, resp) {
  await packRepository.takeResp(req.body.data)
  resp.status(200)
}

/**
 * Controller Delete pack item
 *
 * @param {any} req
 * @param {any} resp
 */
async function deleteitem (req, resp) {
  await packRepository.deletePackItem(req.body.data)
  resp.status(200)
}

/**
 * controller add item
 *
 * @param {any} req
 * @param {any} resp
 */
async function addItemToexisting (req, resp) {
  await packRepository.addItemToexisting(req.body.data)
  resp.status(200)
}

/**
 * controller delete plan
 *
 * @param {any} req
 * @param {any} resp
 */
async function deletePlan (req, resp) {
  await packRepository.deletePlan(req.body.data)
  await userRepository.deletePackPlan(req.body.data)
  resp.status(200)
}
module.exports = {
  pack,
  takeResp,
  deleteitem,
  addItemToexisting,
  deletePlan
}
