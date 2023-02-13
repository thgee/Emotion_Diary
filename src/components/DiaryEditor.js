import { useState } from "react";
import { useNavigate } from "react-router-dom";

import MuButton from "./MyButton";
import MyHeader from "./MyHeader";

const emotionList = [
  {
    emotion_id: 1,
    emotion_img: process.env.PUBLIC_URL + "/assets/emotion1.png",
    emotion_descript: "끔찍함",
  },
  {
    emotion_id: 2,
    emotion_img: process.env.PUBLIC_URL + "/assets/emotion2.png",
    emotion_descript: "나쁨",
  },
  {
    emotion_id: 3,
    emotion_img: process.env.PUBLIC_URL + "/assets/emotion3.png",
    emotion_descript: "그럭저럭",
  },
  {
    emotion_id: 4,
    emotion_img: process.env.PUBLIC_URL + "/assets/emotion4.png",
    emotion_descript: "좋음",
  },
  {
    emotion_id: 5,
    emotion_img: process.env.PUBLIC_URL + "/assets/emotion5.png",
    emotion_descript: "완전 좋음",
  },
];

const DiaryEditor = () => {
  const navigate = useNavigate();

  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  return (
    <div className="DiaryEditor">
      <MyHeader
        leftChild={
          <MuButton
            text="< 뒤로가기"
            onClick={() => {
              navigate(-1);
            }}
          />
        }
        headText="새 일기쓰기"
      />
      <section>
        <h3>오늘은 언제인가요?</h3>
        <input
          className="input_date"
          type="date"
          value={date}
          onChange={(e) => {
            setDate(e.target.value);
          }}
        />
      </section>
      <section>
        <h3>오늘의 감정</h3>
        <div className="emotionList">
          {emotionList.map((it) => (
            <div className="emotionItem" key={it.emotion_id}>
              <img src={it.emotion_img} />
              <div>{it.emotion_descript}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
export default DiaryEditor;
