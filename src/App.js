import React, { useReducer, useRef, useEffect } from "react";
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

  localStorage.setItem("diaryList", JSON.stringify(newState));
  return newState;
};

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

function App() {
  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem("diaryList"));
    if (localData && localData.length > 0) {
      localData.sort((a, b) => b - a);
      dataId.current = parseInt(localData[0].id + 1);
      dispatch({ type: "INIT", data: localData });
    }
  }, []);

  const [data, dispatch] = useReducer(reducer, []);
  const dataId = useRef(0);

  // CREATE
  const onCreate = (date, content, emotion) => {
    dispatch({
      type: "CREATE",
      data: {
        id: dataId.current,
        emotion,
        content,
        date: new Date(date).getTime(),
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
              <Route path="/" element={<Home data={data} />} />
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
