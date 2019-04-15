import React from 'react'
const uuidv1 = require('uuid/v1')

/**
 * Component for new trekks
 *
 * @export
 * @class News
 * @extends {React.Component}
 */
export class News extends React.Component {
  /**
   * sort and renders news
   *
   * @returns table item
   * @memberof News
   */
  sort () {
    let sorted = this.props.packs.packs.sort((a, b) => {
      return new Date(a.date) - new Date(b.date)
    })
    if (sorted[0] !== undefined) {
      return (
        sorted[0].pack.map(item => {
          return (
            <tr key={uuidv1()}>
              <td>
              Packning: {item.pack}
              </td>
              <td>
              Ansvar: {item.resp}
              </td>
            </tr>
          )
        })
      )
    }
  }

  render () {
    return (
      <div className='events'>
        <h3>Nästa vandrings Packningslista</h3>
        <div className='box'>

          <table>
            <tbody>
              {this.sort()}
            </tbody>
          </table>

        </div>
      </div>
    )
  }
}
