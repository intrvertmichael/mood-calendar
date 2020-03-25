

// REDUCER
const initial = {
  num: 0,
  clickedDay: 1,
  clickedMood: 1,
  currentMonth: 'march',
  currentYear: '2020',
  calendar: {
    year2020:{
      name:2020,
      march:{
        name:'March',
        length:31,
        starts:0,
        days:[
          {day:1, mood:2}
        ]
      } ,
      april:{
        name:'April',
        length:30,
        starts:3,
        days:[
          {day:1, mood:2},
          {day:2, mood:1},
          {day:3, mood:4}
        ]
      }
    }
  },
  profile: {
    name: 'Michael',
    dark: false
  }
}

// MOOD 1 _ BAD
// MOOD 2 _ NOT SO GOOD
// MOOD 3 _ OKAY
// MOOD 4 _ GOOD


const reducer = ( state = initial, action) => {
  switch(action.type) {
    case 'INCREMENT':
      state.num += action.payload;
      return state;
    case 'DECREMENT':
      state.num -= 5;
      return state;
    case 'SET_CLICKED_DAY':
      return {...state, clickedDay:action.payload };
    case 'SET_CLICKED_MOOD':
      return {...state, clickedMood:action.payload };
    case 'ADD_MOOD_DAY':
      return {
        ...state, //copy state
        calendar: {
          ...state.calendar, //copy months
          year2020:{
            ...state.calendar.year2020,
            march: {
              ...state.calendar.year2020.march, //copy single month
              days:[...state.calendar.year2020.march.days, {day: action.day, mood: action.mood}]
            }

          }
        }
      }
    default:
      return state;
  }
}

export default reducer;
