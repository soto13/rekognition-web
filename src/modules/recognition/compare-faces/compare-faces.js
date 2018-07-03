import React, { Component } from "react";
import Webcam from "react-webcam";

class CompareFacesComponent extends Component {

  constructor(props) {
    super(props)
  }

  setRef = (webcam) => {
    this.webcam = webcam;
  }
 
  capture = () => {
    const imageSrc = this.webcam.getScreenshot();
    console.log(imageSrc)
  };

  render() {
    const videoConstraints = { width: 1280, height: 720, facingMode: 'user', };

    return (
      <div>
        <h1>Comparar caras</h1>
        <Webcam audio={ false } height={ 350 } ref={ this.setRef } screenshotFormat="image/jpeg" width={ 350 } videoConstraints={ videoConstraints } />
        <button onClick={ this.capture }>Capture photo</button>
      </div>
    )
  }
}

export default CompareFacesComponent;
