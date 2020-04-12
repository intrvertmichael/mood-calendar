import React from 'react';
import {connect} from 'react-redux';

const ClearDayResponse = props => {
  const mood = props.calendar[`month${props.month}`].days[`day${props.day}`]? props.calendar[`month${props.month}`].days[`day${props.day}`].mood : null;

  // MOOD 1 _ BAD
  const mood1messages = ['purple message 1', 'purple message 2', 'purple message 3'];
  // MOOD 2 _ NOT SO GOOD
  const mood2messages = ['blue message 1', 'blue message 2', 'blue message 3'];
  // MOOD 3 _ OKAY
  const mood3messages = ['orange message 1', 'orange message 2', 'orange message 3'];
  // MOOD 4 _ GOOD
  const mood4messages = ['yellow message 1', 'yellow message 2', 'yellow message 3'];

  const m1 = [
    mood1messages[Math.floor(Math.random()*mood1messages.length)],
    mood2messages[Math.floor(Math.random()*mood1messages.length)],
    mood3messages[Math.floor(Math.random()*mood1messages.length)],
    mood4messages[Math.floor(Math.random()*mood1messages.length)]
  ];

  const message = m1[mood-1];

  return (
    <div className='ClearDayResponse hide' onClick={()=>document.querySelector('.ClearDayResponse').classList.add('hide')}>
      <div className='ClearDayResponseBox'>
        {message}
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    calendar: state.calendar.year2020,
    month: state.current.month,
    day: state.current.day
  }
}

export default connect(mapStateToProps)(ClearDayResponse);
