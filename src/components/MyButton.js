const MyButton = ({ text, onClick, type }) => {
  const buttonType = ["positive", "negative"].includes(type) ? type : "default";
  return (
    <button className={`MyButton MyButton_${buttonType}`} onClick={onClick}>
      {text}
    </button>
  );
};

export default MyButton;
