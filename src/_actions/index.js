

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
export const setClickedMood = (mood) => {
  return {
    type: 'SET_CLICKED_MOOD',
    payload: mood
  }
}

export const addMoodDay = (day, mood) => {
  return {
    type: 'ADD_MOOD_DAY',
    day: day,
    mood: mood
  }
}
