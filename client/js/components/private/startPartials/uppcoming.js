import React from 'react'
const uuidv1 = require('uuid/v1')

/**
 * next trekk component
 *
 * @export
 * @class Events
 * @extends {React.Component}
 */
export class Events extends React.Component {
  /**
   * renders next trekk view
   *
   * @returns table item
   * @memberof Events
   */
  events () {
    let sorted = this.props.packs.packs.sort((a, b) => {
      return new Date(b.date) - new Date(a.date)
    })
    if (sorted[0] !== undefined) {
      return (
        sorted.map(item => {
          let date = new Date(item.date)
          var options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' }
          let formatedDate = date.toLocaleString('sv-SV', options)

          return (
            <div className=' box' key={uuidv1()}>
              <p className='header' key={uuidv1()}> {item.name}</p>
              <table key={uuidv1()}>
                <tbody >
                  <tr key={uuidv1()}>
                    <td key={uuidv1()}>
                      {formatedDate}
                    </td>
                    <td key={uuidv1()}>
                      Distans: {item.distance}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

          )
        })
      )
    }
  }

  render () {
    return (
      <div className='events'>
        <h3>Planerade Vandringar:</h3>

        {this.events()}

      </div>
    )
  }
}
