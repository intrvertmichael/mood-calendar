import React from 'react';
import Calendar from './Calendar';

class App extends React.Component {
  render() {
    return(
      <div className='container'>
        <div className='title'>
          <p>Mood Calendar</p>
          <div className='faces'>
            <div className='circleface mood4'> </div>
            <div className='circleface mood3'> </div>
            <div className='circleface mood2'> </div>
            <div className='circleface mood1'> </div>
          </div>
        </div>


        <Calendar />
      </div>
    );
  }
}

export default App;
