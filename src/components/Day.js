import React from 'react';

var state = {
  month: 'March',
  length: 31,
  startsOn: 1,
}




const Day = (props) => {
  var calendarPosition = props.i;
  var dayOfMonth = calendarPosition-state.startsOn+1;
  var mood = 'day ';



// MOODS
  if(dayOfMonth===1){
    mood += 'mood1 ';
  }
  else if(dayOfMonth===2){
    mood += 'mood2 ';
  }
  else if(dayOfMonth===3){
    mood += 'mood3 ';
  }
  else if(dayOfMonth===4){
    mood += 'mood4 ';
  }
  else {
    mood += '';
  }



  // FIND TODAY
  var currentDay = new Date().getDate();
  ( calendarPosition === currentDay + state.startsOn - 1 ) ? mood += 'today' : mood += '';

  var x;

  if( (calendarPosition >= state.startsOn) && (calendarPosition < (state.length+state.startsOn)) ){
    x = <div className={mood} key={props.i}> {props.i - state.startsOn + 1} </div>;
  } else {
    x = <div className={mood} key={props.i}>  </div>;
  }

  return x;
}

export default Day;
