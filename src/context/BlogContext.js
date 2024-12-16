import React, { createContext, useContext, useState } from 'react';
import { handleSuccess, handleError } from '../utils';

const BlogContext = createContext();

export const useBlog = () => {
    return useContext(BlogContext);
};

export const BlogProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [showBlogForm, setShowBlogForm] = useState(false);
    const [editingBlog, setEditingBlog] = useState(null);
    const [blogs, setBlogs] = useState([]);

    const fetchBlogs = async () => {
        setLoading(true)
        try {
            const response = await fetch(`https://backend-blogs-s8uc.onrender.com/api/blogs`, {
                headers: { Authorization: localStorage.getItem('token') },
            });
            const result = await response.json();

            if (!Array.isArray(result)) {
                throw new Error('Invalid response format: Expected an array of blogs');
            }

            setBlogs(result);
        } catch (err) {
            handleError(err.message);
        }
        finally {
            setLoading(false);
        }
    };
    const fetchAllBlogs = async () => {
        setLoading(true)
        try {
            const response = await fetch('https://backend-blogs-s8uc.onrender.com/api/blogs/all', {
                headers: {
                    Authorization: localStorage.getItem('token'), // Ensure user is authenticated
                },
            });

            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error('Unauthorized');
                }
                throw new Error('Failed to fetch blogs');
            }

            const result = await response.json();
            if (!Array.isArray(result)) {
                throw new Error('Invalid response format: Expected an array of blogs');
            }

            setBlogs(result); // Set blogs to the state
        } catch (err) {
            handleError(err.message);
           
        }finally {
            setLoading(false);
        }

    };


    const addOrUpdateBlog = async (formData) => {
        try {
            const url = editingBlog
                ? `https://backend-blogs-s8uc.onrender.com/api/blogs/${editingBlog._id}`
                : `https://backend-blogs-s8uc.onrender.com/api/blogs/create`;
            const method = editingBlog ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    Authorization: localStorage.getItem('token'),
                },
                body: formData,
            });

            const result = await response.json();
            if (editingBlog) {
                setBlogs((prevBlogs) =>
                    prevBlogs.map((blog) =>
                        blog._id === editingBlog._id ? { ...blog, ...result } : blog
                    )
                );
                handleSuccess('Blog updated successfully!');
            } else {
                setBlogs((prevBlogs) => [result, ...prevBlogs]);
                handleSuccess('Blog created successfully!');
            }

            handleSuccess(editingBlog ? 'Blog updated successfully!' : 'Blog created successfully!');
            fetchBlogs(); // Refresh the blog list
            setShowBlogForm(false);
            setEditingBlog(null);
        } catch (err) {
            handleError(err.message);
        }
    };
     
    const addOrUpdateBlogs = async (formData) => {
        try {
            const url = editingBlog
                ? `https://backend-blogs-s8uc.onrender.com/api/blogs/${editingBlog._id}`
                : `https://backend-blogs-s8uc.onrender.com/api/blogs/create`;
            const method = editingBlog ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    Authorization: localStorage.getItem('token'),
                },
                body: formData,
            });

            const result = await response.json();
            if (editingBlog) {
                setBlogs((prevBlogs) =>
                    prevBlogs.map((blog) =>
                        blog._id === editingBlog._id ? { ...blog, ...result } : blog
                    )
                );
                handleSuccess('Blog updated successfully!');
            } else {
                setBlogs((prevBlogs) => [result, ...prevBlogs]);
                handleSuccess('Blog created successfully!');
            }

            handleSuccess(editingBlog ? 'Blog updated successfully!' : 'Blog created successfully!');
            fetchAllBlogs(); // Refresh the blog list
            setShowBlogForm(false);
            setEditingBlog(null);
        } catch (err) {
            handleError(err.message);
        }
    };
     

    const deleteBlog = async (id) => {
        try {
            const response = await fetch(`https://backend-blogs-s8uc.onrender.com/api/blogs/${id}`, {
                method: 'DELETE',
                headers: { Authorization: localStorage.getItem('token') },
            });

            if (response.ok) {
                handleSuccess('Blog deleted successfully!');
                fetchBlogs();
            } else {
                throw new Error('Failed to delete blog');
            }
        } catch (err) {
            handleError(err.message);
        }
    };

    return (
        <BlogContext.Provider
            value={{
                blogs,
                showBlogForm,
                setShowBlogForm,
                editingBlog,
                setEditingBlog,
                fetchBlogs,
                addOrUpdateBlog,
                addOrUpdateBlogs,
                deleteBlog,
                fetchAllBlogs,
                loading,
                setLoading
            }}
        >
            {children}
        </BlogContext.Provider>
    );
};
