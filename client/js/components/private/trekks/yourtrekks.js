import React from 'react'
import { connect } from 'react-redux'
import { Flash } from '../../partials/flash'
import { Nav } from '../../partials/nav'
import { Profile } from '../startPartials/profile'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { deletePlanRealTime } from '../../../helpers/socket.io'

const mapStateToProps = (store) => {
  return {
    user: store.user.user,
    profileImgUrl: store.profile.profileImgUrl,
    packs: store.packs,
    notifications: store.notifications,
    socket: store.socket
  }
}

/**
 * List of all planned trekks
 *
 * @export
 * @class yourTrekks
 * @extends {React.Component}
 */
@connect(mapStateToProps)

export class yourTrekks extends React.Component {
  /**
   * renders list of trekks
   *
   * @returns table item
   * @memberof yourTrekks
   */
  list () {
    if (this.props.packs.packs.length > 0) {
      return this.props.packs.packs.map(item => {
        let date = new Date(item.date)
        var options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' }
        let formatedDate = date.toLocaleString('sv-SV', options)

        return (
          <tr key={item.id}>
            <td >Namn: {item.name}</td>
            <td >Skapare: {item.creator}</td>
            <td >Distans: {item.distance}</td>
            <td >Datum: {formatedDate}</td>
            <td><Link to={`/trekkprofile${item.id}`} params={{ trekk: item }} ><button>Överskåda</button> </Link></td>
            <td><button onClick={this.delete.bind(this, item)}>Ta Bort</button></td>

          </tr>

        )
      })
    }
  }

  /**
   * handles delete of trekk
   *
   * @param {any} item
   * @memberof yourTrekks
   */
  delete (item) {
    axios.post('/api/trekk/deletePlan', {
      headers: {
        'content-type': 'application/json'
      },
      data: {
        id: item.id,
        users: item.users
      }

    })
      .catch(error => {
        this.setState({
          errors: error.response.data.error
        })
      })

    let data = {
      id: item.id,
      user: this.props.user,
      plan: item
    }
    deletePlanRealTime(this.props.socket.socket,
      this.props.user,
      this.props.socket.online,
      item.users,
      data)
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
            <table>
              <tbody>
                {this.list()}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    )
  }
}
