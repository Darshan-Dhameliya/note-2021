import React,{useReducer} from "react";
import "./App.css";
import Notes from "./notes";
import {IntialState,ActionReducer,DataContext} from "./Provider/DataProvider"

export default function App() {

const [state,dispatch]=useReducer(ActionReducer,IntialState)
  return (
    <DataContext.Provider value={{state,dispatch}}>
      <div>
        <Notes />
      </div>
    </DataContext.Provider>
  );
}
