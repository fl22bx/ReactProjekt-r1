import React from 'react'
import { connect } from 'react-redux'
import { Flash } from '../../partials/flash'
import { Nav } from '../../partials/nav'
import { Profile } from '../startPartials/profile'
import { setProfileImg } from '../../../redux/actions/profileImg'
import { bindActionCreators } from 'redux'
import { Uppload } from '../startPartials/upploadImg'

/**
 * Redux connection
 */
const mapStateToProps = (store) => {
  return {
    user: store.user.user,
    profileImgUrl: store.profile.profileImgUrl,
    notifications: store.notifications
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    dispatch: setProfileImg
  }, dispatch)
}

/**
 * Settings component
 *
 * @export
 * @class Settings
 * @extends {React.Component}
 */
@connect(mapStateToProps, mapDispatchToProps)

export class Settings extends React.Component {
  constructor () {
    super()
    this.state = {
      showUppload: false
    }
  }

  /**
   * uppload event handler
   *
   * @param {any} e
   * @memberof Settings
   */
  uppload (e) {
    e.preventDefault()
    let state = this.state
    state.showUppload = !this.state.showUppload
    this.setState(state)
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
            this.state.showUppload
              ? <Uppload
                name='profileImg'
                user={this.props.user}
                dispatch={this.props.dispatch}
                profileImg={this.props.profileImg}
                close={this.uppload.bind(this)} />
              : null
          }

          <div className='sett'>
            <h1>Settings</h1>
            <table>
              <tbody>
                <tr>
                  <td>Byt Profil Bild</td>
                  <td><a href='#' onClick={this.uppload.bind(this)}>Redigera </a></td>
                </tr>
              </tbody>
            </table>

          </div>
        </div>
      </div>

    )
  }
}
