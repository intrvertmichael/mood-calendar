import React from 'react';
import Calendar from './Calendar';

class App extends React.Component {
  render() {
    return(
      <div className='container'>
        <div className='title'>Mood Calendar</div>
        <Calendar />
      </div>
    );
  }
}

export default App;
