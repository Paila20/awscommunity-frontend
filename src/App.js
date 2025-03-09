// import { Navigate, Route, Routes } from 'react-router-dom';
// import './App.css';
// import Login from './pages/Login';
// import Home  from './pages/Home';
// import Dashboard from './pages/Dashboard';
// import JoinUs from "./pages/JoinUS";
// import About from "./pages/About";
// import Learning from "./pages/Learning";
// import Team from "./pages/Team";
// import Events from "./pages/Events";
// import AdminHome from "./pages/AdminHome";
// import AdminLayout from "./layout/AdminLayout";

// // import EditorBlogs from './pages/EditorBlogs';
// import { ToastContainer } from 'react-toastify';
// import { useState } from 'react';
// import RefrshHandler from './RefrshHandler';
// import { BlogProvider } from './context/BlogContext';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { AboutProvider } from './context/AboutContext';
// import { LearningProvider } from './context/LearningContext';
// import { TeamProvider } from './context/TeamContext';
// import { EventProvider } from './context/EventContext';

// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   const PrivateRoute = ({ element }) => {
//     return isAuthenticated ? element : <Navigate to="/home" />
//   }

//   return (
    
//        <BlogProvider>
//         <AboutProvider>
//           <LearningProvider>
//             <TeamProvider>
//             <EventProvider>
//         <ToastContainer/>

//       <RefrshHandler setIsAuthenticated={setIsAuthenticated} />
//       <Routes>
     
//         <Route path='*' element={<Navigate to="/home" />} />
//         <Route path='/admin' element={<Login />} />
//         <Route path='/home' element={<Home />} />
//         <Route path='/dashboard' element={<Dashboard />} />
//         <Route path='/joinus' element={<JoinUs />} />
//         <Route path='/about' element={<About />} />
//         <Route path='/learning' element={<Learning />} />
//         <Route path='/team' element={<Team />} />
//         <Route path='/events' element={<Events />} />
//         {/* <Route path='admin/admindashboard/home' element={<AdminHome />} /> */}
       
//      {/* Admin Routes */}
//      {/* <Route path="/admin" element={<Login />} /> */}
     
//        <Route path="/admin/admindashboard" element={<PrivateRoute element={<AdminLayout />} />}>
//     <Route index element={<AdminHome />} />
//     <Route path="sections" element={<h2>Sections Page</h2>} />
//     <Route path="team" element={<h2>Team Page</h2>} />
//     <Route path="events" element={<h2>Events Page</h2>} />
//   </Route>

//       </Routes>
//       </EventProvider>
//       </TeamProvider>
//       </LearningProvider>
//       </AboutProvider>
//       </BlogProvider>
    
//   );
// }

// export default App;

import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import JoinUs from "./pages/JoinUS";
import About from "./pages/About";
import Learning from "./pages/Learning";
import Team from "./pages/Team";
import Events from "./pages/Events";
import AdminHome from "./pages/AdminHome";
import SectionDetailsPage from "./pages/SectionDetailsPage"; 
import AdminLayout from "./layout/AdminLayout";
import { ToastContainer } from 'react-toastify';
import { useEffect, useState } from 'react';
import RefreshHandler from './RefrshHandler';
import { BlogProvider } from './context/BlogContext';
import 'bootstrap/dist/css/bootstrap.min.css';

import { TeamProvider } from './context/TeamContext';
import { EventProvider } from './context/EventContext';
import { useLocation} from 'react-router-dom';
import backgroundImage from './assets/awsbackgroundimage.jpg';
import SectionPage from './pages/SectionPage';
import { SectionProvider } from './context/SectionContext';
import SectionForm from './components/SectionForm';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const currentLocation = useLocation();

  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem('token'));
  }, []);
 
  useEffect(() => {
    if (currentLocation.pathname.startsWith('/admin')&& currentLocation.pathname !== "/admin/admindashboard") {
      document.body.style.backgroundImage = "none";
      document.body.style.backgroundColor = "#fff"; // Optional: set a default background
    } else {
      document.body.style.backgroundImage = `url(${backgroundImage})`;
    }
    return () => {
      document.body.style.backgroundImage = "";
    };
  }, [currentLocation.pathname]);
  
  const PrivateRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/home" replace />;
  };

  return (
    <BlogProvider>
    
          <TeamProvider>
            <EventProvider>
              <SectionProvider>
              <ToastContainer />
              <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
              <Routes>
                {/* Redirect unknown routes */}
                <Route path="*" element={<Navigate to="/home" />} />

                {/* Public Routes */}
                <Route path='/admin' element={<Login />} />
                <Route path='/home' element={<Home />} />
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/joinus' element={<JoinUs />} />
                <Route path='/about' element={<About />} />
                <Route path='/learning' element={<Learning />} />
                <Route path='/team' element={<Team />} />
                <Route path='/events' element={<Events />} />
                <Route path="/sections/details/:id" element={<SectionDetailsPage />} />
       
                {/* Admin Routes - Protected */}
                <Route
                  path="/admin/admindashboard"
                  element={
                    <PrivateRoute>
                      <AdminLayout />
                     </PrivateRoute> 
                  }
                >
                  <Route index element={<AdminHome />} />
                  <Route path="sections" element={< SectionPage/>} />
                  <Route path="team" element={<Team />} />
                  <Route path="events" element={<Events/>} />
                  <Route path="sections/section-form" element={<SectionForm />} />
                  <Route path="sections/section-form/:sectionId" element={<SectionForm />} />
                  <Route path="/admin/admindashboard/sections/details/:id" element={<SectionDetailsPage />} />
                </Route>
              
              </Routes>
              </SectionProvider>
            </EventProvider>
          </TeamProvider>
       
    </BlogProvider>
  );
}

export default App;
