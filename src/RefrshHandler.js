// import  { useEffect } from 'react'
// import { useLocation, useNavigate } from 'react-router-dom'

// function RefrshHandler({ setIsAuthenticated }) {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const role = localStorage.getItem('role'); 
//     useEffect(() => {
//         if (localStorage.getItem('token')) {
//             setIsAuthenticated(true);
//             if (location.pathname === '/' ||
//                 location.pathname === '/login' ||
//                 location.pathname === '/signup'
//             ) {
//                 // navigate('/adminblogs', { replace: false });
//                 if (role === 'Admin') {
//                     navigate('/adminblogs', { replace: false });
//                   } else if (role === 'Editor') {
//                     navigate('/blogs', { replace: false });
//                   }
//             }
//         }
//     }, [location, navigate, setIsAuthenticated])

//     return (
//         null
//     )
// }

// export default RefrshHandler

import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function RefreshHandler({ setIsAuthenticated }) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role'); // Assuming the role is stored in localStorage

    if (token) {
      setIsAuthenticated(true);

      // Redirect based on role
      if (
      
        // location.pathname === '/' ||
        location.pathname === '/login' ||
        location.pathname === '/signup'
       
      ) {
        if (role === 'Admin') {
          navigate('/home');
        } else if (role === 'Editor') {
          navigate('/home');
        }
      }
    }
  }, [location, navigate, setIsAuthenticated]);

  return null;
}

export default RefreshHandler;
