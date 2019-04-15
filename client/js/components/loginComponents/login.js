import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { login } from '../../redux/actions/logIn'
import { Flash } from '../partials/flash'

/**
 * LogIn view component
 *
 * @export
 * @class Login
 * @extends {React.Component}
 */
@connect((store) => {
  return {
    user: store.user.user
  }
}, {
  login
})

export class Login extends React.Component {
  constructor () {
    super()
    this.state = {
      password: '',
      username: '',
      errors: ''
    }
  }

  /**
   * Event function on submit
   *
   * @param {any} e event
   * @memberof Login
   */
  onSubmit (e) {
    e.preventDefault()
    this.props.login(this.state)
  }

  /**
   * Event change
   * sets state
   * @param {any} e event
   * @memberof Login
   */
  change (e) {
    var state = this.state
    state[e.target.name] = e.target.value
    this.setState(state)
  }

  render () {
    return (
      <div className='login'>
        <div className='signinDiv'>
          <h1>VandringsPlaneraren</h1>
          <Flash />
          <form action='' className='signinForm' onSubmit={this.onSubmit.bind(this)}>
       Username: <br />
            <input name='username' type='Username' onChange={this.change.bind(this)} />  <br />
       Password <br />
            <input name='password' type='Password' onChange={this.change.bind(this)} />  <br />
            <button type='submit'>Logga In</button>
          </form>
          <Link to='/newuser'>Ny Användare</Link>
        </div>
      </div>
    )
  }
}
