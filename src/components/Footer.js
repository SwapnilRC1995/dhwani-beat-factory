import React from 'react';

export default class Footer extends React.Component {
  render(){
    return (
      <div className="mt-5 pt-5">
        <footer className="text-center text-white fixed-bottom footer-container">
            <div className="text-center p-3 footer-text">
                © 2021 Copyright :
                <a className="text-white" href="https://dhwaniacademy.in/"> Dhwani Academy of Percussion Music</a>
            </div>
        </footer>
    </div>
    );
  }  
}
