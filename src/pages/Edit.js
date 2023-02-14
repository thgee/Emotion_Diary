import { useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DiaryStateContext } from "../App";

import DiaryEditor from "../components/DiaryEditor";

const Edit = () => {
  const data = useContext(DiaryStateContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = true;

  const targetDiary = data.find((it) => parseInt(it.id) === parseInt(id));

  useEffect(() => {
    if (targetDiary) {
    } else {
      alert("없는 일기입니다 !");
      navigate("/", { replace: true });
    }
  }, []);

  return (
    <div className="Edit">
      {targetDiary ? (
        <DiaryEditor targetDiary={targetDiary} isEdit={isEdit} />
      ) : (
        <></>
      )}
    </div>
  );
};

export default Edit;
