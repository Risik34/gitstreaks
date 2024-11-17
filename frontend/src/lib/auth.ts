export const isAuth = () => {
  const jwt = localStorage.getItem('jwtToken');
  if (!jwt) {
    return false;
  }
  return true;
};
