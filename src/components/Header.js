import React from 'react';

import {useSelector, useDispatch} from 'react-redux';
import {logOut} from '../_actions';

const Header = (props) => {
  const profile = useSelector(state => state.calendar.profile);
  const name = profile.name;
  const dispatch = useDispatch();

  return(
    <div className='title'>
      <div>
        <p>{name}'s Mood Calendar </p>
        <button className='logout-btn' onClick={()=>dispatch(logOut())}> Log Out </button>
      </div>
      <div className='year'>
        <p>{props.year}</p>
      </div>
    </div>
  );
}

export default Header;
