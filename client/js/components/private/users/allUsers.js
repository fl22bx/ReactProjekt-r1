import React from 'react'
import { connect } from 'react-redux'
import { Flash } from '../../partials/flash'
import { Nav } from '../../partials/nav'
import { Profile } from '../startPartials/profile'
import { setProfileImg } from '../../../redux/actions/profileImg'
import {dispatchFlash} from '../../../redux/actions/flash'
import { bindActionCreators } from 'redux'

import axios from 'axios'

const mapStateToProps = (store) => {
  return {
    user: store.user.user,
    profileImgUrl: store.profile.profileImgUrl,
    allUsres: store.friends.allUsers,
    notifications: store.notifications
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    dispatch: setProfileImg,
    flash: dispatchFlash
  }, dispatch)
}

/**
 * Planner Component with redux connection
 */
@connect(mapStateToProps, mapDispatchToProps)

export class allUsers extends React.Component {
  userimg (user) {
    if (user.img === null) {
      return '/img/start/king.jpg'
    } else if (user.img === undefined) {
      return '/img/start/king.jpg'
    } else {
      return `/upploads/images/profile/${user.name}/profileImg/${user.img}`
    }
  }

  befriend (username) {
    axios.post('/api/friend', {
      headers: {
        'content-type': 'application/json'
      },
      data: {
        user: username,
        sender: this.props.user,
        sebderimg: this.props.profileImgUrl
      }

    })
      .catch(error => {
        this.setState({
          errors: error.response.data.error
        })
      })

    this.props.flash('Friend Request Sent', 'sucess')
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
                {this.props.allUsres.map(item => {
                  return (
                    item.username !== this.props.user
                      ? <tr key={item.username}>
                        <td >
                          <img src={this.userimg(item)} />
                        </td>
                        <td>{item.username}</td>
                        <td className='clickable' onClick={this.befriend.bind(this, item.username)}>
                          VänFörfrågan
                        </td>
                      </tr>
                      : null

                  )
                })}
              </tbody>
            </table>

          </div>
        </div>
      </div>

    )
  }
}
