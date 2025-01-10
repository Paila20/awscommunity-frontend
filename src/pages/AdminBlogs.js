
import React,{useEffect} from 'react';
import Navbar from './Navbar';
import { BlogCard } from './BlogCard';
import BlogForm from './BlogForm';
import { useBlog } from '../context/BlogContext';

function AdminBlogs() {
    const { adminblogs, showBlogForm, setShowBlogForm, editingBlog, setEditingBlog, fetchAdminBlogs, updateAdminBlog, createAdminBlog, deleteAdminBlog,loading,setLoading } = useBlog();
   
    const role = localStorage.getItem('role');
    
    console.log(role)
    useEffect(() => {
        fetchAdminBlogs();
        setLoading(false);
         // eslint-disable-next-line react-hooks/exhaustive-deps
    },[adminblogs]);

    return (
        <>
            <Navbar setShowBlogForm={setShowBlogForm} />
            <div className="container mt-5 pt-5">
           <div className='d-flex justify-content-around '>
            <h1 className='text-center' style={{color:"green"}}>All Blogs</h1>
            <button className="btn btn-success" onClick={() => setShowBlogForm(true)}>Create Blog</button>
            </div>
            { loading ? (
                <div className="text-center mt-5 pt-5">
                    <div className="spinner-border " role="status" style={{color:"purple"}}>
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) :adminblogs.length === 0 ? (
                   <p className='text-center mt-5 pt-5'>No blogs found</p>
             ) : (
                <div className="row justify-content-center">
                    {adminblogs.map((blog) => (
                        <div key={blog._id} className=" col-12 mb-4 d-flex justify-content-center">
                            <BlogCard
                                blog={blog}
                                onEdit={() => {
                                    setEditingBlog(blog);
                                    setShowBlogForm(true);
                                }}
                                onDelete={() => deleteAdminBlog(blog._id)}
                               
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
                            updateAdminBlog(editingBlog._id, formData); 
                        } else {
                            createAdminBlog(formData); 
                        }
                    }}
                    blog={editingBlog}
                />
            )}
        </>
    );
}

export default AdminBlogs;
