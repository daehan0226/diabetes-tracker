import React, { useReducer, useContext, createContext, Dispatch } from "react";

type State = {
  loggedIn: boolean;
  userId: string; // GOOGLE GMAIL UID
};

type Action = { type: "LOG_IN"; userId: string } | { type: "LOG_OUT" };

type TypeDispatch = Dispatch<Action>;

const AuthStateContext = createContext<State | null>(null);
const AuthDispatchContext = createContext<TypeDispatch | null>(null);

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "LOG_IN":
      return {
        ...state,
        userId: action.userId,
        loggedIn: true,
      };
    case "LOG_OUT":
      return {
        ...state,
        userId: "",
        loggedIn: false,
      };
    default:
      throw new Error("Unhandled action");
  }
}
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, {
    loggedIn: false,
    userId: "",
  });

  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
}

export function useAuthState() {
  const state = useContext(AuthStateContext);
  if (!state) throw new Error("Cannot find AuthStateContext");
  return state;
}

export function useAuthDispatch() {
  const dispatch = useContext(AuthDispatchContext);
  if (!dispatch) throw new Error("Cannot find AuthDispatchContext");
  return dispatch;
}
