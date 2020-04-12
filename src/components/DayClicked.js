import React from 'react';

import {connect} from 'react-redux';
import {clearDay} from '../_actions';
import {setMood} from '../_actions';
import {setMessage} from '../_actions';
import {updateFirestore} from '../_actions';

const DayClicked = (props) => {
  const month = props.month;
  const today = props.today;
  const clickedDay = props.clickedDay;

  // CLOSE BOX WHEN CLICKED OUT
  window.onclick = function(event) {
    if (event.target === document.querySelector('.dayClicked')) { closeWindow() }
  }

  const isittoday = today === clickedDay ? true: false;
  let doesithavemood = false;

  let mood = '';
  let bigfacetags=``;
  let message;

  if( month.days[`day${clickedDay}`]){
    doesithavemood = true;
    mood = tellMood(month.days[`day${clickedDay}`].mood);
    bigfacetags = `big-circle mood${month.days[`day${clickedDay}`].mood}`;
    message = month.days[`day${clickedDay}`].message?month.days[`day${clickedDay}`].message:'Why? ';
  }


  // CREATE MESSAGES
  let [infoMessage, ratingMessage] = getMessage(doesithavemood, isittoday, month.name, clickedDay, mood);

  return (
    <div className='dayClicked hide'>
      <div className='dayInfo'>
        <span className='close' onClick={closeWindow}> x </span>
        <div className='info-window'>
          <p> {infoMessage} </p>
          <div className={`${bigfacetags}`} onClick={()=>{
            var m = prompt(`Why were you feeling that way?`);
            props.setMessage(m);
            props.updateFirestore();
            }
          }> {message} </div>
        </div>

        <div className='rating'>
          <p> {ratingMessage}</p>

          <div className = 'rating-circles'>

            <div className='circle-container'>
              <div className='circle mood1' onClick={()=>responseMessage(props, 1)}>
              </div>
              <p>Bad</p>
            </div>

            <div className='circle-container'>
              <div className='circle mood2' onClick={()=>responseMessage(props, 2)}>
              </div>
              <p>Okay</p>
            </div>

            <div className='circle-container'>
              <div className='circle mood3' onClick={()=>responseMessage(props, 3)}>
              </div>
              <p>GOOD</p>
            </div>

            <div className='circle-container'>
              <div className='circle mood4' onClick={()=>responseMessage(props, 4)}>
              </div>
              <p>REALLY GOOD</p>
            </div>
          </div>

          {doesithavemood? <button className='clearDay' onClick={()=>{
            props.clearDay();
            props.updateFirestore();
          }}> Clear Day </button>: ''}

        </div>
      </div>
    </div>
  );
}


// HELPER FUNCTIONS
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const closeWindow =() => {
  document.querySelector('.dayClicked').classList.add('hide');
}

const responseMessage = (props, moodNum) => {
  props.setMood(moodNum);
  props.updateFirestore();

  // hide and show the pop up clear day response
  const cleardayContainer = document.querySelector('.ClearDayResponse');
  cleardayContainer.classList.add(`mood${moodNum}`);
  cleardayContainer.classList.remove('hide');
  setTimeout(()=>{
    cleardayContainer.classList.remove(`mood${moodNum}`);
    cleardayContainer.classList.add('hide');
  }, 1000)
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


// MAP
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const mapStateToProps = state => {
  return {
    clickedMonth: state.current.month,
    clickedDay: state.current.day
  }
}

const mapDispatchToProps = dispatch => {
  return {
    clearDay: () => dispatch(clearDay()),
    setMood: (mood) => dispatch(setMood(mood)),
    setMessage: (message) => dispatch(setMessage(message)),
    updateFirestore: ()=> dispatch(updateFirestore())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(DayClicked);
