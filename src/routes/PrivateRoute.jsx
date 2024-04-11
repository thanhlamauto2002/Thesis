import { Route, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Cookies from 'js-cookie';

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get('jwt');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  return children;
};

export default PrivateRoute;