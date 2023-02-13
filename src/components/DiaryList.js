import { useState } from "react";
import { useNavigate } from "react-router-dom";

import DiaryItem from "./DiaryItem";
import MyButton from "./MyButton";

const ControlMenu = ({ value, onChange, optionList }) => {
  return (
    <select
      className="controlMenu"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {optionList.map((it, idx) => (
        <option key={idx} value={it.value}>
          {it.name}
        </option>
      ))}
    </select>
  );
};

const DiaryList = ({ diaryList }) => {
  const [sortType, setSortType] = useState("latest");
  const [filter, setFilter] = useState("all");

  const navigate = useNavigate();

  const sortOptionList = [
    { value: "latest", name: "최신순" },
    { value: "oldest", name: "오래된 순" },
  ];

  const filterOptionList = [
    { value: "all", name: "전부다" },
    { value: "good", name: "좋은 감정만" },
    { value: "bad", name: "나쁜 감정만" },
  ];

  const getProcessDiaryList = () => {
    const compare = (a, b) => {
      if (sortType === "latest") return b.date - a.date;
      if (sortType === "oldest") return a.date - b.date;
    };

    const filterCallBack = (it) => {
      if (filter === "good") return parseInt(it.emotion) >= 3;
      else return parseInt(it.emotion) <= 2;
    };

    const copyDiaryList = JSON.parse(JSON.stringify(diaryList));
    const filteredList =
      filter === "all" ? copyDiaryList : copyDiaryList.filter(filterCallBack);
    const sortedList = filteredList.sort(compare);
    return sortedList;
  };

  return (
    <div className="DiaryList">
      <div className="menu_wrapper">
        <div className="left_col">
          <ControlMenu
            value={sortType}
            onChange={setSortType}
            optionList={sortOptionList}
          />
          <ControlMenu
            value={filter}
            onChange={setFilter}
            optionList={filterOptionList}
          />
        </div>
        <div className="right_col">
          <MyButton
            text={`새 일기쓰기`}
            onClick={() => {
              navigate("/new");
            }}
            type={"positive"}
          />
        </div>
      </div>

      {getProcessDiaryList().map((it) => (
        <div key={it.id}>
          <DiaryItem {...it} />
        </div>
      ))}
    </div>
  );
};

DiaryList.defaultProps = { diaryList: [] };

export default DiaryList;
