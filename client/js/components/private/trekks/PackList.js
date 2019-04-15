import React from 'react'

/**
 * List of pack items component
 *
 * @export
 * @class PackList
 * @extends {React.Component}
 */
export class PackList extends React.Component {
  /**
   * removes pack item
   *
   * @param {any} event
   * @memberof PackList
   */
  click (event) {
    event.preventDefault()
    this.props.remove(event.target.id)
  }

  render () {
    return (
      <div className='list'>
        <ul>
          {
            this.props.items.map((item, index) => <li key={index}> <button id={index} onClick={this.click.bind(this)}>X</button> {item.pack} </li>)
          }

        </ul>
      </div>
    )
  }
}
