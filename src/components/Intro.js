import React from 'react';
import GoogleButton from 'react-google-button'
import {useDispatch} from 'react-redux';
import {logIn} from '../_actions';

const Intro = () => {
  const dispatch = useDispatch();

  return(
    <div className='intro'>
      <h1>Mood Calendar</h1>
      <p>Keep track of your mood. Some kind of description goes here.</p>
      <div className='gbutton'>
        <GoogleButton type="dark" onClick={()=>dispatch(logIn())} />
      </div>
    </div>
  )
}

export default Intro;
