import React, { useReducer, useContext, createContext, Dispatch } from "react";
import { ITrackingInfo } from "../@types";

type State = {
  data: ITrackingInfo[];
  loading: boolean;
};

type Action =
  | { type: "STORE_DATA"; data: ITrackingInfo[] }
  | { type: "ADD_DATA"; data: ITrackingInfo }
  | { type: "FETCH_DATA" };

type TypeDispatch = Dispatch<Action>;

const RecordStateContext = createContext<State | null>(null);
const RecordDispatchContext = createContext<TypeDispatch | null>(null);

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "STORE_DATA":
      return {
        data: action.data,
        loading: false,
      };
    case "ADD_DATA":
      return {
        data: [...state.data, action.data],
        loading: false,
      };
    case "FETCH_DATA":
      return {
        ...state,
        loading: true,
      };
    default:
      throw new Error("Unhandled action");
  }
}
export function RecordProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    data: [],
  });

  return (
    <RecordStateContext.Provider value={state}>
      <RecordDispatchContext.Provider value={dispatch}>
        {children}
      </RecordDispatchContext.Provider>
    </RecordStateContext.Provider>
  );
}

export function useRecordState() {
  const state = useContext(RecordStateContext);
  if (!state) throw new Error("Cannot find RecordStateContext");
  return state;
}

export function useRecordDispatch() {
  const dispatch = useContext(RecordDispatchContext);
  if (!dispatch) throw new Error("Cannot find RecordDispatchContext");
  return dispatch;
}
