import React from 'react';

import {useSelector} from 'react-redux';

const Header = () => {
  const profile = useSelector(state => state.profile);
  const name = profile.name;

  return(
    <div className='title'>
      <p>{name}'s Mood Calendar</p>
      <div className='faces'>
        <div className='circleface mood4'> </div>
        <div className='circleface mood3'> </div>
        <div className='circleface mood2'> </div>
        <div className='circleface mood1'> </div>
      </div>
    </div>
  );
}

export default Header;
