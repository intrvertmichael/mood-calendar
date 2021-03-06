import React from 'react';

import Header from './Header';
import Month from './Month';
import AllDays from './AllDays';
import DayClicked from './DayClicked';
import ClearDayResponse from './ClearDayResponse';

import _ from 'lodash';
import '../style/Calendar.css';
import '../style/Day.css';
import '../style/DayClicked.css';
import '../style/Moods.css';

import {useEffect} from 'react';
import {connect} from 'react-redux';

// import {setCurrentAvg} from '../_actions';
import {setCurrentMonth} from '../_actions';
import {addMonth} from '../_actions';
import {syncReduxFirestore} from '../_actions';

import { useFirestoreConnect } from 'react-redux-firebase';

const Calendar = props => {


  const current_date = new Date();
  const d = current_date.getDate();
  let m;
  let y;

  if(!props.clickedMonth){
    // FIRST TIME THE APP RUNS
    m = current_date.getMonth();
    y = current_date.getFullYear();

    if(!props.calendarYear[`month${m}`]){
      // if month doesn't exist, make it.
      const allMonths2020 = [
        { num:0,  name:'January',   length:31, starts:3, days:{} } ,
        { num:1,  name:'February',  length:28, starts:6, days:{} } ,
        { num:2,  name:'March',     length:31, starts:0, days:{} } ,
        { num:3,  name:'April',     length:30, starts:3, days:{} } ,
        { num:4,  name:'May',       length:31, starts:5, days:{} } ,
        { num:5,  name:'June',      length:30, starts:1, days:{} } ,
        { num:6,  name:'July',      length:31, starts:3, days:{} } ,
        { num:7,  name:'August',    length:31, starts:6, days:{} } ,
        { num:8,  name:'September', length:30, starts:2, days:{} } ,
        { num:9,  name:'October',   length:31, starts:4, days:{} } ,
        { num:10, name:'November',  length:30, starts:0, days:{} } ,
        { num:11, name:'December',  length:31, starts:2, days:{} }
      ];
      console.log(`Month${m} doesn't exist...`);
      props.addMonth(`month${m}`, allMonths2020[m]);
      console.log(`Month${m} was created...`);
    }

    props.setCurrentMonth(m);
  } else {
    m = props.clickedMonth;
    y = props.clickedYear;
  }

  const blankMonth = { num:null, name:null, length:null, starts:null, days:[] };
  const month = props.calendarYear[`month${m}`]? props.calendarYear[`month${m}`]: blankMonth;


  // average mood
  // if(props.calendarYear[`month${m}`]){
  //   let total = 0;
  //   const allDays = props.calendarYear[`month${m}`].days;
  //   const allDaysArray = Object.entries(allDays);
  //   console.log(allDaysArray.length);
  //   if(allDaysArray.length>1){
  //     const allDaysArrayLength = allDaysArray.length;
  //
  //     for(let m=0 ; m< allDaysArrayLength ; m++ ){
  //       total += allDaysArray[m][1].mood;
  //     }
  //
  //     total = Math.round(total/allDaysArrayLength);
  //
  //     if(props.total !== total){
  //       props.setCurrentAvg(total);
  //     }
  //   }
  // }

  useFirestoreConnect(`userCalendars`);
  useEffect( () => {
    let firestoreObj = null;
    if(props.userCalendars){
      if(props.userCalendars[props.userId]){
        if(props.userCalendars[props.userId].stored){
          firestoreObj = props.userCalendars[props.userId].stored;
        }
      }
    }

    if(firestoreObj){
      const fireCalEqual =  _.isEqual(firestoreObj.year2020, props.calendarYear);

      if(firestoreObj && !fireCalEqual ) {
        props.syncReduxFirestore(firestoreObj);
      }
    }
  });

  return (
    <div className='calender-container'>

      <Header year={y}/>
      <Month
        yearName={props.clickedYear}
        yearObj={props.calendarYear}
        currentMonth={props.calendarMonth?props.calendarMonth:month}
      />

      <div className='calender'>
        <AllDays month={month} today={d}/>
      </div>

      <DayClicked month={month} today={d}/>
      <ClearDayResponse />
    </div>
  );

}

const mapStateToProps = state => {
  // console.log(`Component State:`, state);
  // console.log('- - - - - - - - - - - - - - - -');

  return {
    fullState: state,
    calendar: state.calendar,
    calendarYear: state.calendar.year2020,
    clickedYear: state.current.year,
    clickedMonth: state.current.month,
    clickedDay: state.current.day,
    total: state.current.total,
    userId: state.firebase.auth.uid,
    userCalendars: state.firestore.data.userCalendars
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // setCurrentAvg: total => dispatch(setCurrentAvg(total)),
    addMonth: (monthName, monthObj) => dispatch( addMonth(monthName, monthObj) ),
    setCurrentMonth: month => dispatch(setCurrentMonth(month)),
    syncReduxFirestore: obj => dispatch(syncReduxFirestore(obj))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
