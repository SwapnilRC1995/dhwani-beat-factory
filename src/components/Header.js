import React from 'react';
import dhwaniLogo from '../image/dhwani-logo-full.png';

export default class Header extends React.Component {
  render(){
    return (
      <div>
        <div className="navbar navbar-expand-sm header-navbar navbar-box-shadow col-xl-12 col-lg-12 d-flex">      
          <div className="col-xl-12 col-lg-12 container mx-0 pr-0">
            <div className="col-xl-12 col-lg-12 px-0 d-flex align-items-center">
                <img src={dhwaniLogo} alt="Dhwani logo" className="dhwani-header-logo"/>
                <label className="dhwani-header-title ml-md-5 ml-3">Dhwani Beat Factory</label>
            </div>
          </div>
        </div>
    </div>
    );
  }  
}
