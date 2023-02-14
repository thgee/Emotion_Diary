import { useNavigate } from "react-router-dom";
import { useContext, memo } from "react";

import MyButton from "./MyButton";

import { DiaryDispatchContext } from "../App";

const DiaryItem = ({ id, emotion, content, date }) => {
  const navigate = useNavigate();
  const { onRemove } = useContext(DiaryDispatchContext);

  const handleRemove = () => {
    if (window.confirm("일기를 삭제하시겠습니까?")) onRemove(id);
    return;
  };

  return (
    <div className="DiaryItem">
      <div
        className={`emotion_img_wrapper emotion_img_wrapper_${emotion}`}
        onClick={() => navigate(`/diary/${id}`)}
      >
        <img src={process.env.PUBLIC_URL + `assets/emotion${emotion}.png`} />
      </div>

      <div onClick={() => navigate(`/diary/${id}`)} className="info_wrapper">
        <div className="diary_date">{new Date(date).toLocaleDateString()}</div>
        <div className="diary_content_priview">{content.slice(0, 20)}</div>
      </div>

      <div className="btn_wrapper">
        <MyButton onClick={() => navigate(`/edit/${id}`)} text="수정하기" />
        <MyButton onClick={handleRemove} text="삭제하기" type="negative" />
      </div>
    </div>
  );
};

export default memo(DiaryItem);
