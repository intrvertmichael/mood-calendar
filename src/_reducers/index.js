

// REDUCER
const initial = {
  num: 0,
  clickedDay: {},
  currentMonth: 0,
  months: [
    {
      name:'March',
      length:31,
      starts:0,
      days:[
        {day:1, mood:2},
        {day:2, mood:1},
        {day:3, mood:4},
        {day:4, mood:3},
        {day:5, mood:4},
        {day:6, mood:3},
        {day:7, mood:2},
        {day:8, mood:1},
        {day:9, mood:4},
        {day:10, mood:3},
        {day:11, mood:2},
        {day:12, mood:1},
        {day:13, mood:4},
        {day:14, mood:3},
        {day:15, mood:2},
        {day:16, mood:1},
        {day:17, mood:4},
        {day:18, mood:3},
        {day:19, mood:2},
        {day:20, mood:1},
        {day:21, mood:2},
        {day:22, mood:1}
      ]
    } ,
    {
      name:'April',
      length:30,
      starts:3,
      days:[
        {day:1, mood:2},
        {day:2, mood:1},
        {day:3, mood:4}
      ]
    }
  ],
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
    default:
      return state;
  }
}

export default reducer;
