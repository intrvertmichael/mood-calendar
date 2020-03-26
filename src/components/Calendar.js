import React from 'react';

import Header from './Header';
import Day from './Day';
import DayClicked from './DayClicked';

import '../style/Calendar.css';
import '../style/Day.css';
import '../style/DayClicked.css';
import '../style/Moods.css';

import {useSelector, useDispatch} from 'react-redux';
import {setCalendar} from '../_actions';

export default () => {
  const dispatch = useDispatch();
  const clickedMonth = useSelector(state => state.clicked.month);
  const clickedYear = useSelector(state => state.clicked.year);

  const current_date = new Date();
  const d = current_date.getDate();
  let m;
  let y;

  if(clickedMonth===0){
    // IF THERE IS NO CLICKED MONTH
    m = current_date.getMonth();
    y = current_date.getFullYear();
    dispatch(setCalendar(m,y));
    console.log(`setting to current month and year ${m}/${y}`);
  } else {
    // IF THERE IS A CLICKED MONTH
    m = clickedMonth;
    y = clickedYear;
    console.log(`month ${m} year ${y}`);
  }


  // REDUX
  const calendar = useSelector(state => state.calendar);
  const year = calendar[`year${y}`];
  const month = year[`month${m}`];

  // ALL MONTHS AND YEARS
  // const allYears = Object.entries(calendar);
  const allMonths = Object.entries(year);
  // console.log(allYears.length);

  return (
    <div className='calender-container'>
      <Header year={y}/>

      <div className='month'>
        <h2>
        {
          // allMonths.length > 4 ?
          allMonths.length > 2 ?
          <p className='more' onClick={()=>{
            moreMonths(allMonths);
            dispatch(setCalendar(3,y));
          }}>
            {month.name}
          </p> :
          <p>{month.name}</p>
        }
        </h2>
      </div>

      <div className='calender'>
        {days(month, d)}
      </div>

      <DayClicked month={month} today={d}/>
    </div>
  );
}

const moreMonths = (allMonths) =>{
  console.log('allMonths');
  console.log(allMonths);
  console.log(allMonths.length);
}

const days = (month, d) => {
  var allDays = [];
  var rows = (month.starts > 4 && month.length>29)? 7*6 : 7*5;

  for(var i=0;i<rows;i++){
    allDays.push(
      <Day
      key={i}
      today={d}
      month={month}
      calendarPosition={i}
      dayOfMonth={i - month.starts + 1}/>
    );
  }
  return allDays;
}
