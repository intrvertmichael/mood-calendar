import React from 'react';

import {connect} from 'react-redux';

import Calendar from './Calendar';
import Intro from './Intro';

const App = (props) => {
  const {auth} = props;
  const logInMessage = auth.uid? `Logged In. UserId: ${auth.uid}`: 'The User is not logged in.';
  console.log(logInMessage);

  return(
    <div className='container'>
      {auth.uid? <Calendar /> : <Intro />}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  }
}

export default connect(mapStateToProps)(App);
