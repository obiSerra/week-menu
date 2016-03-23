export const ADD_DAY = 'ADD_DAY';
export const addDay = (day, lunch, dinner) => ({ type: ADD_DAY, day, lunch, dinner  });

export const EDIT_DAY = 'EDIT_DAY';
export const editDay = (day) => ({ type: EDIT_DAY, day});
