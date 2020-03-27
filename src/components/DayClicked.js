import React from 'react';

import {useSelector, useDispatch} from 'react-redux';
import {addMoodDay} from '../_actions';
import {setClicked} from '../_actions';

const DayClicked = (props) => {
  const month = props.month;
  const today = props.today;

  const clickedMood = useSelector(state => state.clicked.mood);
  const clickedDay = useSelector(state => state.clicked.day);
  const dispatch = useDispatch();

  // CLOSE BOX WHEN CLICKED OUT
  var modal = document.querySelector('.dayClicked');
  window.onclick = function(event) {
    if (event.target === modal) {
      modal.classList.add('hide');
    }
  }

  const isittoday = today === clickedDay ? true: false;
  let doesithavemood = false;

  let mood = '';
  let bigfacetags=``;

  // HAS IT ALREADY BEEN GIVEN A MOOD ?
  for(var i=0; i<month.days.length;i++){
    if( month.days[i].day === clickedDay){
      // IF SO
      doesithavemood = true;
      mood = tellMood(clickedMood);
      bigfacetags = `big-circle mood${clickedMood}`
    }
  }

  // CREATE MESSAGES
  let [infoMessage, ratingMessage] = getMessage(doesithavemood, isittoday, month.name, clickedDay, mood);

  return (
    <div className='dayClicked hide'>
      <div className='dayInfo'>
        <div className='info-window'>
          <p> {infoMessage} </p>
          <div className={`${bigfacetags}`}></div>
        </div>

        <div className='rating'>
          <p> {ratingMessage}</p>

          <div className = 'rating-circles'>
            <div className='circle-container'>
              <div className='circle mood1'
                onClick={()=>{
                  dispatch(addMoodDay(clickedDay, 1));
                  dispatch(setClicked(clickedDay, 1));
                }}>
              </div>
              <p>Bad</p>
            </div>

            <div className='circle-container'>
              <div className='circle mood2'
                onClick={()=>{
                  dispatch(addMoodDay(clickedDay, 2));
                  dispatch(setClicked(clickedDay, 2));
                }}>
              </div>
              <p>Okay</p>
            </div>

            <div className='circle-container'>
              <div className='circle mood3'
                onClick={()=>{
                  dispatch(addMoodDay(clickedDay, 3));
                  dispatch(setClicked(clickedDay, 3));
                }}>
              </div>
              <p>GOOD</p>
            </div>

            <div className='circle-container'>
              <div className='circle mood4'
                onClick={()=>{
                  dispatch(addMoodDay(clickedDay, 4));
                  dispatch(setClicked(clickedDay, 4));
                }}>
              </div>
              <p>REALLY GOOD</p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}


// HELPER FUNCTIONS
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

const getMessage = (doesithavemood, isittoday, month, day, mood) => {
  let infoMessage = '';
  let ratingMessage = '';

  if(doesithavemood && !isittoday){
    infoMessage = `On ${month} ${day} you were feeling ${mood}` ;
    ratingMessage = 'If not, how were you really feeling?';
  }
  else if(!doesithavemood && !isittoday) {
    infoMessage = `You don't have a mood for ${month} ${day}` ;
    ratingMessage = `How were you feeling? `;
  }
  else if(doesithavemood && isittoday){
    infoMessage = `Seems like you're feeling ${mood} today` ;
    ratingMessage = 'Did you change your mind ?';
  }
  else if(!doesithavemood && isittoday){
    infoMessage = `Seems like you don't have a mood for today` ;
    ratingMessage = 'Would you like to add one ?';
  }
  else {
    infoMessage = '';
    ratingMessage = '';
  }

  return [infoMessage, ratingMessage];
}

export default DayClicked;
