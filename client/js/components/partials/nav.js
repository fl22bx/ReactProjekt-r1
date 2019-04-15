import React from 'react'
import { Link } from 'react-router-dom'

/**
 * Navigation component
 *
 * @export
 * @class Nav
 * @extends {React.Component}
 */
export class Nav extends React.Component {
  notNumber () {
    return this.props.notifications.friendrequest.length + this.props.notifications.resp.length + this.props.notifications.addnot.length + this.props.notifications.delNote.length
  }

  /**
   * Log out function
   *
   * @memberof Nav
   */
  logOut () {
    window.localStorage.removeItem('jwtToken')
  }

  render () {
    return (
      <div className='navbar'>
        <div className='links'>
          <ul>
            <li>
              <Link to='/'> Hem </Link>
            </li>
            <li>
              <Link to='/Plan'> Planera </Link>
            </li>

            <li>
              <Link to='/trekks'> Dina Vandringar </Link>
            </li>
            <li>
              <Link to='/yourFriends'> Dina Vänner </Link>
            </li>
            <li>
              <Link to='/findFriends'> Hitta Vänner </Link>
            </li>

          </ul>
        </div>
        <div className='settings'>
          <table>
            <tbody>
              <tr>
                <td className='noti'>
                  <Link to='/notifications'>{this.notNumber()}</Link>
                </td>
                <td >
                  <Link to='/settings'>
                    <div className='settimg' />
                  </Link>
                </td>
                <td>
                  <a href='/' onClick={this.logOut.bind(this)}>
                    <div className='logimg' />
                  </a>

                </td>
              </tr>
            </tbody>
          </table>

        </div>

      </div>
    )
  }
}
