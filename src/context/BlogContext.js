


import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { handleSuccess, handleError } from '../utils';


const BlogContext = createContext();

export const useBlog = () => {
    return useContext(BlogContext);
};

export const BlogProvider = ({ children }) => {
    const [adminusers, setAdminUsers] = useState([])
    const [loading, setLoading] = useState(false);
    const [publicblogs,setPublicBlogs] = useState([]);
    const [adminblogs, setAdminBlogs] = useState([]);
    const [editorblogs, setEditorBlogs] = useState([]);
    const [editorpendingblogs, setEditorPendingBlogs] = useState([]);
    const [editingBlog, setEditingBlog] = useState(null);
    const [showBlogForm, setShowBlogForm] = useState(false);
    const [myblogs, setMyBlogs] = useState([]);
    const [mypendingblogs, setMyPendingBlogs] = useState([]);
    const [myrejectedblogs, setMyRejectedBlogs] = useState([]);

    const API_BASE_URL = 'http://localhost:5000'; 
    const token = localStorage.getItem('token');

    const fetchAdminUsers = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${API_BASE_URL}/admin/users`, {
                headers: {
                    Authorization: `Bearer ${token}`, 
                },
            });
            setAdminUsers(response.data);
        } catch (error) {
            handleError('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };
    const createAdminUser = async (userData) => {
        setLoading(true);
        try {
            const response = await axios.post(`${API_BASE_URL}/admin/users`, userData, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`, 
                },
            });
            setAdminUsers((prevUsers) => [...prevUsers, response.data.user]);
            handleSuccess('User created successfully!');
        } catch (error) {
            handleError('Error creating user:', error);
        } finally {
            setLoading(false);
        }
    };
    const deleteAdminUser = async (id) => {
        setLoading(true);
        try {
            await axios.delete(`${API_BASE_URL}/admin/users/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`, 
                },
            });
            setAdminUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
            handleSuccess('User deleted successfully!');
        } catch (error) {
            handleError('Error deleting user:', error);
        } finally {
            setLoading(false);
        }
    };
    
  
   
    const fetchPublicBlogs = async () => {
        setLoading(true);
        try {
          
            const response = await axios.get(`${API_BASE_URL}/public/blogs/published`);
        console.log(response)
            setPublicBlogs(response.data);
           
        } catch (error) {
            handleError('Error fetching blogs:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchAdminBlogs = async () => {
        setLoading(true);
        try {
          console.log(token)
            const response = await axios.get(`${API_BASE_URL}/admin/blogs/draft`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`, 
                    },
        });
        console.log(response)
            setAdminBlogs(response.data);
           
        } catch (error) {
            handleError('Error fetching blogs:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchMyBlogs = async () => {
        setLoading(true);
        try {
          console.log(token)
            const response = await axios.get(`${API_BASE_URL}/editor/blogs/draft`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`, 
                    },
        });
        console.log(response)
            setMyBlogs(response.data);

        } catch (error) {
            handleError('Error fetching blogs:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchMyPendingBlogs = async () => {
        setLoading(true);
        try {
          console.log(token)
            const response = await axios.get(`${API_BASE_URL}/editor/blogs/pending`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
        });
        console.log(response)
            setMyPendingBlogs(response.data);
            
        } catch (error) {
            handleError('Error fetching blogs:', error);
        } finally {
            setLoading(false);
        }
    };
    

    const fetchMyRejectedBlogs = async () => {
        setLoading(true);
        try {
          console.log(token)
            const response = await axios.get(`${API_BASE_URL}/editor/blogs/rejected`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`, 
                    },
        });
        console.log(response)
            setMyRejectedBlogs(response.data);
           
        } catch (error) {
            handleError('Error fetching blogs:', error);
        } finally {
            setLoading(false);
        }
    };

   
    const createAdminBlog = async (blogData) => {
        setLoading(true);
        try {
           

            const response = await axios.post(`${API_BASE_URL}/admin/blogs`, blogData, {
                headers: { 'Content-Type': 'multipart/form-data' ,
                    Authorization: `Bearer ${token}`, 
                },
            });
            console.log(response.data.blog)
            setAdminBlogs((prevBlogs) => [...prevBlogs, response.data.blog]);
            handleSuccess('Blog created successfully!');
            setShowBlogForm(false);
             setEditingBlog(null);
        } catch (error) {
            handleError('Error creating blog:', error);
        } finally {
            setLoading(false);
        }
    };


    const updateAdminBlog = async (id, blogData) => {
        setLoading(true);
        try {
          

            const response = await axios.put(`${API_BASE_URL}/admin/blogs/${id}`, blogData, {
                headers: { 'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`, 
                 },
            });
            setAdminBlogs((prevBlogs) =>
                prevBlogs.map((blog) => (blog._id === id ? response.data.blog : blog))
            );
            handleSuccess('Blog updated successfully!');
            setShowBlogForm(false);
             setEditingBlog(null);
        } catch (error) {
            handleError('Error updating blog:', error);
        } finally {
            setLoading(false);
        }
    };

   
    const deleteAdminBlog = async (id) => {
        setLoading(true);
        try {
            await axios.delete(`${API_BASE_URL}/admin/blogs/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`, 
                    },
         });
            setAdminBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id));
            handleSuccess('Blog deleted successfully!');
        } catch (error) {
            handleError('Error deleting blog:', error);
        } finally {
            setLoading(false);
        }
    };
     

     
      const fetchEditorBlogs = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${API_BASE_URL}/editor/blogs`,
                 {
                    headers: {
                        Authorization: `Bearer ${token}`, 
                    },

             } );
            setEditorBlogs(response.data);
           
        } catch (error) {
            handleError('Error fetching blogs:', error);
        } finally {
            setLoading(false);
        }
    };
    const fetchEditorPendingBlogs = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${API_BASE_URL}/editor/blogs/allpending`,
                 {
                    headers: {
                        Authorization: `Bearer ${token}`, 
                    },

             } );
            setEditorPendingBlogs(response.data);
         
        } catch (error) {
            handleError('Error fetching blogs:', error);
        } finally {
            setLoading(false);
        }
    };

    // Create Blog
    const createMyBlog = async (blogData) => {
        setLoading(true);
        try {
           

            const response = await axios.post(`${API_BASE_URL}/editor/blogs`, blogData, {
                headers: { 'Content-Type': 'multipart/form-data' ,
                    Authorization: `Bearer ${token}`, 
                },

            });
            setMyBlogs((prevBlogs) => [...prevBlogs, response.data.blog]);
            handleSuccess('Blog created successfully!');
            setShowBlogForm(false);
             setEditingBlog(null);
        } catch (error) {
            handleError('Error creating blog:', error);
        } finally {
            setLoading(false);
        }
    };

    // Update Blog
    const updateMyBlog = async (id, blogData) => {
        setLoading(true);
        try {

            const response = await axios.put(`${API_BASE_URL}/editor/blogs/${id}`, blogData, {
                headers: { 'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`, 
                 },
            });
            setMyBlogs((prevBlogs) =>
                prevBlogs.map((blog) => (blog._id === id ? response.data.blog : blog))
            );
            handleSuccess('Blog updated successfully!');
            setShowBlogForm(false);
             setEditingBlog(null);
        } catch (error) {
            handleError('Error updating blog:', error);
        } finally {
            setLoading(false);
        }
    };

    // Delete Blog
    const deleteMyBlog = async (id) => {
        setLoading(true);
        try {
            await axios.delete(`${API_BASE_URL}/editor/blogs/${id}`);
            setMyBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id));
            handleSuccess('Blog deleted successfully!');
        } catch (error) {
            handleError('Error deleting blog:', error);
        } finally {
            setLoading(false);
        }
    };
   
     const updateEditorBlogStatus = async (blogId, status) => {
        try {
          const response = await axios.patch(`${API_BASE_URL}/editor/blogs/${blogId}/status`, 
            { status },
            {
                headers: {
                    Authorization: `Bearer ${token}`, 
                    'Content-Type': 'application/json',
                },
            },
           );
          return response.data; // Return the API response
        } catch (error) {
          console.error('Error updating blog status:', error.response?.data || error.message);
          throw error;
        }
      };

      const updateAdminBlogStatus = async (blogId, status) => {
        try {
          const response = await axios.patch(`${API_BASE_URL}/admin/blogs/${blogId}/status`, 
            { status },
            {
                headers: {
                    Authorization: `Bearer ${token}`, // Include the token
                },
            },
           );
          return response.data; // Return the API response
        } catch (error) {
          console.error('Error updating blog status:', error.response?.data || error.message);
          throw error;
        }
      };


       
      const sendBlogForApproval = async (blogId) => {
        try {
          const response = await axios.patch(`${API_BASE_URL}/editor/blogs/${blogId}/send-for-approval`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`, // Include the token
                },
            },
          );
          return response.data; // Return the API response
        } catch (error) {
          console.error('Error sending blog for approval:', error.response?.data || error.message);
          throw error;
        }
      }; 
    return (
        <BlogContext.Provider
            value={{
                loading,
                adminblogs,
                editorblogs,
                fetchAdminBlogs,
                createAdminBlog,
                updateAdminBlog,
                deleteAdminBlog,
                setEditingBlog,
                editingBlog,
                showBlogForm,
                setShowBlogForm,
                fetchEditorBlogs,
                createMyBlog,
                updateMyBlog,
                deleteMyBlog,
                updateEditorBlogStatus,
                updateAdminBlogStatus,
                sendBlogForApproval,
                myblogs,
                fetchMyBlogs,
                editorpendingblogs,
                fetchEditorPendingBlogs,
                publicblogs,
                fetchPublicBlogs,
                setLoading,
                adminusers,
                fetchAdminUsers,
                createAdminUser,
                deleteAdminUser,
                mypendingblogs,
                fetchMyPendingBlogs,
                myrejectedblogs,
                fetchMyRejectedBlogs
            }} 
        >
            {children}
        </BlogContext.Provider>
    );
};
