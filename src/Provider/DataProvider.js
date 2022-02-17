import { createContext } from "react";

export const IntialState = {
  notes: JSON.parse(localStorage.getItem("notes")) || [],
};

export const ActionReducer = (state = IntialState, action) => {
  switch (action.mode) {
    case "add":
      const addnote = [...state.notes, action.data];
      localStorage.setItem("notes", JSON.stringify(addnote));
      return {
        ...state,
        notes: addnote,
      };
    case "remove":
      const removenote = state.notes.filter((item) => item.id !== action.id);
      localStorage.setItem("notes", JSON.stringify(removenote));
      return {
        ...state,
        notes: removenote,
      };
    case "update":
      const updateNotes = [];
      state.notes.forEach((item) => {
        if (item.id === action.data.id) {
          updateNotes.push(action.data);
        } else {
          updateNotes.push(item);
        }
      });
      localStorage.setItem("notes", JSON.stringify(updateNotes));
      return {
        ...state,
        notes: updateNotes,
      };
    default:
      return state;
  }
};

export const DataContext = createContext(ActionReducer);
