import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import EditorBlogs from './pages/EditorBlogs';
import PublicBlogs from './pages/PublicBlogs';
import EditorPendingBlogs from './pages/EditorPendingBlogs';
import MyBlogs from "./pages/MyBlogs";
import MyPendingBlogs from "./pages/MyPendingBlogs";
import MyRejectedBlogs from "./pages/MyRejectedBlogs";
import AdminBlogs from "./pages/AdminBlogs";
import UserManagement from './pages/UserManagement';
import { useState } from 'react';
import RefrshHandler from './RefrshHandler';
import { BlogProvider } from './context/BlogContext';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />
  }

  return (
    
       <BlogProvider>
      <RefrshHandler setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        {/* <Route path='/home' element={</>} /> */}
        <Route path='/' element={<Navigate to="/home" />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/editorblogs' element={<PrivateRoute element={<EditorBlogs/>} />} />
        <Route path='/editorblogs' element={<PrivateRoute element={<EditorBlogs/>} />} />
        <Route path='/editorpendingblogs' element={<PrivateRoute element={<EditorPendingBlogs/>} />} />
        <Route path='/adminblogs' element={<PrivateRoute element={<AdminBlogs />} />} />
        <Route path='/myblogs' element={<PrivateRoute element={<MyBlogs />} />} />
        <Route path='/mypendingblogs' element={<PrivateRoute element={<MyPendingBlogs />} />} />
        <Route path='/myrejectedblogs' element={<PrivateRoute element={<MyRejectedBlogs />} />} />
        <Route path='/home'  element={<PublicBlogs />} />
        <Route path='/users'  element={<UserManagement />} />

      </Routes>
      </BlogProvider>
    
  );
}

export default App;
