const user = JSON.parse(localStorage.getItem("user"));
const prevState = {
  user: user || {},
};
const reducerFunc = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      console.log(state.user);
      return { ...state, user: action.payload };
    default:
      throw new Error("not one of action.type !!!");
  }
};
export { prevState, reducerFunc };
