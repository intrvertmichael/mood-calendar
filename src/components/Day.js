import React from 'react';

import {useDispatch} from 'react-redux';
import {setClickedDay} from '../_actions';

export default (props) => {
  var calPosition = props.calendarPosition;
  var dayOfMonth = props.dayOfMonth;
  const month = props.month;
  var startDay = month.starts;
  var monthLength = month.length;
  var monthDays = month.days;
  var tags = '';
  const dispatch = useDispatch();

  // LABEL TODAY ON CALENDAR
  var today = new Date().getDate();
  calPosition === (today + startDay - 1)? tags += 'today ' : tags += '';


  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  // CREATE DAY JSX
  if (
    (calPosition >= startDay) &&
    (calPosition < (monthLength + startDay) )
  ){
    tags+= isThereAMood(monthDays, dayOfMonth);
    return (
      <div
        className={`day ${tags}`}
        key={calPosition}
        onClick={()=>{
          if(dayOfMonth <= today){
            let clicked = month.days[dayOfMonth-1];
            if(clicked){
              dispatch(setClickedDay(clicked));
            } else {
              dispatch(setClickedDay({day:dayOfMonth, mood:null}));
            }
            dayClicked();
          }
        }}> {dayOfMonth} </div>
      );
  }
  else {
    return <div className={`notADay ${tags}`} key={calPosition}>  </div>;
  }

}


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// CHECK DAY AND COLOR CALENDAR IF THERE IS A MOOD

const isThereAMood = (days, dayOfMonth) => {
  var mood = ''
  for(var i=0; i<days.length;i++){
    if( days[i].day === dayOfMonth){
      mood = `mood${days[i].mood}`
    }
  }
  return mood;
}


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// WHEN A DAY IS CLICKED

const dayClicked = () => {
  document.querySelector('.dayClicked').classList.remove('hide');
}
