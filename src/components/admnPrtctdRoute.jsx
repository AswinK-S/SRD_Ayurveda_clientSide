/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const AdmnProtectedRoute = ({ children, allowedRole }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('admintoken');

  useEffect(() => {
    try {
      if (token) {
        const decode = jwtDecode(token);

        if (decode.role !== allowedRole) {
          navigate('/admin');
        }
        // No need for an else block, you can proceed with the rendering logic
      } else {
        navigate('/admin');
      }
    } catch (error) {
      navigate('/admin');
    }
  }, [token,navigate,allowedRole]); // Dependency array is empty to run the effect only once

  // Render the content based on conditions
  return <>{children}</>;
};

export default AdmnProtectedRoute;
