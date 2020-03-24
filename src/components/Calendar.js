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
  const month = useSelector(state => state.months[state.currentMonth]);

  return (
    <div className='calender-container'>
      <Header />

      <div className='month'>
        <h2>{month.name}</h2>
      </div>

      <div className='calender'>
        {days(month)}
      </div>

      <DayClicked />
    </div>
  );
}

const days = (month) => {
  var allDays = [];
  var rows = (month.starts > 4 && month.length>29)? 7*6 : 7*5;

  for(var i=0;i<rows;i++){
    allDays.push(
      <Day
      key={i}
      month={month}
      calendarPosition={i}
      dayOfMonth={i - month.starts + 1}/>
    );
  }
  return allDays;
}
