import React from 'react'
import './FaceRecognition.css';

const FaceRecognition = ({imageURL,box}) =>{
  return (
    <div className='center ma'>
    <div className='absolute mt-2'>
    <img id='inputImage' src={imageURL} alt='' width='500px' height='auto'/>
    <div className='bounding-box' style={{top:box.topRow,right:box.rightCol,bottom:box.bottomRow,left:box.leftCol}}></div>
    </div>   
    </div>
  	)
}

export default FaceRecognition;