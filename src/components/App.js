import React from 'react';

import GoogleButton from 'react-google-button'
import {connect, useDispatch} from 'react-redux';
import {logIn} from '../_actions';

import Calendar from './Calendar';

const App = (props) => {
  const dispatch = useDispatch();

  const {auth} = props;
  const comp = auth.uid? <Calendar /> :
  <div className='intro'>
    <h1>Mood Calendar</h1>
    <p>Keep track of your mood. Some kind of description goes here.</p>
    <div className='gbutton'>
      <GoogleButton type="dark" onClick={()=>dispatch(logIn())} />
    </div>
  </div>
      ;


  console.log('auth.uid');
  console.log(auth.uid);
  return(
    <div className='container'>
      {comp}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  }
}

export default connect(mapStateToProps)(App);
