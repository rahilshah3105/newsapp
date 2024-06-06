import React, { Component } from 'react'
import loading from '../loading.gif'

export class Spinner extends Component {
  render() {
    return (
      <div className='d-flex justify-content-center'>
        {/* <div class="spinner-grow text-primary text-center" role="status"></div> */}
        <img src={loading} alt="loading" />
      </div>
    )
  }
}

export default Spinner
