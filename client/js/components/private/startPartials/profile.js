import React from 'react'

/**
 * Profile component
 *
 * @export
 * @class Profile
 * @extends {React.Component}
 */
export class Profile extends React.Component {
  render () {
    return (
      <div className='profile'>

        <div className='profilePic'>
          {
            this.props.imgUrl !== null
              ? <img src={`/upploads/images/profile/${this.props.user}/profileImg/${this.props.imgUrl}`} />
              : <img src='/img/start/king.jpg' />
          }
        </div>
        <ul>
          <li>
           Namn: {this.props.user}
          </li>
        </ul>
      </div>
    )
  }
}
