export const getCurrentDate = () => {
  return new Date().toISOString().slice(0, 10);
};

const getDate = (date_ms) => {
  return new Date(date_ms).toISOString().slice(0, 10);
};

export default getDate;
