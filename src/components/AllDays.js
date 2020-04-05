import React from 'react';
import Day from './Day';

const AllDays = (props) => {

    var allDays = [];
    var rows = (props.month.starts > 4 && props.month.length>29)? 7*6 : 7*5;

    // LABEL DAYS OF THE WEEK
    const weekday = ['S', 'M', 'T', 'W', 'Th', 'F', 'S'];
    for(var x=0;x<=6;x++){
      allDays.push(<div key={`day${x}`} className='weekday'> {weekday[x]} </div>);
    }

    // CREATE DAYS ON CALENDAR
    for(var i=0;i<rows;i++){
      allDays.push(
        <Day
        key={i}
        today={props.today}
        month={props.month}
        calendarPosition={i}
        dayOfMonth={i - props.month.starts + 1}/>
      );
    }

    return allDays;
}

export default AllDays;
