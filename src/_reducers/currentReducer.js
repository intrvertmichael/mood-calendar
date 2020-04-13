

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
      return { ...state, total:action.total};

    default:
      return state;
  }
}

export default currentReducer;
