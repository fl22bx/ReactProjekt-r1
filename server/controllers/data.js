const repository = require('../repository/users')
const packs = require('../repository/packs')

/**
 * controller get all data
 *
 * @param {any} req
 * @param {any} resp
 */
async function data (req, resp) {
  let currentUser = await repository.getUser(req.user.username)
  let users = await repository.getAll()
  let data = {}
  let allUsers = []
  users.forEach(user => {
    allUsers.push({
      username: user.username,
      profileImg: user.profileImg
    })
  })

  data.packs = await packs.getPacks(currentUser.packs)
  let profileimg = currentUser.profileImg
  data.allUsers = allUsers
  data.profileImg = profileimg
  data.request = currentUser.friendrequest

  let friends = []
  currentUser.friends.forEach(friend => {
    let tmp = repository.findone(friend)
    friends.push(tmp)
  })
  let resolved = await Promise.all(friends)
  // promise skit vill ej resolva, promise all?
  let tmp = []
  resolved.forEach(item => {
    tmp.push({ name: item.username, img: item.profileImg })
  })
  data.friends = tmp
  resp.json(JSON.stringify(data))
}

module.exports = {
  data
}
