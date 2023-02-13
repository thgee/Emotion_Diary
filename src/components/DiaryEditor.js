import { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DiaryDispatchContext } from "../App";

import MuButton from "./MyButton";
import MyHeader from "./MyHeader";
import EmotionItem from "./EmotionItem";
import MyButton from "./MyButton";

const emotionList = [
  {
    emotion_id: 5,
    emotion_img: process.env.PUBLIC_URL + "/assets/emotion5.png",
    emotion_descript: "완전 좋음",
  },
  {
    emotion_id: 4,
    emotion_img: process.env.PUBLIC_URL + "/assets/emotion4.png",
    emotion_descript: "좋음",
  },
  {
    emotion_id: 3,
    emotion_img: process.env.PUBLIC_URL + "/assets/emotion3.png",
    emotion_descript: "그럭저럭",
  },
  {
    emotion_id: 2,
    emotion_img: process.env.PUBLIC_URL + "/assets/emotion2.png",
    emotion_descript: "나쁨",
  },
  {
    emotion_id: 1,
    emotion_img: process.env.PUBLIC_URL + "/assets/emotion1.png",
    emotion_descript: "끔찍함",
  },
];

const DiaryEditor = () => {
  const navigate = useNavigate();
  const { onCreate } = useContext(DiaryDispatchContext);
  const contentRef = useRef();
  const emotionRef = useRef();

  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [content, setContent] = useState("");
  const [selectedEmotion, setSelectedEmotion] = useState(0);

  const isSelected = (target_id) => {
    setSelectedEmotion(target_id);
    if (selectedEmotion === target_id) setSelectedEmotion(0);
  };

  const handleSubmit = () => {
    if (selectedEmotion === 0) {
      emotionRef.current.focus();
      return;
    }

    if (content.length === 0) {
      contentRef.current.focus();
      return;
    }

    navigate("/", { replace: true });
    onCreate(date, content, selectedEmotion);
  };

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

        <div tabIndex="0" ref={emotionRef} className="emotionList">
          {emotionList.map((it) => (
            <EmotionItem
              key={it.emotion_id}
              {...it}
              onClick={isSelected}
              selectedEmotion={selectedEmotion}
            />
          ))}
        </div>
      </section>
      <section>
        <h3>오늘의 일기</h3>
        <textarea
          ref={contentRef}
          placeholder="일기 쓰고 자라"
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
        />
      </section>
      <section>
        <div className="btn_wrapper">
          <MyButton
            text={"취소하기"}
            onClick={() => {
              navigate(-1);
            }}
          />
          <MyButton
            text={"작성완료"}
            onClick={handleSubmit}
            type={"positive"}
          />
        </div>
      </section>
    </div>
  );
};
export default DiaryEditor;
