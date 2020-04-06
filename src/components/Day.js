import React from 'react';

import {connect} from 'react-redux';
import {setClicked} from '../_actions';
import {createProject} from '../_actions';

const Day = (props) => {
  var cPos = props.calendarPosition;
  var dayOfMonth = props.dayOfMonth;
  const today = props.today;
  const month = props.month;
  var sDay = month.starts;
  var monthDays = month.days;
  var tags = '';

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
            props.setClicked(dayOfMonth, mood);
            props.createProject({name:'mario',game:'super mario'});

            document.querySelector('.dayClicked').classList.remove('hide');
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

const mapDispatchToProps = dispatch =>{
  return{
    setClicked: (day, mood) => dispatch(setClicked(day, mood)) ,
    createProject: (project) => dispatch(createProject(project))
  }
}

export default connect(null, mapDispatchToProps)(Day);
