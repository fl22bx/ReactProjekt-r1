import React from 'react'
import { connect } from 'react-redux'
import ClassNames from 'classnames'
import { emptyFlash } from '../../redux/actions/emtyFlash'
import { bindActionCreators } from 'redux'

/**
 * Redux connections
 * @param {*} dispatch
 */
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    empty: emptyFlash
  }, dispatch)
}

/**
 * Component for flash messages
 *
 * @export
 * @class Flash
 * @extends {React.Component}
 */
@connect((store) => {
  return {
    flash: store.flash
  }
}, mapDispatchToProps)

export class Flash extends React.Component {
  /**
   * Empty state when flash unmounts
   *
   * @memberof Flash
   */
  componentWillUnmount () {
    this.props.empty()
  }

  render () {
    var flashClass = ClassNames({
      'success': this.props.flash.flashType === 'sucess',
      'danger': this.props.flash.flashType === 'error'
    })
    return (
      <div className={flashClass}>
        <p> {this.props.flash.msg} </p>
      </div>
    )
  }
}
