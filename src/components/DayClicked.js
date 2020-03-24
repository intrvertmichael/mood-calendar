import React from 'react';

import {useSelector, useDispatch} from 'react-redux';
import {increment} from '../_actions';

const DayClicked = () => {
  const clickedDay = useSelector(state => state.clickedDay);
  const currentMonthNum = useSelector(state => state.currentMonth);
  const currentMonth = useSelector(state => state.months[currentMonthNum]);
  const dispatch = useDispatch();
  const mood = tellMood(clickedDay.mood);
  const today = new Date().getDate();

  // calPosition === (today + startDay - 1)? tags += 'today ' : tags += '';

  const isittoday = today === clickedDay.day ? true: false;
  const doesithavemood = clickedDay.mood !== null? true: false;

  let infoMessage = '';
  let ratingMessage = '';

  if(doesithavemood && !isittoday){
    infoMessage = `On ${currentMonth.name} ${clickedDay.day} you were feeling ${mood}` ;
    ratingMessage = 'Did you change your mind ?';
  }
  else if(!doesithavemood && !isittoday) {
    infoMessage = `You don't have a mood for ${currentMonth.name} ${clickedDay.day}` ;
    ratingMessage = `How were you feeling? `;
  }
  else if(doesithavemood && isittoday){
    infoMessage = `Seems like you're feeling ${mood} today` ;
    ratingMessage = 'Did you change your mind ?';
  }
  else if(!doesithavemood && isittoday){
    infoMessage = `Seems like you dont have a mood for today` ;
    ratingMessage = 'Would you like to add one ?';
  }

  let bigface='';

  if (doesithavemood) {
    bigface = `big-circle mood${clickedDay.mood}`;
  } else {
    bigface = 'other face';
  }

  return (
    <div className='dayClicked hide'>
      <div className='dayInfo'>
        <span className='close' onClick={removeWindow}>X</span>

        <div className='info-window'>
          <p> {infoMessage} </p>
          <div className={bigface}></div>

        </div>
        <div className='rating'>
          <p> {ratingMessage}</p>

          <div className = 'rating-circles'>
            <div className='circle-container'> <div className='circle mood1'></div> <p>Bad</p> </div>
            <div className='circle-container'> <div className='circle mood2'></div> <p>Okay</p> </div>
            <div className='circle-container'> <div className='circle mood3'></div> <p>Good</p> </div>
            <div className='circle-container'> <div className='circle mood4'></div> <p>Really Good</p> </div>
          </div>

        </div>
      </div>
    </div>
  );
}


const removeWindow = () => {
  document.querySelector('.dayClicked').classList.add('hide');
}

const tellMood = (mood) => {
  if(mood === 1){
    return('BAD');
  }
  else if(mood === 2){
    return('OKAY');
  }
  else if(mood === 3){
    return('GOOD');
  }
  else if(mood === 4){
    return('REALLY GOOD');
  }
  else {
    // return 'I have not put a feeling for this day.'
  }
}

export default DayClicked;
