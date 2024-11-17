import { useNavigate } from "@tanstack/react-router";

// const navigate = useNavigate({from:'/'})
export const isAuth = () => {
  const jwt = localStorage.getItem('jwtToken');
  if (!jwt) {
    // navigate({to:'/login'})
    return false;
  }
  return true;
};
