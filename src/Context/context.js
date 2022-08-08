import { useContext, createContext, useReducer } from "react";
import { reducerFunc, prevState } from "./reducer";
const UserContext = createContext();
const UserContextWrapper = ({ children }) => {
  const [state, dispatch] = useReducer(reducerFunc, prevState);
  return (
    <UserContext.Provider value={[state, dispatch]}>
      {children}
    </UserContext.Provider>
  );
};
const useUserInfo = () => useContext(UserContext);
export { UserContextWrapper, useUserInfo };
