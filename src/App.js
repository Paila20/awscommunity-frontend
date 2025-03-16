

import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';

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

import SectionPage from './pages/SectionPage';
import { SectionProvider } from './context/SectionContext';
import SectionForm from './components/SectionForm';
import TeamForm from './pages/TeamForm';
import EventsForm from './pages/EventForm';
import { useHome } from './context/HomeContext';
import HomeEdit from './pages/HomeEdit';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const currentLocation = useLocation();
  const { homeData } = useHome()

  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem('token'));
  }, []);
 
 

  // useEffect(() => {
   
    
  // if (homeData && homeData?.banner) {
    
  //    if (currentLocation.pathname.startsWith('/admin')) {
  //     document.body.style.backgroundImage = "none";
  //     document.body.style.backgroundColor = "#fff";
  //   } else {
  //     document.body.style.backgroundImage = `url(${homeData?.banner})`;
  //   }
  // }
  //   return () => {
  //     document.body.style.backgroundImage = "";
  //   };
  // }, [currentLocation.pathname]);

  useEffect(() => {
    // Ensure background resets on admin routes
    if (currentLocation.pathname.startsWith('/admin')) {
      document.body.style.backgroundImage = "none";
      document.body.style.backgroundColor = "#fff";
    } else if (homeData?.banner) {
      document.body.style.backgroundImage = `url(${homeData?.banner})`;
    }
  
    // Cleanup ensures no background persists on page change
    return () => {
      if (!currentLocation.pathname.startsWith('/admin')) {
        document.body.style.backgroundImage = "";
      }
    };
  }, [currentLocation.pathname, homeData]);
  
  
  
  const PrivateRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/home" />;
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
                  <Route path="/admin/admindashboard/home/edit" element={<HomeEdit />} />

                  <Route path="sections" element={< SectionPage/>} />
                  <Route path="team" element={<Team />} />
                  <Route path="events" element={<Events/>} />
                  <Route path="sections/section-form" element={<SectionForm />} />
                  <Route path="sections/section-form/:sectionId" element={<SectionForm />} />
                  <Route path="/admin/admindashboard/sections/details/:id" element={<SectionDetailsPage />} />
                  <Route path="/admin/admindashboard/team/new" element={<TeamForm />} />
                  <Route path="/admin/admindashboard/team/edit/:id" element={<TeamForm />} />
                  <Route path="/admin/admindashboard/event/new" element={<EventsForm />} />
                  <Route path="/admin/admindashboard/event/edit/:id" element={<EventsForm />} />
                </Route>
              
              </Routes>
              </SectionProvider>
            </EventProvider>
          </TeamProvider>
          
       
    </BlogProvider>
    
  );
}

export default App;
