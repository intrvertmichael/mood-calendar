import React from 'react';

import {useDispatch} from 'react-redux';
import {setClickedDay} from '../_actions';
import {setClickedMood} from '../_actions';

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
    let mood = isThereAMood(monthDays, dayOfMonth);
    tags+= `mood${mood}`;
    return (
      <div
        className={`day ${tags}`}
        key={calPosition}
        onClick={()=>{
          if(dayOfMonth <= today){
            dispatch(setClickedDay(dayOfMonth));
            dispatch(setClickedMood(mood));
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
      mood = days[i].mood;
    }
  }
  return mood;
}


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// WHEN A DAY IS CLICKED

const dayClicked = () => document.querySelector('.dayClicked').classList.remove('hide');
