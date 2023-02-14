import { memo } from "react";

const EmotionItem = ({
  emotion_id,
  emotion_img,
  emotion_descript,
  onClick,
  selectedEmotion,
}) => {
  const isSelected = (emotion_id) => {
    return selectedEmotion === emotion_id;
  };

  return (
    <div
      className={[
        "EmotionItem",
        isSelected(emotion_id) ? `SelectedEmotionItem_${emotion_id}` : "",
      ].join(" ")}
      onClick={() => onClick(emotion_id)}
    >
      <img src={emotion_img} />
      <div className="emotion_descript">{emotion_descript}</div>
    </div>
  );
};
export default memo(EmotionItem);
