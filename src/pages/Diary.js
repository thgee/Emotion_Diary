import { useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { DiaryStateContext } from "../App";

import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";

import getDate from "../utils/getDate";
import emotionList from "../utils/emotionList";

const Diary = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const data = useContext(DiaryStateContext);

  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `${id}번째 일기`;

    if (targetDiary.id === -1) {
      alert("존재하지 않는 일기입니다 !");
      navigate("/", { replace: true });
    }
  }, []);

  const getTargetDiary = () => {
    const res = data.find((it) => parseInt(it.id) === parseInt(id));
    return res ? res : { id: -1 };
  };

  const targetDiary = getTargetDiary();

  const currentEmotion = emotionList.find(
    (it) => parseInt(it.emotion_id) === parseInt(targetDiary.emotion)
  );

  if (targetDiary.id === -1) return;
  else
    return (
      <div className="Diary">
        <MyHeader
          headText={`${getDate(targetDiary.date)} 기록`}
          leftChild={
            <MyButton
              text="< 뒤로가기"
              onClick={() => {
                navigate(-1);
              }}
            />
          }
          rightChild={
            <MyButton
              text="수정하기"
              onClick={() => {
                navigate(`/edit/${targetDiary.id}`);
              }}
            />
          }
        />

        <article>
          <section>
            <h3>오늘의 감정</h3>
            <div
              className={`emotion_wrapper emotion_wrapper_${targetDiary.emotion}`}
            >
              <img src={currentEmotion.emotion_img} />
              <div> {currentEmotion.emotion_descript}</div>
            </div>
          </section>
          <section>
            <h3>오늘의 일기</h3>
            <div className="text_wrapper">{targetDiary.content}</div>
          </section>
        </article>
      </div>
    );
};

export default Diary;
