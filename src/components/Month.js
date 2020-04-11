import React from 'react';
import {connect} from 'react-redux';
import {setCurrentMonth} from '../_actions';

const Month = (props) => {
  // console.log('-> Inside of Month Component');

  if(props.currentMonth.length){ // must exist to have a length
    const allMonths = props.yearObj? Object.entries(props.yearObj): null;
    return (
      <div className='month'>
        <h2>
        {
          allMonths.length > 1 ?
          <select className="months" defaultValue={'DEFAULT'} onChange={
            ()=>{props.setCurrentMonth(document.querySelector('.months').value)}
          }>
            {allMonths.map(month => {
              const singleMonth = month[1];
              if( singleMonth.num !== props.currentMonth.num ){
                return <option key={singleMonth.num} value={singleMonth.num}>{singleMonth.name}</option>;
              }
              else if( singleMonth.num === props.currentMonth.num ){
                return <option key={props.currentMonth.num} value='DEFAULT'>{props.currentMonth.name}</option>;
              }
              else {
                return '';
              }
            })
          }
          </select>
          :
          <p>{props.currentMonth.name}</p>
        }
        </h2>
      </div>
    )
  }
  else {
    return <div className='month'> No month </div>
  }
}

const mapDispatchToProps = dispatch =>{
  return {
    setCurrentMonth: (m) => dispatch(setCurrentMonth(m))
  }
}

export default connect(null, mapDispatchToProps)(Month);
