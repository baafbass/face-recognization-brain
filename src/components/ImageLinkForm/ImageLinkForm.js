import React from 'react';
import './ImageLinkForm.css'

const ImageLinkForm = ({onInputChange,onPictureSubmit})=>{

	return(
          <div>
          	<p className='f3'>
          		{'This magic brain will detect faces in your pictures. Give it a try'}
          	</p>
          	<div className='center'>
          	<div className='form center pa4 br-3 shadow-5'>
          		<input type='text' className='f4 pa2 w-70 center' onChange={onInputChange}/>
          		<button 
          		className='f4 grow w-30 ph3 link pv2 dib white bg-light-purple'
                onClick = {onPictureSubmit}
          		>Detect</button>
          	</div>
          	</div>
          </div>
		);
}
export default ImageLinkForm;