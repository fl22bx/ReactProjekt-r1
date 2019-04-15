import React from 'react'
import { connect } from 'react-redux'
import { Flash } from '../partials/flash'
import { Nav } from '../partials/nav'
import { Profile } from './startPartials/profile'
import { Events } from './startPartials/uppcoming'
import { News } from './startPartials/News'
import { setProfileImg } from '../../redux/actions/profileImg'
import { emptyFlash } from '../../redux/actions/emtyFlash'
import { bindActionCreators } from 'redux'

const mapStateToProps = (store) => {
  return {
    user: store.user.user,
    profileImgUrl: store.profile.profileImgUrl,
    isFetched: store.data.fetched,
    notifications: store.notifications,
    packs: store.packs
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    dispatch: setProfileImg,
    emptyFlash: emptyFlash
  }, dispatch)
}

/**
 * logedIn componet
 *
 * @export
 * @class start
 * @extends {React.Component}
 */
@connect(mapStateToProps, mapDispatchToProps)

export class start extends React.Component {
  render () {
    return (
      <div>
        <Nav notifications={this.props.notifications} />

        <div className='wrapper'>
          <Flash />
          <Profile
            user={this.props.user}
            imgUrl={this.props.profileImgUrl} />

          <div className='content'>
            <div className='center'>
              <table className='tabcont'>
                <tbody>
                  <tr>
                    <td>
                      <Events packs={this.props.packs} />
                    </td>

                    <td>
                      <News packs={this.props.packs} notifications={this.props.notifications} />
                    </td>
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
