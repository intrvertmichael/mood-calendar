

// ACTIONS
export const setClicked = (day, mood) => {
  return {
    type: 'SET_CLICKED',
    day: day,
    mood: mood
  }
}

export const addMoodDay = (day, mood) => {
  return {
    type: 'ADD_MOOD_DAY',
    day: day,
    mood: mood
  }
}
