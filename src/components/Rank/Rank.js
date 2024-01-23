import React from 'react';

const Rank = ({name,entries}) =>{
	return(
          <div className='white f3'>
          <div>{`${name},your actual rank is ${entries}`}</div>
          <div className='white f1'>{'#1'}</div>
          </div>
		);
}

export default Rank;