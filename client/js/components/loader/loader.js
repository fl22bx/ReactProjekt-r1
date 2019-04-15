import React from 'react'

/**
 * Loader Component
 *
 * @export
 * @class Loader
 * @extends {React.Component}
 */
export class Loader extends React.Component {
  render () {
    return (
      <div className='login'>
        <div className='signinDiv'>
          <h1>Laddar Data</h1>
          <div className='loader' />
        </div>
      </div>
    )
  }
}
