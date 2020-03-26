import React from 'react';

import Header from './Header';
import Day from './Day';
import DayClicked from './DayClicked';

import '../style/Calendar.css';
import '../style/Day.css';
import '../style/DayClicked.css';
import '../style/Moods.css';

import {useSelector} from 'react-redux';

export default () => {

  // GET DATE FROM BROWSER
  const current_date = new Date();
  const m = current_date.getMonth();
  const y = current_date.getFullYear();
  const d = current_date.getDate();

  // REDUX
  const calendar = useSelector(state => state.calendar);
  const year = calendar[`year${y}`];
  const month = year[`month${m}`];

  return (
    <div className='calender-container'>
      <Header />

      <div className='month'>
        <h2>{month.name}</h2>
      </div>

      <div className='calender'>
        {days(month, d)}
      </div>

      <DayClicked month={month} today={d}/>
    </div>
  );
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
