
import _ from 'lodash';

// REDUCER
const initial = {
  year2020:{
    // month0:{ num:0, name:'January', length:31, starts:3, days:{day1:{mood:1}, day2:{mood:2}, day3:{mood:3}, day4:{mood:4}}},
    // month2:{ num:2, name:'March', length:31, starts:0, days:{day11:{mood:1}, day12:{mood:2}, day13:{mood:3}, day14:{mood:4}} }
  }
}

const calendarReducer = ( state = initial, action) => {
  switch(action.type) {

    // stored
    case 'SYNC_REDUX_FIREBASE_CALENDARS':
      return {
        ...state,
        [`year2020`]:{
          ...state['year2020'],
          ...action.stored
        }
      }

    // monthName, month
    case 'ADD_MONTH':
      return {
        ...state,
        [`year2020`]:{
          ...state[`year2020`],
          [action.monthName] : action.month
        }
      }

    // dayNamw, day, month
    case 'ADD_DAY':
      return {
        ...state,
        [`year2020`]:{
          ...state[`year2020`],
          [`month${action.month}`]:{
            ...state[`year2020`][`month${action.month}`],
            days:{
              ...state[`year2020`][`month${action.month}`].days,
              [action.dayName]:action.day
            }
          }
        }
      }

    // month, day, mood
    case 'SET_MOOD':
      return {
        ...state,
        [`year2020`]:{
          ...state[`year2020`],
          [`month${action.month}`]:{
            ...state[`year2020`][`month${action.month}`],
            days : {
                ...state[`year2020`][`month${action.month}`].days,
                [`day${action.day}`]:{
                  ...state[`year2020`][`month${action.month}`].days[`day${action.day}`],
                  mood:action.mood
                }
            }
          }
        }
      }

    // month, day, message
    case 'SET_MESSAGE':
      return {
        ...state,
        [`year2020`]:{
          ...state[`year2020`],
          [`month${action.month}`]:{
            ...state[`year2020`][`month${action.month}`],
            days : {
                ...state[`year2020`][`month${action.month}`].days,
                [`day${action.day}`]:{
                  ...state[`year2020`][`month${action.month}`].days[`day${action.day}`],
                  message:action.message
                }
            }
          }
        }
      }

    case 'CLEAR_DAY':
      const newState = _.cloneDeep(state);
      _.unset(newState, `year2020.month${action.month}.days.day${action.day}`);
      return newState;

    default:
      return state;
  }
}

export default calendarReducer;
