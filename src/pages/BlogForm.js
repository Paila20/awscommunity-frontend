

import React, { useState } from 'react';
import { FaTimes } from "react-icons/fa";

function BlogForm({ onClose, onSubmit, blog }) {
    const [title, setTitle] = useState(blog?.title || '');
    const [content, setContent] = useState(blog?.content || '');
    const [image, setImage] = useState(null);
    const [errors, setErrors] = useState({});
    console.log(errors);

   

    const handleSubmit = async (e) => {
        e.preventDefault();
        
       
        console.log(errors);
        // Validation
        let validationErrors = {};
        if (!title.trim()) validationErrors.title = "Title is required";
        console.log("Title:", title);
        if (!content.trim()) validationErrors.content = "Content is required";
        console.log("Content validation failed");
        if (!image) validationErrors.image = "Image is required";
        console.log("Validation Errors:", validationErrors);
        // If there are validation errors, don't submit the form
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        if (image) formData.append('image', image);

        await onSubmit(formData);
        setTitle("");
        setContent("");
        setImage(null);
    };

    return (
        <div className="blog-form">
            <form onSubmit={handleSubmit}>
                <div className='d-flex justify-content-between'>
                    <h4 style={{color:"green"}}>{blog ? "Update Blog" : "Create a Blog"}</h4>
                    <FaTimes onClick={onClose} />
                </div>
                
                <label>
                    Title:
                    <input 
                        type="text" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        
                    />
                    {errors.title && <span className="text-danger">{errors.title}</span>}
                </label>

                <label>
                    Content:
                    <textarea 
                        value={content} 
                        onChange={(e) => setContent(e.target.value)} 
                         
                    />
                    {errors.content && <span className="text-danger">{errors.content}</span>}
                </label>

                <label>
                    Image:
                    <input 
                        type="file" 
                        onChange={(e) => setImage(e.target.files[0])} 
                    />
                    {errors.image && <span className="text-danger">{errors.image}</span>}
                </label>

                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default BlogForm;
