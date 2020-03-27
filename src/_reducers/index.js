// REDUCER
const initial = {
  profile: {
    name: 'Michael',
    dark: false
  },
  clicked: {
    year: 0,
    month: 0,
    day: 1,
    mood: 1
  },
  calendar: {
    year2020:{
      name:2020,
      // MOOD 1 _ BAD
      // MOOD 2 _ NOT SO GOOD
      // MOOD 3 _ OKAY
      // MOOD 4 _ GOOD
      month0:{
          num:0,
          name:'January',
          length:31,
          starts:4,
          days:[
            {day:1, mood:2}
          ]
      } ,
      month1:{
          num:1,
          name:'February',
          length:28,
          starts:6,
          days:[
            {day:2, mood:1}
          ]
      } ,
      month2:{
          num:2,
          name:'March',
          length:31,
          starts:0,
          days:[
            {day:3, mood:4}
          ]
      } ,
      month3:{
          num:3,
          name:'April',
          length:30,
          starts:3,
          days:[
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
          num:2,
          name:'March',
          length:31,
          starts:0,
          days:[]
      } ,
      month3:{
          num:3,
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
          [`year${state.clicked.year}`]:{
            ...state.calendar[`year${state.clicked.year}`],
            [`month${state.clicked.month}`] : {
              ...state.calendar[`year${state.clicked.year}`][`month${state.clicked.month}`],
                days:
                  [
                    ...state.calendar[`year${state.clicked.year}`][`month${state.clicked.month}`].days,
                    {day: action.day, mood: action.mood}
                  ]
            }
          }
        }
      }
    default:
      return state;
  }
}

export default reducer;
