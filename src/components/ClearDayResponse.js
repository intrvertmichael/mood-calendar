import React from 'react';
import {connect} from 'react-redux';

const ClearDayResponse = props => {
  const mood = props.calendar[`month${props.month}`].days[`day${props.day}`]? props.calendar[`month${props.month}`].days[`day${props.day}`].mood : null;

  // MOOD 1 _ BAD
  const mood1messages = [
    {
      quote:"You may encounter many defeats, but you must not be defeated. In fact, it may be necessary to encounter the defeats, so you can know who you are, what you can rise from, how you can still come out of it.",
      author:"Maya Angelou"
    },
    {
      quote:"You don't develop courage by being happy in your relationships everyday. You develop it by surviving difficult times and challenging adversity.",
      author:"Epicurus"
    },
    {
      quote:"Most of the important things in the world have been accomplished by people who have kept on trying when there seemed to be no hope at all.",
      author:"Dale Carnegie"
    },
    {
      quote:"Our greatest glory is not in never falling, but in rising every time we fall.",
      author:"Confucius"
    },
    {
      quote:"A person who never made a mistake never tried anything new.",
      author:"Albert Einstein"
    }
  ];

  // MOOD 2 _ OKAY
  const mood2messages = [
    {
      quote:"Most of the important things in the world have been accomplished by people who have kept on trying when there seemed to be no hope at all.",
      author:"Dale Carnegie"
    },
    {
      quote:"Experiencing sadness and anger can make you feel more creative, and by being creative, you can get beyond your pain or negativity.",
      author:"Yoko Ono"
    },
    {
      quote:"With the new day comes new strength and new thoughts.",
      author:"Eleanor Roosevelt"
    },
    {
      quote:"We all have self-doubt. You don't deny it, but you also don't capitulate to it. You embrace it.",
      author:"Kobe Bryant"
    },
    {
      quote:"Sometimes when you innovate, you make mistakes. It is best to admit them quickly, and get on with improving your other innovations.",
      author:"Steve Jobs"
    },
    {
      quote:"Be content with what you have; rejoice in the way things are. When you realize there is nothing lacking, the whole world belongs to you.",
      author:"Lao Tzu"
    }

  ];

  // MOOD 3 _ GOOD
  const mood3messages = [
    {
      quote:"Do you want to know who you are? Don't ask. Act! Action will delineate and define you.",
      author:"Thomas Jefferson"
    },
    {
      quote:"The pessimist sees difficulty in every opportunity. The optimist sees the opportunity in every difficulty.",
      author:"Winston Churchill"
    },
    {
      quote:"Kindness in words creates confidence. Kindness in thinking creates profoundness. Kindness in giving creates love.",
      author:"Lao Tzu"
    },
    {
      quote:"Every man's life ends the same way. It is only the details of how he lived and how he died that distinguish one man from another.",
      author:"Ernest Hemingway"
    },
    {
      quote:"I think that's the single best piece of advice: constantly think about how you could be doing things better and questioning yourself.",
      author:"Elon Musk"
    }
  ];

  // MOOD 4 _ REALLY GOOD
  const mood4messages = [
    {
      quote:"The most important thing is to try and inspire people so that they can be great in whatever they want to do.",
      author:"Kobe Bryant"
    },
    {
      quote:"Thousands of candles can be lit from a single candle, and the life of the candle will not be shortened. Happiness never decreases by being shared.",
      author:"Buddha"
    },
    {
      quote:"However many holy words you read, however many you speak, what good will they do you if you do not act on upon them?",
      author:"Buddha"
    },
    {
      quote:"Only those who have learned the power of sincere and selfless contribution experience life's deepest joy: true fulfillment",
      author:"Tony Robbins"
    }
  ];

  const m = [
    mood1messages[Math.floor(Math.random() * mood1messages.length)],
    mood2messages[Math.floor(Math.random() * mood2messages.length)],
    mood3messages[Math.floor(Math.random() * mood3messages.length)],
    mood4messages[Math.floor(Math.random() * mood4messages.length)]
  ];

  const quote = m[mood-1]? m[mood-1].quote: '';
  const author = m[mood-1]? m[mood-1].author: '';

  return (
    <div className='ClearDayResponse hide' onClick={closeResponseWindow}>
      <div className='ClearDayResponseBox'>
        <p className='closeResponse' onClick={closeResponseWindow}>X</p>
        <p className='quote'>{quote}</p>
        <p className='author'>- {author}</p>
      </div>
    </div>
  );
}

const closeResponseWindow = () =>{
  document.querySelector('.ClearDayResponse').classList.add('hide')
}

const mapStateToProps = state => {
  return {
    calendar: state.calendar.year2020,
    month: state.current.month,
    day: state.current.day
  }
}

export default connect(mapStateToProps)(ClearDayResponse);
