// REDUCER
const initial = {
  profile: {
    name: 'Michael',
    dark: false
  },
  clicked: {
    day: 1,
    mood: 1,
    month: 0,
    year: 0
  },
  calendar: {
    year2020:{
      name:2020,
      // MOOD 1 _ BAD
      // MOOD 2 _ NOT SO GOOD
      // MOOD 3 _ OKAY
      // MOOD 4 _ GOOD
      month0:{
          name:'January',
          length:31,
          starts:4,
          days:[]
      } ,
      month1:{
          name:'February',
          length:28,
          starts:6,
          days:[]
      } ,
      month2:{
          name:'March',
          length:31,
          starts:0,
          days:[]
      } ,
      month3:{
          name:'April',
          length:30,
          starts:3,
          days:[
            {day:1, mood:2},
            {day:2, mood:1},
            {day:3, mood:4},
            {day:4, mood:3}
          ]
      }
    } ,
    year2021:{
      name:2021,
      // MOOD 1 _ BAD
      // MOOD 2 _ NOT SO GOOD
      // MOOD 3 _ OKAY
      // MOOD 4 _ GOOD
      month2:{
          name:'March',
          length:31,
          starts:0,
          days:[]
      } ,
      month3:{
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
  }
}

const reducer = ( state = initial, action) => {
  switch(action.type) {
    case 'SET_CLICKED':
      return {
        ...state,
         clicked: {
           ...state.clicked,
           day:action.day,
           mood:action.mood
         }
         };
    case 'SET_CALENDER':
      return {
        ...state,
         clicked: {
           ...state.clicked,
           month:action.month,
           year:action.year
         }
         };
    case 'ADD_MOOD_DAY':
      return {
        ...state, //copy state
        calendar: {
          ...state.calendar, //copy months
          year2020:{
            ...state.calendar.year2020,
            month2: {
              ...state.calendar.year2020.month2, //copy single month
              days:[...state.calendar.year2020.month2.days, {day: action.day, mood: action.mood}]
            }
          }
        }
      }
    default:
      return state;
  }
}

export default reducer;
