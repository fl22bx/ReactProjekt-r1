
const User = require('../models/userSheme')
/**
 * Creates new User in the DB
 *
 * @param {any} email
 * @param {any} username
 * @param {any} password
 * @returns
 */
function newUser (email, username, password) {
  let newUser = new User({
    email: email,
    username: username,
    password: password,
    profileImg: null,
    headerImg: null,
    friends: [],
    packs: []
  })

  return newUser.save()
}
/**
 * Gets one user from DB
 *
 * @param {any} username
 * @returns User
 */
function getUser (username) {
  return User.findOne({
    username: username
  })
}

/**
 * update
 *
 * @param {any} id
 * @param {any} uppdate
 */
function updateProfileImg (username, uppdate) {
  return User.findOneAndUpdate({username: username}, {profileImg: uppdate}, { 'new': true })
}

/**
 * get all users
 *
 * @returns all users
 */
function getAll () {
  return User.find({})
}

function addPack (usersArray, packId) {
  return usersArray.forEach(element => {
    User.findOneAndUpdate({username: element.name},
      {$push: {packs: packId}},
      {safe: true, upsert: true},
      function (err, doc) {
        if (err) {
          console.log(err)
        }
      }
    )
  })
}

/**
 * set friendrequests
 *
 * @param {any} obj
 */
async function befriend (obj) {
  let tmp = await User.findOne({username: obj.user})
  let exists = false
  for (let i = 0; i < tmp.friendrequest.length; i++) {
    if (tmp.friendrequest[i].sender === obj.sender) {
      exists = true
    }
  }

  for (let i = 0; i < tmp.friends.length; i++) {
    if (tmp.friends[i].sender === obj.sender) {
      exists = true
    }
  }

  if (!exists) {
    User.findOneAndUpdate({username: obj.user},
      {$push: {friendrequest: obj}},
      {safe: true, upsert: true},
      function (err, doc) {
        if (err) {
          console.log(err)
        }
      }
    )
  }
}

/**
 * accpet friendsrequest and set friend
 *
 * @param {any} obj
 */
async function accept (obj) {
  await User.findOneAndUpdate({username: obj.item.sender},
    {$push: {friends: obj.item.user}},
    {safe: true, upsert: true},
    function (err, doc) {
      if (err) {
        console.log(err)
      }
    }
  )

  let user = await User.findOne({username: obj.item.user})
  user.friends.push(obj.item.sender)
  for (let i = 0; i < user.friendrequest.length; i++) {
    if (user.friendrequest[i].user === obj.item.user && user.friendrequest[i].sender === obj.item.sender) {
      user.friendrequest.splice(i, 1)
    }
  }
  await User.findOneAndUpdate({username: obj.item.user},
    {
      friends: user.friends,
      friendrequest: user.friendrequest
    }
  )
}

/**
 *  get one user
 *
 * @param {any} username
 * @returns
 */
async function findone (username) {
  let tmp = await User.findOne({username: username})
  return tmp
}

async function deletePackPlan (data) {
  data.users.forEach(async function (user) {
    let tmp = await User.findOne({
      username: user.name
    })

    for (let i = 0; i < tmp.packs.length; i++) {
      if (tmp.packs[i] === data.id) {
        tmp.packs.splice(i, 1)
      }
    }
    await User.findOneAndUpdate({username: user.name}, {packs: tmp.packs})
  })
}

module.exports = {
  newUser,
  getUser,
  updateProfileImg,
  getAll,
  addPack,
  befriend,
  accept,
  findone,
  deletePackPlan
}
