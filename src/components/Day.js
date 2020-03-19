import React from 'react';

var state = {
  month: 'March',
  length: 31,
  startsOn: 1,
}


export default (props) => {
  var calendarPosition = props.i;
  var dayOfMonth = calendarPosition - state.startsOn + 1;
  var tags = '';

  tags += isThereAMood(dayOfMonth);

  // LABEL TODAY ON CALENDAR
  var currentDay = new Date().getDate();
  calendarPosition === (currentDay + state.startsOn - 1)? tags += 'today' : tags += '';

  // CREATE DAY JSX
  var day;
  if (
    (calendarPosition >= state.startsOn) &&
    (calendarPosition < (state.length + state.startsOn))
  ) {
    day = <div className={`day ${tags}`} key={props.i}> {dayOfMonth} </div>;
  }
  else {
    day = <div className={`notADay ${tags}`} key={props.i}>  </div>;
  }
  return day;
}



// HELPER FUNCTIONS
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

const isThereAMood = (dayOfMonth) => {
  var color = ''

  if(dayOfMonth===1){
    color = 'mood1 ';
  }
  else if(dayOfMonth===2){
    color = 'mood2 ';
  }
  else if(dayOfMonth===3){
    color = 'mood3 ';
  }
  else if(dayOfMonth===4){
    color = 'mood4 ';
  }
  else {
    color = '';
  }

  return color
}
