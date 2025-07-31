export const saveUserData = (data) => {
  localStorage.setItem("userData", JSON.stringify(data));
};

export const loadUserData = () => {
  return (
    JSON.parse(localStorage.getItem("userData")) || { xp: 0, lvl: 0, streak: 0 }
  );
};
