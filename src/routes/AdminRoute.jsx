import { Route, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { toast } from 'react-toastify'

const AdminRoute = ({ children }) => {
  const navigate = useNavigate();
  const [role, setRole] = useState('')

  useEffect(() => {
    const token = Cookies.get('jwt');
    const response = axios.post('http://localhost:8017/v1/users/verifytoken', {
      token
    })
      .then(response => {
        setRole(response.data.role)
      })

    if (role !== 'Admin') {
      toast.warning('You are not Admin', { draggable: false })

      navigate('/');
    }
  }, [navigate]);

  return children;
};

export default AdminRoute;