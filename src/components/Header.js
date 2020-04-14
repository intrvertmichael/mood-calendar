import React from 'react';
import {connect} from 'react-redux';
import {logOut} from '../_actions';

const Header = (props) => {
  let mood = props.total;
  if(props.total === 1){ mood = 'Bad'}
  else if(props.total === 2){ mood = 'Okay'}
  else if(props.total === 3){ mood = 'Good'}
  else if(props.total === 4){ mood = 'Really Good'}
  const head = props.total ? `You've been mostly ${mood} this month` : `${props.name}'s Mood Calendar`;

  return(
    <div className='title'>
      <div>
        <p>{head}</p>
        <button className='logout-btn' onClick={props.logOut}> Log Out </button>
      </div>
      <div className='year'>
        <p>{props.year}</p>
      </div>
    </div>
  );
}

const mapStateToProps = state =>{
  return {
    name: state.firebase.auth.displayName,
    total: state.current.total,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logOut: () => dispatch(logOut())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
