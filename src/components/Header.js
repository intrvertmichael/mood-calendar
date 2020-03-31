import React from 'react';

import {useSelector} from 'react-redux';

const Header = (props) => {
  const profile = useSelector(state => state.calendar.profile);
  const name = profile.name;

  return(
    <div className='title'>
      <p>{name}'s Mood Calendar</p>
      <div className='year'>
        <p>{props.year}</p>
      </div>
    </div>
  );
}

export default Header;
