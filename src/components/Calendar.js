import React from 'react';
import '../style/Calendar.css';

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
  var x = [];
  for(var i=0;i<42;i++){
    x.push(<div className='day' key={i}> {i+1} </div>);
  }
  return x;
}

export default Calendar;
