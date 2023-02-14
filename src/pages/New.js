import { useEffect } from "react";
import DiaryEditor from "../components/DiaryEditor";

const New = () => {
  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `새 일기 쓰기`;
  }, []);
  return (
    <div className="New">
      <DiaryEditor />
    </div>
  );
};

export default New;
