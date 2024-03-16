/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const DoctorPrtctdRoute = ({ children, allowedRole }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('doctortoken');


  useEffect(() => {
    try {
      if (token) {
        const decode = jwtDecode(token);

        if (decode.role !== allowedRole) {
          navigate('/doctor');
        }
        // No need for an else block, you can proceed with the rendering logic
      } else {
        navigate('/doctor');
      }
    } catch (error) {
      navigate('/doctor');
    }
  }, [token, navigate, allowedRole]); // Dependency array is empty to run the effect only once

  // Render the content based on conditions
  return <>{children}</>;
};

export default DoctorPrtctdRoute;
