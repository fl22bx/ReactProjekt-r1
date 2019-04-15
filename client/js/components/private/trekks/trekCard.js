import React from 'react'

/**
 * Preview of plan component
 *
 * @export
 * @class TrekCard
 * @extends {React.Component}
 */
export class TrekCard extends React.Component {
  friendlist () {
    return (this.props.state.users.map((friend, index) => {
      return (
        <div className='img'>
          <img src={this.userimg(friend)} alt='' />
          <p>{friend.name}</p>

        </div>

      )
    }
    ))
  }

  /**
   * user img
   *
   * @param {any} user
   * @returns
   * @memberof TrekCard
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

  render () {
    return (
      <div className='card'>
        <div className='trekcardbox right'>

          <div className='trekcardbox'>
            <table>
              <tbody>
                <tr>
                  <th>Datum:</th>
                  <td>{this.props.state.date}</td>
                </tr>
                <tr>
                  <th> Namn::</th>
                  <td>{this.props.state.name}</td>
                </tr>
                <tr>
                  <th>Antal Mil:</th>
                  <td>{this.props.state.trekk}</td>
                </tr>
              </tbody>
            </table>

            <div className='participants'>
              <button onClick={this.props.addFriend}>Lägg Till Vän</button>
              <h1>vänner</h1>
              {this.friendlist()}
            </div>

          </div>

        </div>
      </div>
    )
  }
}
