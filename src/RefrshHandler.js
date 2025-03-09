
// import { useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';

// function RefreshHandler({ setIsAuthenticated }) {
//   const location = useLocation();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     const role = localStorage.getItem('role');

//     if (token) {
//       setIsAuthenticated(true);

//       // Redirect based on role
//       if (location.pathname === '/' || location.pathname.startsWith('/admin')) {
//         if (role?.toLowerCase() === 'admin') {
//           navigate('/admin/admindashboard', { replace: true });
//         } 
//       }
//     }
//   }, [location, navigate, setIsAuthenticated]);

//   return null;
// }

// export default RefreshHandler;

// import { useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';

// function RefreshHandler({ setIsAuthenticated }) {
//   // const location = useLocation();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     const role = localStorage.getItem('role');

   

//     if (token) {
//       setIsAuthenticated(true);

//       if (role && role.toLowerCase() === 'admin') {
       

//         setTimeout(() => {
//           navigate('/admin/admindashboard', { replace: true });
         
//         }, 100); // Small delay for smooth navigation
//       }
//     }
//   }, [navigate, setIsAuthenticated]);

//   return null;
// }

// export default RefreshHandler;

// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// function RefreshHandler({ setIsAuthenticated }) {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const role = localStorage.getItem("role");

//     if (token) {
//       setIsAuthenticated((prev) => {
//         if (!prev) return true; // Prevent unnecessary state update
//         return prev;
//       });

//       if (role?.toLowerCase() === "admin") {
//         setTimeout(() => {
//           navigate("/admin/admindashboard", { replace: true });
//         }, 100);
//       }
//     }
//   }, [navigate, setIsAuthenticated]); // No unnecessary dependencies

//   return null;
// }

// export default RefreshHandler;

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
      if (role?.toLowerCase() === 'admin' && location.pathname === "/home" && location.pathname === " " ) {
        console.log("Redirecting to Admin Dashboard...");
        navigate('/admin/admindashboard', { replace: true });
      }
    }
  }, [location.pathname, navigate, setIsAuthenticated]);

  return null;
}

export default RefreshHandler;
