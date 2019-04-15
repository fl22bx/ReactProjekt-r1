
import React from 'react'
import axios from 'axios'

const url = '/api/header/img'

/**
 * uppload component
 *
 * @export
 * @class Uppload
 * @extends {React.Component}
 */
export class Uppload extends React.Component {
  constructor () {
    super()
    this.state = {
      file: null,
      preview: null,
      user: null
    }
  }

  /**
   * set stat ewhen component moiunts
   *
   * @memberof Uppload
   */
  componentDidMount () {
    var state = this.state
    state.user = this.props.user
    this.setState(state)
  }

  /**
   * handels submit event
   *
   * @param {any} e
   * @memberof Uppload
   */
  submit (e) {
    e.preventDefault()
  }

  /**
   * Post new file
   *
   * @param {any} e
   * @memberof Uppload
   */
  save (e) {
    let form = new window.FormData()
    form.append('user', this.state.user)
    form.append('id', this.props.name)
    form.append('img', this.state.file)

    const config = { headers: { 'Content-Type': 'multipart/form-data' } }

    axios.post(url,
      form, config
    ).then(resp => {
      this.props.dispatch(resp.data.success)
    })
  }

  /**
   * handels event change
   *
   * @param {any} e
   * @memberof Uppload
   */
  change (e) {
    let state = this.state
    let img = e.target.files[0]

    let reader = new window.FileReader()

    reader.onloadend = function () {
      state.preview = reader.result
      state.file = img
      this.setState(state)
    }.bind(this)

    reader.readAsDataURL(img)
  }

  render () {
    return (
      <div className='uppload'>
        <div className='close' onClick={this.props.close}>X</div>
        <form onSubmit={this.submit.bind(this)}>
          <input type='file' name={this.props.name} accept='image/*' onChange={this.change.bind(this)} />
          <button onClick={this.save.bind(this)}>Spara</button>
        </form>
        <div className='imgupp'>

          <img src={this.state.preview} />
        </div>

      </div>
    )
  }
}
