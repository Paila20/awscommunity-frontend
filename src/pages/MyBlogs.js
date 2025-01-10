

import React,{useEffect} from 'react';
import { ToastContainer } from 'react-toastify';
import BlogForm from './BlogForm';
import { BlogCard } from './BlogCard';
import Navbar from './Navbar';
import { useBlog } from '../context/BlogContext';

function MyBlogs() {
    const { myblogs, showBlogForm, setShowBlogForm, editingBlog, setEditingBlog, fetchMyBlogs,updateMyBlog, createMyBlog, deleteMyBlog ,loading,setLoading} = useBlog();
    const user = localStorage.getItem('loggedInUser');
 
    const role = localStorage.getItem('role');

    useEffect(() => {
        fetchMyBlogs();
        setLoading()
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [myblogs]);

    return (
        <>
            <Navbar />
            <div className="container mt-5 pt-5">
                <div className='d-flex justify-content-around '>
            <h1 className='' style={{color:"green"}}>My Blogs</h1>
            {role === "Editor"?( <button className="btn btn-success" onClick={() => setShowBlogForm(true)}>Create Blog</button>):("")}
            </div>
            {
            loading ? (
                <div className="text-center mt-5 pt-5">
                    <div className="spinner-border " role="status" style={{color:"purple"}}>
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) :myblogs.length === 0 ? (
                   <p className='text-center mt-5 pt-5'>No blogs Created Yet</p>
             ) : (
                <div className="row justify-content-center">
                    {myblogs.map((blog) => (
                        <div key={blog._id} className=" col-12 mb-4 d-flex justify-content-center">
                            <BlogCard
                                blog={blog}
                                onEdit={() => {
                                    setEditingBlog(blog);
                                    setShowBlogForm(true);
                                }}
                                onDelete={() => deleteMyBlog(blog._id)}
                                user={user}
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
                    onSubmit={(formData) => {
                        if (editingBlog) {
                            updateMyBlog(editingBlog._id, formData); 
                        } else {
                            createMyBlog(formData); 
                        }
                    }}
                    blog={editingBlog}
                />
            )}
            <ToastContainer />
        </>
    );
}

export default MyBlogs;
