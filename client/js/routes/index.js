import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Login } from '../components/loginComponents/login'
import { start } from '../components/private/startComponent'
import { Newuser } from '../components/loginComponents/newUser'
import { allUsers } from '../components/private/users/allUsers'
import { friends } from '../components/private/users/friends'
import { yourTrekks } from '../components/private/trekks/yourtrekks'
import { Loader } from '../components/loader/loader'
import { trekkProfile } from '../components/private/trekks/trekkProfile'
import { Plan } from '../components/private/trekks/planComponent'
import { connect } from 'react-redux'
import { Settings } from '../components/private/settings/settings'
import { notifications } from '../components/private/settings/notifications'
import { bindActionCreators } from 'redux'
import { getData } from '../redux/actions/data'

const mapStateToProps = (store) => {
  return {
    Authenticated: store.user.Authenticated,
    data: store.data.fetched

  }
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getData: getData
  }, dispatch)
}
/**
 * Client Routes
 *
 * @export
 * @class router
 * @extends {React.Component}
 */
@connect(mapStateToProps, mapDispatchToProps)

export default class router extends React.Component {
  /**
   * checks if authenticated
   *
   * @returns
   * @memberof router
   */
  authenticate () {
    if (this.props.Authenticated) {
      this.props.getData()
      return true
    } else { return false }
  }

  render () {
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/' exact component={this.authenticate() ? this.props.data ? start : Loader : Login} />
          <Route path='/newuser' component={Newuser} />
          <Route path='/Plan' component={this.props.data ? Plan : Loader} />
          <Route path='/settings' component={this.props.data ? Settings : Loader} />
          <Route path='/findFriends' component={this.props.data ? allUsers : Loader} />
          <Route path='/trekks' component={this.props.data ? yourTrekks : Loader} />
          <Route path='/trekkprofile:id' component={this.props.data ? trekkProfile : Loader} />
          <Route path='/notifications' component={this.props.data ? notifications : Loader} />
          <Route path='/yourFriends' component={this.props.data ? friends : Loader} />
        </Switch>
      </BrowserRouter>
    )
  }
}

// HÄR KAN MAN KOLLA OM AUTH I REDUX OCH RENEDERA KOMPONENT EFTER DET {AUTH ? LOGIN : STATSITE}
// ÄVEN PROTECTED ROUTES
