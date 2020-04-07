import React from 'react';

import Header from './Header';
import Month from './Month';
import AllDays from './AllDays';
import DayClicked from './DayClicked';

import '../style/Calendar.css';
import '../style/Day.css';
import '../style/DayClicked.css';
import '../style/Moods.css';

import {connect} from 'react-redux';
import {setCalendar} from '../_actions';
import {addMonth} from '../_actions';
import {syncReduxFirestore} from '../_actions';

import { useFirestoreConnect } from 'react-redux-firebase';

const Calendar = props => {
  console.log('-> Inside of Calendar Component');

  // SYNCS THE REDUCER WITH FIREBASE
  useFirestoreConnect(`userCalendars`);
  const userCalendars = props.userCalendars;
  console.log('Firestore Projects:', userCalendars);
  let enter = true;

  if(typeof userCalendars !== "undefined" && enter){
    console.log('entered type check');
    enter = false;
    props.syncReduxFirestore();
  }

  const allMonths2020 = [
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
  ];

  const current_date = new Date();
  const d = current_date.getDate();
  let m;
  let y;

  if(!props.clickedMonth){
    // FIRST TIME THE APP RUNS
    m = current_date.getMonth();
    y = current_date.getFullYear();
    if(!props.calendarYear[`month${m}`]){
      console.log(`Month${m} doesn't exist...`);
      props.addMonth(`month${m}`, allMonths2020[m]);
      console.log(`Month${m} was created...`);
    }
    props.setCalendar(m,y);
  } else {
    m = props.clickedMonth;
    y = props.clickedYear;
    // console.log(`Month exists in Calendar... Month: ${m} Year: ${y}`);
  }

  // REDUX
  const month = props.calendarYear[`month${m}`]? props.calendarYear[`month${m}`]: { num:null, name:null, length:null, starts:null, days:[] };

  return (
    <div className='calender-container'>
      <Header year={y}/>
      <Month yearName={props.clickedYear} yearObj={props.calendarYear} currentMonth={props.calendarMonth?props.calendarMonth:month} />
      <div className='calender'>
        <AllDays month={month} today={d}/>
      </div>
      <DayClicked month={month} today={d}/>
    </div>
  );
}

const mapStateToProps = state => {
  // console.log(' ');
  console.log(`Component State:`, state);
  // console.log('- - - - - - - - - - - - - - - -');

  const {calendar} = state;
  return {
    fullState: state,
    calendar: calendar.calendar,
    calendarYear: calendar.calendar.year2020,
    calendarMonth: calendar.calendar.year2020[calendar.clicked.month],
    clickedYear: calendar.clicked.year,
    clickedMonth: calendar.clicked.month,
    userCalendars: state.firestore.data.userCalendars,
    userId: state.firebase.auth.uid
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addMonth: (monthName, monthObj) => dispatch( addMonth(monthName, monthObj) ),
    setCalendar: (m, y) => dispatch(setCalendar(m,y)),
    syncReduxFirestore: () => dispatch(syncReduxFirestore())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
