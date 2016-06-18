export default (state=[], action={}) => {
  if (action.error) {
    console.error(action.error);
    return [...state, action.error];
  }
  return state;
};
