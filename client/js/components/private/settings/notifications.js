import React from 'react'
import { connect } from 'react-redux'
import { Flash } from '../../partials/flash'
import { Nav } from '../../partials/nav'
import { Profile } from '../startPartials/profile'
import { emtpyNotification } from '../../../redux/actions/emptyNot'
import axios from 'axios'
import { bindActionCreators } from 'redux'

/**
 * Redux connection
 *
*/
const mapStateToProps = (store) => {
  return {
    user: store.user.user,
    profileImgUrl: store.profile.profileImgUrl,
    notifications: store.notifications,
    packs: store.packs.packs
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    dispatch: emtpyNotification
  }, dispatch)
}

/**
 * Notification component
 *
 * @export
 * @class notifications
 * @extends {React.Component}
 */
@connect(mapStateToProps, mapDispatchToProps)

export class notifications extends React.Component {
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
   * Empty notification when component unmounts
   *
   * @memberof notifications
   */
  componentWillUnmount () {
    this.props.dispatch()
  }

  /**
   * sends a friendrequest
   *
   * @returns
   * @memberof notifications
   */
  friendrequests () {
    return (
      this.props.notifications.friendrequest.map(item => {
        return (
          <tr>
            <td>
              <img src={this.userimg(item.user)} alt='' />

            </td>

            <td>
              {item.sender}
            </td>
            <td>
              <button onClick={this.accept.bind(this, item)}>Acceptera</button>
            </td>
          </tr>
        )
      })
    )
  }

  /**
   * formats date
   *
   * @param {any} date
   * @returns
   * @memberof notifications
   */
  dateformat (date) {
    let tmp = new Date(date)
    var options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' }
    return tmp.toLocaleString('sv-SV', options)
  }

  /**
   * Renders notification in table
   *
   * @returns table items
   * @memberof notifications
   */
  respNotifications () {
    return (this.props.packs.map(element => {
      return (this.props.notifications.addnot.map(ietm => {
        if (element.id === ietm.id) {
          return (<tr>
            <td>
              {ietm.user} lade till ett packningsföremål
            </td>
            <td>
             Vandrings Namn: {element.name}
            </td>
            <td>
             Planerat Datum: {this.dateformat(element.date)}
            </td>
          </tr>)
        }
      }))
    }))
  }

  /**
   * post acceptance of friendship
   *
   * @param {any} item
   * @memberof notifications
   */
  accept (item) {
    axios.post('/api/acceptfriend', {
      headers: {
        'content-type': 'application/json'
      },
      data: {
        item: item
      }

    })
      .catch(error => {
        this.setState({
          errors: error.response.data.error
        })
      })
  }

  /**
 * renders pack notification
 *
 * @returns table item
 * @memberof notifications
 */
  addnot () {
    return (this.props.packs.map(element => {
      return (this.props.notifications.resp.map(ietm => {
        if (element.id === ietm.id) {
          return (<tr>
            <td>
              {ietm.user} tog ansvar för ett packningsföremål
            </td>
            <td>
               Vandrings Namn: {element.name}
            </td>
            <td>
               Planerat Datum: {this.dateformat(element.date)}
            </td>
          </tr>)
        }
      }))
    }))
  }

  /**
 * renders felete notification
 *
 * @returns table item
 * @memberof notifications
 */
  delNote () {
    return (this.props.notifications.delNote.map(ietm => {
      return (<tr>
        <td>
          {ietm.user} Tog bort Vandring
        </td>
        <td>
               Vandrings Namn: {ietm.plan.name}
        </td>
        <td>
               Planerat Datum: {this.dateformat(ietm.plan.date)}
        </td>
      </tr>)
    }))
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

          <div className='sett'>
            <h1>Notifications</h1>
            <table className='friendreq'>
              <h3>VänFörfrågningar</h3>
              <tbody>
                {this.friendrequests()}
              </tbody>
            </table>
            <p>-----------------</p>
            <table>
              <tbody>
                {this.respNotifications()}
              </tbody>
            </table>
            <table>
              <tbody>
                {this.addnot()}
              </tbody>
            </table>

            <table>
              <tbody>
                {this.delNote()}
              </tbody>
            </table>

          </div>
        </div>
      </div>

    )
  }
}
