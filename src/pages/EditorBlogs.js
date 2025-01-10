

import React,{useEffect} from 'react';
import { ToastContainer } from 'react-toastify';
import { BlogCard } from './BlogCard';
import Navbar from './Navbar';
import { useBlog } from '../context/BlogContext';

function EditorBlogs() {
    const { editorblogs,  fetchEditorBlogs,loading,setLoading} = useBlog();
    const user = localStorage.getItem('loggedInUser');
 
    useEffect(() => {
        fetchEditorBlogs();
        setLoading(false);
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editorblogs]);

    return (
        <>
            <Navbar />
            <div className="container mt-5 pt-5">
            <h1 className='text-center' style={{color:"purple"}}>Editor Blogs</h1>
      

            {
            loading ? (
                <div className="text-center mt-5 pt-5">
                    <div className="spinner-border " role="status" style={{color:"purple"}}>
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) :editorblogs.length === 0 ? (
                   <p className='text-center mt-5 pt-5'>No blogs Created Yet</p>
             ) : (
                <div className="row justify-content-center">
                    {editorblogs.map((blog) => (
                        <div key={blog._id} className=" col-12 mb-4 d-flex justify-content-center">
                            <BlogCard
                                blog={blog}
                               
                                user={user}
                            />
                        </div>
                    ))}
                </div>
             )}
            </div>

           
            <ToastContainer />
        </>
    );
}

export default EditorBlogs;
