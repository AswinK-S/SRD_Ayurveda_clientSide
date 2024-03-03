import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

// Define the type for the allowedRole prop


// eslint-disable-next-line react/prop-types
const AdmnProtectedRoute = ({ children, allowedRole }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(null); // Update the type accordingly

  const token = localStorage.getItem('token')
  console.log('admin tokn ;', token);

  useEffect(() => {
    try {
      if (token) {
        const decode = jwtDecode(token);
        console.log('ttttt admin',decode.role);
        console.log('allowed role admin',allowedRole);
        setRole(decode.role);

        if (decode.role !== allowedRole) {
          // Navigate to a different page or show an error message
          navigate('/admin')
        }
      } else {
        // If there's no token, navigate to the login page
        navigate('/admin');
      }
    } catch (error) {
      console.error('Error decoding token:', error);
      // Handle error if necessary, e.g., redirect to a login page
      navigate('/admin');
    } finally {
      setLoading(false);
    }
  }, [token, navigate, allowedRole]);

  

  // Render the content based on conditions
  if (loading) {
    return <p>Loading...</p>; // Adjust the loading state as needed
  }

  if (role === allowedRole) {
    return <>{children}</>;
  }

  // Handle the case where the role doesn't match the allowed role
  return <p>You do not have the required role to access this page.</p>; // Adjust the message as needed
}

export default AdmnProtectedRoute
