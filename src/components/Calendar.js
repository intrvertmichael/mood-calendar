import React from 'react';

import Day from './Day';
import '../style/Calendar.css';
import '../style/Day.css';


var state = {
  month: 'March',
  length: 31,
  startsOn: 1,
}


const Calendar = () => {
  return (
    <div className='calender-container'>
      <div className='month'>
        <h2>March</h2>
      </div>
      <div className='calender'>
        {days()}
      </div>
    </div>
  );
}

const days = () => {

  var el = [];
  var rows = state.startsOn > 4? 7*6 : 7*5;

  for(var i=0;i<rows;i++){
    el.push(<Day i={i} key={i}/>);
  }
  return el;
}


export default Calendar;
