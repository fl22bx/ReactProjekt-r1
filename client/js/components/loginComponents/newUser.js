import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
const url = '/api/user/signup'

/**
 * New user for component
 *
 * @export
 * @class Newuser
 * @extends {React.Component}
 */
export class Newuser extends React.Component {
  constructor () {
    super()
    this.state = {
      password: '',
      confirmPassword: '',
      username: '',
      email: '',

      errors: null
    }
  }

  /**
   * event Change
   * Sets state
   * @param {any} e event
   * @memberof Newuser
   */
  change (e) {
    let state = this.state
    state[e.target.name] = e.target.value
    this.setState(state)
  }

  /**
   * on submit event
   *
   * @param {any} e event
   * @memberof Newuser
   */
  onSubmit (e) {
    e.preventDefault()
  }

  /**
 * Posts new user to sever
 *
 * @memberof Newuser
 */
  post () {
    if (this.state.password !== this.state.confirmPassword) {
      this.setState({
        errors: 'Lösenord matchar inte'
      })
    } else {
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
    }
  }

  render () {
    return (
      <div className='login'>
        <div className='signinDiv newuser'>
          <h1>Ny Användare</h1>
          <form method='post' onSubmit={this.onSubmit.bind(this)}>
            Användar Namn: <br />
            <input type='text' name='username' onChange={this.change.bind(this)} />
            E-post: <br />
            <input type='Email' name='email' onChange={this.change.bind(this)} />
            Lösenord: <br />
            <input type='Password' name='password' onChange={this.change.bind(this)} />
            Bekräfta Lösenord: <br />
            <input type='password' name='confirmPassword' onChange={this.change.bind(this)} />
            <p > {this.state.errors} </p>
            <button type='submit' onClick={this.post.bind(this)}>Submit</button>
            <Link to='/'>Start</Link>
          </form>
        </div>
      </div>

    )
  }
}
