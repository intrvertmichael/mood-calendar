

const current = {
  year: 2020,
  month: null,
  day: null,
  total: null
}

const currentReducer = ( state=current, action ) => {
  switch (action.type) {
    case 'SET_CURRENT':
      return { ...state, year:action.year, month: action.month, day: action.day, mood: action.mood, message: action.message };

    case 'SET_CURRENT_MONTH':
      return { ...state, month:action.month};

    case 'SET_CURRENT_DAY':
      return { ...state, day:action.day};

    case 'SET_CURRENT_AVG':
      console.log('inside set current avg');
      let localTotal = 0;
      const allDays = action.days;
      const allDaysArray = Object.entries(allDays);
      if(allDaysArray.length>2){
        for(let m=0 ; m< allDaysArray.length ; m++ ){
          localTotal += allDaysArray[m][1].mood;
        }
        localTotal = Math.round(localTotal/allDaysArray.length);
      }
      return { ...state, total:localTotal};

    default:
      return state;
  }
}

export default currentReducer;
