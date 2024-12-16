
import React, { useEffect } from 'react';
import Navbar from './Navbar';
import { BlogCard } from './BlogCard';
import BlogForm from './BlogForm';
import { useBlog } from '../context/BlogContext';

function AllBlogs() {
    const { blogs, showBlogForm, setShowBlogForm, editingBlog, setEditingBlog, fetchAllBlogs, addOrUpdateBlogs, deleteBlog,loading } = useBlog();
    const loggedInUser = localStorage.getItem('loggedInUser');

    useEffect(() => {
        fetchAllBlogs();
    }, []);

    return (
        <>
            <Navbar setShowBlogForm={setShowBlogForm} />
            <div className="container mt-5 pt-5">
            <h1 className='text-center' style={{color:"purple"}}>All Blogs</h1>
            { loading ? (
                <div className="text-center mt-5 pt-5">
                    <div className="spinner-border " role="status" style={{color:"purple"}}>
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) :blogs.length === 0 ? (
                   <p className='text-center mt-5 pt-5'>No blogs found</p>
             ) : (
                <div className="row px-sm-5 px-0 justify-content-center">
                    {blogs.map((blog) => (
                        <div key={blog._id} className="col-lg-4 col-md-6 col-12 mb-4 d-flex justify-content-center">
                            <BlogCard
                                blog={blog}
                                onEdit={() => {
                                    setEditingBlog(blog);
                                    setShowBlogForm(true);
                                }}
                                onDelete={() => deleteBlog(blog._id)}
                                showActions={blog.userName === loggedInUser} // Only show actions for the logged-in user's blogs
                            />
                        </div>
                    ))}
                </div>
            )}
            </div>

            {showBlogForm && (
                <BlogForm
                    onClose={() => {
                        setShowBlogForm(false);
                        setEditingBlog(null);
                    }}
                    onSubmit={addOrUpdateBlogs}
                    blog={editingBlog}
                />
            )}
        </>
    );
}

export default AllBlogs;
