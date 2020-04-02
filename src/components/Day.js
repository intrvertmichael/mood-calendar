import React from 'react';

import {useDispatch} from 'react-redux';
import {setClicked} from '../_actions';
import {createProject} from '../_actions';

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
  var thisMonth = new Date().getMonth();
  var isitthismonth = month.num === thisMonth ? true : false;
  if(isitthismonth){
    cPos === (today + sDay - 1)? tags += 'today ' : tags += '';
  }

  // CREATE DAY JSX
  if ((cPos>=sDay) && (cPos<(month.length + sDay))){
    let mood = isThereAMood(monthDays, dayOfMonth);
    tags+= `mood${mood}`;
    return (
      <div
        className={`day ${tags}`}
        key={cPos}
        onClick={()=>{
          if(dayOfMonth <= today || !isitthismonth)
          {
            dispatch(setClicked(dayOfMonth, mood));
            dispatch(createProject({name:'mario',game:'super mario'}));
            // dispatch(logIn());

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
  var mood;
  for(var i=0; i<days.length;i++){
    if(days[i].day === dayOfMonth){
      mood = days[i].mood;
    }
  }
  return mood;
}


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// WHEN A DAY IS CLICKED
const dayClicked = () => document.querySelector('.dayClicked').classList.remove('hide');
