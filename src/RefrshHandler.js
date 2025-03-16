

import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function RefreshHandler({ setIsAuthenticated }) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (token) {
      setIsAuthenticated(prev => {
        if (!prev) {
          console.log("User authenticated");
          return true;
        }
        return prev;
      });

      // ✅ Ensure redirection happens only if the role is admin & not already on the dashboard
      if (role?.toLowerCase() === 'admin' && (location.pathname === "/home" || location.pathname === "/" )) {
        console.log("Redirecting to Admin Dashboard...");
        navigate('/admin/admindashboard', { replace: true });
      }
    }
  }, [location.pathname, navigate, setIsAuthenticated]);

  return null;
}

export default RefreshHandler;
