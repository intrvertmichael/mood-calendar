import React from 'react';

import {useDispatch} from 'react-redux';
import {setClicked} from '../_actions';

export default (props) => {
  var cPos = props.calendarPosition;
  var dayOfMonth = props.dayOfMonth;
  const today = props.today;
  const month = props.month;
  var sDay = month.starts;
  var monthDays = month.days;
  var tags = '';
  const dispatch = useDispatch();

  // LABEL TODAY ON CALENDAR
  cPos === (today + sDay - 1)? tags += 'today ' : tags += '';

  // CREATE DAY JSX
  if ((cPos>=sDay) && (cPos<(month.length + sDay))){
    let mood = isThereAMood(monthDays, dayOfMonth);
    tags+= `mood${mood}`;
    return (
      <div
        className={`day ${tags}`}
        key={cPos}
        onClick={()=>{
          // checks if today or yesterday
          // if(dayOfMonth <= today && (dayOfMonth === today || dayOfMonth === today-1))
          if(dayOfMonth <= today)
          {
            dispatch(setClicked(dayOfMonth, mood));
            dayClicked();
          }
        }}> {dayOfMonth} </div>
      );
  }
  else {
    return <div className={`notADay ${tags}`} key={cPos}>  </div>;
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
