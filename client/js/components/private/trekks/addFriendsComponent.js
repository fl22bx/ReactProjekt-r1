import React from 'react'

/**
 * Add friend to rekk component
 *
 * @export
 * @class AddFriend
 * @extends {React.Component}
 */
export class AddFriend extends React.Component {
  /**
   * render user img or standard img
   *
   * @param {any} userimg
   * @returns
   * @memberof AddFriend
   */
  userimg (user) {
    if (user.img === null) {
      return '/img/start/king.jpg'
    } else if (user.img === undefined) {
      return '/img/start/king.jpg'
    } else {
      return `/upploads/images/profile/${user.name}/profileImg/${user.img}`
    }
  }

  /**
   * renders list of user
   *
   * @returns div with user
   * @memberof AddFriend
   */
  friendlist () {
    return (this.props.friends.friends.map((friend, index) => {
      return (
        <div className='img'>
          <img src={this.userimg(friend)} alt='' onClick={this.add.bind(this, friend)} />
          {friend.name}
        </div>

      )
    }
    ))
  }

  /**
   * Add friends to trekk
   *
   * @param {any} friend
   * @memberof AddFriend
   */
  add (friend) {
    this.props.addToTrekklist(friend)
    this.props.close()
  }

  render () {
    return (

      <div className='addFriends'>

        <div className='close' onClick={this.props.close}>X</div>
        {this.friendlist()}

      </div>
    )
  }
}
