import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Flash } from '../../partials/flash'
import { Nav } from '../../partials/nav'
import { TrekCard } from './trekCard'
import { Profile } from '../startPartials/profile'
import { setProfileImg } from '../../../redux/actions/profileImg'
import { bindActionCreators } from 'redux'
import { newTrekk } from '../../../helpers/socket.io'
import {PackList} from './PackList'
import {AddFriend} from './addFriendsComponent'
const uuidv1 = require('uuid/v1')

const url = '/api/planner/plan'
const mapStateToProps = (store) => {
  return {
    user: store.user.user,
    profileImgUrl: store.profile.profileImgUrl,
    notifications: store.notifications,
    socket: store.socket,
    friends: store.friends
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    dispatch: setProfileImg
  }, dispatch)
}

/**
 * planner component
 *
 * @export
 * @class Plan
 * @extends {React.Component}
 */
@connect(mapStateToProps, mapDispatchToProps)

export class Plan extends React.Component {
  constructor () {
    super()
    this.state = {
      pack: [],
      current: '',
      date: '',
      name: '',
      trekk: '',
      creator: '',
      users: [],
      id: uuidv1(),
      showFriendList: false

    }
  }

  /**
   * sets state when component mounts
   *
   * @memberof Plan
   */
  componentDidMount () {
    var state = this.state
    state.creator = this.props.user
    this.setState(state)
  }

  /**
   * change event handler
   *
   * @param {any} e
   * @memberof Plan
   */
  change (e) {
    var state = this.state
    state[e.target.name] = e.target.value
    this.setState(state)
  }

  /**
   * add pack item
   *
   * @param {any} event
   * @memberof Plan
   */
  add (event) {
    event.preventDefault()
    let Packlist = this.state.pack

    Packlist.push({pack: this.state.current, id: uuidv1()})
    this.setState({
      pack: Packlist
    })
    this.refs.pack.value = ''
  }

  /**
 *
 removes pack item*
 * @param {any} index
 * @memberof Plan
 */
  remove (index) {
    let Packlist = this.state.pack
    Packlist.splice(index, 1)
    this.setState({
      pack: Packlist
    })
  }

  /**
   * saves plan
   *
   * @param {any} event
   * @memberof Plan
   */
  save (event) {
    console.log('save')
    let state = this.state

    state.users.push({name: this.props.user, img: this.props.profileImgUrl})
    this.setState(state)

    event.preventDefault()

    axios.post(url, {
      headers: {
        'content-type': 'application/json'
      },
      data: this.state

    })
      .catch(error => {
        this.setState({
          errors: error.response.data.error
        })
      })

    newTrekk(this.props.socket.socket,
      this.props.user, this.props.socket.online,
      this.state)

    this.props.history.push('/trekks')
  }

  /**
   * loads add friend component
   *
   * @memberof Plan
   */
  addFriend () {
    let state = this.state
    state.showFriendList = !this.state.showFriendList

    this.setState(state)
  }

  /**
   * adds froend to trekk
   *
   * @param {any} friend
   * @memberof Plan
   */
  addToTrekklist (friend) {
    let state = this.state

    let double = false
    state.users.forEach(x => {
      if (x.name === friend.name) {
        double = true
      }
    })
    if (!double) {
      state.users.push(friend)
      this.setState(state)
    }
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

          {
            this.state.showFriendList
              ? <AddFriend
                close={this.addFriend.bind(this)}
                friends={this.props.friends}
                addToTrekklist={this.addToTrekklist.bind(this)}
              />
              : null
          }

          <div className='plan'>
            <table className='table'>
              <tbody>
                <tr>
                  <td>
                    <input name='date' type='date' placeholder='Datum' onChange={this.change.bind(this)} />
                    <input name='name'type='text' placeholder='Namn' onChange={this.change.bind(this)} />
                    <input name='trekk'type='text' placeholder='Mil' onChange={this.change.bind(this)} />
                    <button onClick={this.save.bind(this)}>Save</button>

                    <p>
                    -------------------------------------
                    </p>

                    <input ref='pack' name='current'type='text' placeholder='Packning' onChange={this.change.bind(this)} />
                    <button onClick={this.add.bind(this)}>Add</button>

                    <h3>Packning</h3>

                    <PackList items={this.state.pack} remove={this.remove.bind(this)} />

                  </td>

                  <td>
                    <div className='trekcardbox'>

                      <TrekCard pack={this.state.pack} addFriend={this.addFriend.bind(this)} state={this.state} />
                    </div>

                  </td>
                </tr>

              </tbody>
            </table>

          </div>

        </div>
      </div>

    )
  }
}
