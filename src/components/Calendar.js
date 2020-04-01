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
import {addMonth} from '../_actions';

import { useFirestoreConnect } from 'react-redux-firebase';

export default () => {
  const dispatch = useDispatch();
  const seefull = useSelector(state => state);
  console.log(seefull);

  useFirestoreConnect([
   { collection: 'projects' } // or 'todos'
 ])
 const projects = useSelector(state => state.firestore.ordered.projects);
 console.log('projects');
 console.log(projects);

  const calendarYear = useSelector(state => state.calendar.calendar.year2020);
  const clickedYear = useSelector(state => state.calendar.clicked.year);
  const clickedMonth = useSelector(state => state.calendar.clicked.month);

  const default_2020 = [
    { num:0,  name:'January',   length:31, starts:3, days:[] } ,
    { num:1,  name:'February',  length:28, starts:6, days:[] } ,
    { num:2,  name:'March',     length:31, starts:0, days:[] } ,
    { num:3,  name:'April',     length:30, starts:3, days:[] } ,
    { num:4,  name:'May',       length:31, starts:5, days:[] } ,
    { num:5,  name:'June',      length:30, starts:1, days:[] } ,
    { num:6,  name:'July',      length:31, starts:3, days:[] } ,
    { num:7,  name:'August',    length:31, starts:6, days:[] } ,
    { num:8,  name:'September', length:30, starts:2, days:[] } ,
    { num:9,  name:'October',   length:31, starts:4, days:[] } ,
    { num:10, name:'November',  length:30, starts:0, days:[] } ,
    { num:11, name:'December',  length:31, starts:2, days:[] }
  ]


  const current_date = new Date();
  const d = current_date.getDate();
  let m;
  let y;

  if(!clickedMonth){
    // FIRST TIME THE APP RUNS
    m = current_date.getMonth();
    y = current_date.getFullYear();
    if(!calendarYear[`month${m}`]){
      console.log('The current month does not exist... We will create it');
      dispatch(addMonth(`month${m}`, default_2020[m]));
    }
    dispatch(setCalendar(m,y));
  } else {
    m = clickedMonth;
    y = clickedYear;
    console.log(`Month exists in Calendar... Month: ${m} Year: ${y}`);
  }


  // REDUX
  const calendar = useSelector(state => state.calendar.calendar);
  const year = calendar[`year${y}`];
  const month = year[`month${m}`];

  const allMonths = Object.entries(year);

  return (
    <div className='calender-container'>
      <Header year={y}/>

      <div className='month'>
        <h2>
        {
          allMonths.length > 1 ?
          <select className="months" defaultValue={'DEFAULT'} onChange={()=>{
            var selected = document.querySelector('.months');
            dispatch(setCalendar(selected.value,y));
          }}>
            {allMonths.map(month => {
              if(month[1].num>=0 && month[1].num!== m ){
                return <option key={month[1].num} value={month[1].num}>{month[1].name}</option>;
              }
              else if(month[1].num=== m){
                return <option key={month[1].num} value='DEFAULT'>{month[1].name}</option>;
              }
              else {
                return '';
              }
            })
          }
          </select>
          :
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

const days = (month, d) => {
  var allDays = [];
  var rows = (month.starts > 4 && month.length>29)? 7*6 : 7*5;

  const weekday = ['S', 'M', 'T', 'W', 'Th', 'F', 'S'];

  for(var x=0;x<=6;x++){
    allDays.push(<div key={`day${x}`} className='weekday'> {weekday[x]} </div>);
  }

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
