import React from 'react';

import {useSelector, useDispatch} from 'react-redux';
import {increment} from '../_actions';
import {decrement} from '../_actions';

const Header = (props) => {
  const profile = useSelector(state => state.profile);
  const name = profile.name;
  const counter = useSelector(state => state.num);
  const dispatch = useDispatch();

  return(
    <div className='title'>
      <p>{name}'s Mood Calendar {counter}</p>
      <div className='faces'>
        <div className='circleface mood4'onClick={()=> dispatch(decrement())}> </div>
        <div className='circleface mood3'> </div>
        <div className='circleface mood2'> </div>
        <div className='circleface mood1'onClick={()=> dispatch(increment(5))}> </div>
      </div>
    </div>
  );
}

export default Header;
