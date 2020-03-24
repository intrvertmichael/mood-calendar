import React from 'react';

import {useSelector} from 'react-redux';


const DayClicked = () => {
  const clickedDay = useSelector(state => state.clickedDay);
  let mood = tellMood(clickedDay.mood);
  // if (clickedDay.length !== 0) {
  //   mood =
  // } else{
  //   mood = 'I have not put a feeling for this day.';
  // }

  return (
    <div className='dayClicked hide' onClick={removeWindow}>
      <div className='dayInfo'>
        <p> Day {clickedDay.day} got clicked. </p>
        <p> {mood} </p>
      </div>
    </div>
  );
}

const removeWindow = () => {
  const el = document.querySelector('.dayClicked');
  el.classList.add('hide');
}

const tellMood = (mood) => {
  if(mood === 1){
    return('I was feeling BAD on this day.');
  }
  else if(mood === 2){
    return('I was feeling OKAY on this day.');
  }
  else if(mood === 3){
    return('I was feeling GOOD on this day.');
  }
  else if(mood === 4){
    return('I was feeling REALLY GOOD on this day.');
  }
  else {
    return 'I have not put a feeling for this day.'
  }
}

export default DayClicked;
