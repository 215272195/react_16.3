import React from 'react';
import logoImage from './job.png'
import './logo.css'
class Logo extends React.Component {
  render() {
    return (
      <div>
        <div className="logo-container">
          <img src={logoImage} alt="logo"/>
        </div>
      </div>
    )
  }
}

export default Logo;