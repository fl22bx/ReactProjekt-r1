const Packs = require('../models/planSheme')
/**
 * Creates a new plan in the DB
 *
 * @param {any} name
 * @param {any} date
 * @param {any} partOf
 * @param {any} packList
 * @param {any} creator
 * @param {any} users
 * @returns
 */
function newPack (name, date, distance, packList, creator, users, uid) {
  let newPack = new Packs({
    name: name,
    date: date,
    distance: distance,
    pack: packList,
    creator: creator,
    users: users,
    id: uid
  })

  return newPack.save()
}

/**
 * Get packs from array with id
 *
 * @param {any} array
 * @returns
 */
async function getPacks (array) {
  let tmpArray = []
  for (let i = 0; i < array.length; i++) {
    let tmp = await Packs.findOne({
      id: array[i]
    })
    tmpArray.push(tmp)
  }
  return tmpArray
}

/**
 * Set resp in db
 *
 * @param {any} obj
 */
async function takeResp (obj) {
  let pack = await Packs.findOne({
    id: obj.id
  })
  for (let i = 0; i < pack.pack.length; i++) {
    if (pack.pack[i].id === obj.Packid) {
      pack.pack[i].resp = obj.user
    }
  }
  await Packs.findOneAndUpdate({id: obj.id}, {pack: pack.pack})
}

/**
 * delete pack item from db
 *
 * @param {any} obj
 */
async function deletePackItem (obj) {
  let pack = await Packs.findOne({
    id: obj.id
  })
  for (let i = 0; i < pack.pack.length; i++) {
    if (pack.pack[i].id === obj.Packid) {
      pack.pack.splice(i, 1)
    }
  }
  await Packs.findOneAndUpdate({id: obj.id}, {pack: pack.pack})
}

/**
 * Add pack item to existing
 *
 * @param {any} obj
 */
async function addItemToexisting (obj) {
  await Packs.findOneAndUpdate({id: obj.id},
    {$push: {pack: obj.add}},
    {safe: true, upsert: true},
    function (err, doc) {
      if (err) {
        console.log(err)
      }
    }
  )
}

/**
 * delete plan
 *
 * @param {any} data
 */
async function deletePlan (data) {
  await Packs.findOneAndRemove({id: data.id})
}

module.exports = {
  newPack,
  getPacks,
  takeResp,
  deletePackItem,
  addItemToexisting,
  deletePlan
}
