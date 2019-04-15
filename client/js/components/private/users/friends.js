import React from 'react'
import { connect } from 'react-redux'
import { Flash } from '../../partials/flash'
import { Nav } from '../../partials/nav'
import { Profile } from '../startPartials/profile'
const uuidv1 = require('uuid/v1')

const mapStateToProps = (store) => {
  return {
    user: store.user.user,
    profileImgUrl: store.profile.profileImgUrl,
    friends: store.friends,
    notifications: store.notifications,
    online: store.socket.online
  }
}

/**
 * Planner Component with redux connection
 */
@connect(mapStateToProps)

export class friends extends React.Component {
  userimg (user) {
    if (user.img === null) {
      return '/img/start/king.jpg'
    } else if (user.img === undefined) {
      return '/img/start/king.jpg'
    } else {
      return `/upploads/images/profile/${user.name}/profileImg/${user.img}`
    }
  }
  online (name) {
    let online = ''
    this.props.online.forEach(element => {
      if (element.name === name) {
        online = 'ONLINE'
      }
    })
    return online
  }

  friends () {
    return (
      this.props.friends.friends.map(item => {
        return (<tr key={uuidv1()}>
          <td>
            <img src={this.userimg(item)} alt='' />
          </td>
          <td>
            {item.name}
          </td>
          <td>
            {this.online(item.name)}
          </td>
        </tr>)
      })
    )
  }

  render () {
    return (
      <div>
        <Nav notifications={this.props.notifications} />
        <Profile
          user={this.props.user}
          imgUrl={this.props.profileImgUrl} />
        <div className='wrapper'>
          <Flash />

          <div className='allusers'>
            <h1>Hitta Vänner</h1>
            <table>
              <tbody>
                {this.friends()}
              </tbody>
            </table>

          </div>
        </div>
      </div>

    )
  }
}
