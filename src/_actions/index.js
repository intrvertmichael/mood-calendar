
// ACTIONS
export const setClicked = (day, mood) => {
  return {
    type: 'SET_CLICKED',
    day: day,
    mood: mood
  }
}

export const setCalendar = (month, year) => {
  return {
    type: 'SET_CALENDER',
    month: month,
    year: year
  }
}

export const addMoodDay = (day, mood) => {
  return {
    type: 'ADD_MOOD_DAY',
    day: day,
    mood: mood
  }
}

export const addMonth = (name, month) => {
  return {
    type: 'ADD_MONTH',
    name:name,
    month:month
  }
}
