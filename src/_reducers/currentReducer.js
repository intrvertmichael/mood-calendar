

const current = {
  year: 2020,
  month: null,
  day: null,
  mood: null,
  message: null
}

const currentReducer = ( state=current, action ) => {
  switch (action.type) {
    case 'SET_CURRENT':
      return { ...state, year:action.year, month: action.month, day: action.day, mood: action.mood, message: action.message };

    case 'SET_CLICKED':
      return { ...state, day:action.day, mood:action.mood };

    case 'SET_CALENDER':
      return { ...state, month:action.month, year:action.year };
      
    default:
      return state;
  }
}

export default currentReducer;
