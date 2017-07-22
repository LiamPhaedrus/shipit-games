import React, { Component }  from 'react';
import { Link } from 'react-router'

class HomePage extends Component {
  constructor (props) {
    super(props)
  }

  render () {

    return (
      <div>
        <div className="center-me">
          <h1>Welcome to Ship It Games!</h1>
          <h3>Please select a game...</h3>
        </div>
        <div className='tiles'>
          <h2><Link to='/war' className='home-tile' id='war-tile'>
            War
          </Link></h2>
        </div>
      </div>
    )
  }
}

export default HomePage
