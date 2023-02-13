import { useNavigate } from "react-router-dom";

import MyButton from "./MyButton";

const DiaryItem = ({ id, emotion, content, date }) => {
  const navigate = useNavigate();

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
      </div>
    </div>
  );
};

export default DiaryItem;
