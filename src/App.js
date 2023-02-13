import React, { useReducer, useRef } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";

import Home from "./pages/Home.js";
import New from "./pages/New.js";
import Diary from "./pages/Diary";
import Edit from "./pages/Edit.js";

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE":
      const newItem = {
        ...action.data,
      };
      newState = [newItem, ...state];
      break;
    case "REMOVE":
      newState = state.filter((it) => it.id !== action.targetId);
      break;
    case "EDIT":
      newState = state.map((it) => {
        return it.id === action.data.id ? action.data : it;
      });
      break;

    default:
      return state;
  }

  return newState;
};

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

const dummyData = [
  {
    id: 1,
    emotion: 1,
    content: `오늘의 일기 1번`,
    date: new Date().getTime() + 1,
  },

  {
    id: 2,
    emotion: 2,
    content: `오늘의 일기 2번`,
    date: new Date().getTime() + 2,
  },
  {
    id: 3,
    emotion: 3,
    content: `오늘의 일기 3번`,
    date: new Date().getTime() + 3,
  },
  {
    id: 4,
    emotion: 4,
    content: `오늘의 일기 4번`,
    date: new Date().getTime() + 4,
  },
  {
    id: 5,
    emotion: 5,
    content: `오늘의 일기 5번`,
    date: new Date().getTime() + 5,
  },
];

function App() {
  const [data, dispatch] = useReducer(reducer, dummyData);

  const dataId = useRef(0);

  // CREATE
  const onCreate = (date, content, emotion) => {
    dispatch({
      type: "CREATE",
      data: {
        id: dataId.current,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
    dataId.current++;
  };

  // REMOVE
  const onRemove = (targetId) => {
    dispatch({ targetId, type: "REMOVE" });
  };

  // EDIT
  const onEdit = (targetId, date, content, emotion) => {
    dispatch({
      type: "EDIT",
      data: { id: targetId, date: new Date(date).getTime(), content, emotion },
    });
  };

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={{ onCreate, onEdit, onRemove }}>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/new" element={<New />} />
              <Route path="/edit/:id" element={<Edit />} />
              <Route path="/diary/:id" element={<Diary />} />
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
