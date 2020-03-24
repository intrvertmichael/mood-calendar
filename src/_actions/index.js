

// ACTIONS
export const increment = (num) => {
  return {
    type: 'INCREMENT',
    payload: num
  }
}

export const decrement = () => {
  return {
    type: 'DECREMENT'
  }
}

export const setClickedDay = (day) => {
  return {
    type: 'SET_CLICKED_DAY',
    payload: day
  }
}
