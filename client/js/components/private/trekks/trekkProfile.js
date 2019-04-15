import React from 'react'
import { connect } from 'react-redux'
import { Flash } from '../../partials/flash'
import { Nav } from '../../partials/nav'
import { Profile } from '../startPartials/profile'
import axios from 'axios'
import { takeresp, deleteItemRealTime, addPack } from '../../../helpers/socket.io'
const uuidv1 = require('uuid/v1')

const mapStateToProps = (store) => {
  return {
    user: store.user.user,
    profileImgUrl: store.profile.profileImgUrl,
    packs: store.packs.packs,
    notifications: store.notifications,
    socket: store.socket

  }
}

/**
 * overview of plan component
 *
 * @export
 * @class trekkProfile
 * @extends {React.Component}
 */
@connect(mapStateToProps)

export class trekkProfile extends React.Component {
  constructor () {
    super()
    this.state = {
      pack: '',
      resp: {},
      users: []
    }
  }

  /**
   * sets wich pack
   *
   * @memberof trekkProfile
   */
  componentDidMount () {
    var state = this.state
    this.props.packs.forEach(element => {
      if (element.id === this.props.match.params.id) {
        state.pack = element
        state.users = element.users
      }
    })
    this.setState(state)
  }

  /**
   * formats date
   *
   * @param {any} date
   * @returns
   * @memberof trekkProfile
   */
  dateformat (date) {
    let tmp = new Date(date)
    var options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' }
    return tmp.toLocaleString('sv-SV', options)
  }

  /**
   * delete pack item
   *
   * @param {any} id
   * @memberof trekkProfile
   */
  delete (id) {
    axios.post('/api/trekk/deleteItem', {
      headers: {
        'content-type': 'application/json'
      },
      data: {
        id: this.props.match.params.id,
        Packid: id,
        user: this.props.user
      }

    })
      .catch(error => {
        this.setState({
          errors: error.response.data.error
        })
      })

    let data = {
      id: this.props.match.params.id,
      Packid: id,
      user: this.props.user
    }
    deleteItemRealTime(this.props.socket.socket, this.props.user, this.props.socket.online, this.state.users, data)
  }

  /**
   * handles take responibility for pack item
   *
   * @param {any} id
   * @memberof trekkProfile
   */
  takeres (id) {
    let data = {
      id: this.props.match.params.id,
      Packid: id,
      user: this.props.user
    }
    takeresp(this.props.socket.socket, this.props.user, this.props.socket.online, this.state.users, data)
    axios.post('/api/trekk/takeresp', {
      headers: {
        'content-type': 'application/json'
      },
      data: {
        id: this.props.match.params.id,
        Packid: id,
        user: this.props.user
      }

    })
      .catch(error => {
        this.setState({
          errors: error.response.data.error
        })
      })
  }

  /**
   * renders packlist
   *
   * @returns table item
   * @memberof trekkProfile
   */
  packlist () {
    let pack = null

    this.props.packs.map(element => {
      if (element.id === this.props.match.params.id) {
        pack = element
      }
    })

    if (pack !== null) {
      return (
        pack.pack.map(item => {
          return (
            <tr key={uuidv1()}>
              <td>
                {item.pack}
              </td>
              <td>
                <button onClick={this.delete.bind(this, item.id)}>Delete</button>
              </td>
              <td>
                {item.resp ? item.resp : <button onClick={this.takeres.bind(this, item.id)}>Ta Ansvar</button> }

              </td>
            </tr>)
        })
      )
    }
  }

  /**
   * renders friendlist
   *
   * @returns div with friend
   * @memberof trekkProfile
   */
  friendlist () {
    let pack = null

    this.props.packs.map(element => {
      if (element.id === this.props.match.params.id) {
        pack = element
      }
    })

    if (pack !== null) {
      return (
        pack.users.map(friend => {
          return (
            <div className='imgtrekk'>
              <img src={this.userimg(friend)} alt='' />
              <div className='name'>{friend.name}</div>

            </div>)
        })
      )
    }
  }

  /**
   * sets friend img
   *
   * @param {any} user
   * @returns img adress
   * @memberof trekkProfile
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
   * add new pack item
   *
   * @param {any} e
   * @memberof trekkProfile
   */
  addPack (e) {
    let data = {
      id: this.state.pack.id,
      add: {pack: e.target[0].value, id: uuidv1()},
      user: this.props.user

    }
    e.preventDefault()
    axios.post('/api/trekk/addPack', {
      headers: {
        'content-type': 'application/json'
      },
      data: data

    })
      .catch(error => {
        this.setState({
          errors: error.response.data.error
        })
      })

    addPack(this.props.socket.socket, this.props.user, this.props.socket.online, this.state.users, data)
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

          <div className='trekkprofile'>

            <div className='tprofile'>
              <table >
                <tbody>
                  <tr>
                    <td>Namn: {this.state.pack.name}</td>
                  </tr>
                  <tr>
                    <td>Datum: {this.dateformat(this.state.pack.date)}</td>
                  </tr>
                  <tr>
                    <td>Skapare: {this.state.pack.creator}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className='tfriends'>
              <h3>Deltagare</h3>
              {this.friendlist()}

            </div>
            <div className='tpacklist'>
              <h3>Packning</h3>
              <table>
                <tbody>
                  {this.packlist()}
                  <tr key={uuidv1()}>
                    <form action='' onSubmit={this.addPack.bind(this)}>
                      <td>
                        <input type='text' />
                      </td>
                      <td>
                        <button>Lägg till</button>
                      </td>
                    </form>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
