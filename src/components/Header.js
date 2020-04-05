import React from 'react';
import {connect} from 'react-redux';
import {logOut} from '../_actions';

const Header = (props) => {
  return(
    <div className='title'>
      <div>
        <p>{props.name}'s Mood Calendar </p>
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
    name: state.firebase.auth.displayName
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logOut: () => dispatch(logOut())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
