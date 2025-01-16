

import React, { useState ,useEffect} from 'react';
import { FaTimes } from "react-icons/fa";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function BlogForm({ onClose, onSubmit, blog }) {
    const [title, setTitle] = useState(blog?.title || '');
    const [content, setContent] = useState(blog?.content || '');
    const [image, setImage] = useState(blog?.image || '');
    const [errors, setErrors] = useState({});
    console.log(errors);

    useEffect(() => {
      
        if (blog?.image) {
            setImage(blog.image);
        }
    }, [blog]);
    const handleContainerClick = (e) => {
        e.stopPropagation(); 
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
       
        console.log(errors);
       
        let validationErrors = {};
        if (!title.trim()) validationErrors.title = "Title is required";
        console.log("Title:", title);
        if (!content.trim()) validationErrors.content = "Content is required";
        console.log("Content validation failed");
        if (!image) validationErrors.image = "Image is required";
        console.log("Validation Errors:", validationErrors);

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
     
     const modules = {
    toolbar: [
      [{ header: [1, 2,3,4,5,6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["image"],
 
      ["clean"],
    ],
  
  };


 
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    
    "image"
  ];

   
     
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
                        placeholder='Enter Title.....'
                        onChange={(e) => setTitle(e.target.value)} 
                        
                    />
                    {errors.title && <span className="text-danger">{errors.title}</span>}
                </label>

                <label>
                    Content:
                    <div onClick={handleContainerClick}>
                    
                      <ReactQuill 
                        value={content} 
                        onChange={setContent} 
                        theme="snow" 
                        className='react-quill bg-white '
                        style={{ marginBottom:"10px" }}
                        modules={modules}
                        formats={formats}
                       
                      
                        
                    />
                    </div>
                    {errors.content && <span className="text-danger">{errors.content}</span>}
                </label>

                <label>
                    Image:
                    {blog?.image && (
                        <div>

                            <img src={blog.image} alt="Current Blog" style={{ maxWidth: '100px', maxHeight: '100px', objectFit: 'cover' }} />
                        </div>
                    )}
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





// import React, { useState, useEffect } from 'react';
// import { FaTimes } from "react-icons/fa";
// import { Editor, EditorState, ContentState, convertToRaw } from 'draft-js';
// import 'draft-js/dist/Draft.css';

// function BlogForm({ onClose, onSubmit, blog }) {
//     const [title, setTitle] = useState(blog?.title || '');
//     const [editorState, setEditorState] = useState(() =>
//         blog?.content
//             ? EditorState.createWithContent(ContentState.createFromText(blog.content))
//             : EditorState.createEmpty()
//     );
//     const [image, setImage] = useState(blog?.image || '');
//     const [errors, setErrors] = useState({});

//     useEffect(() => {
//         if (blog?.image) {
//             setImage(blog.image);
//         }
//     }, [blog]);

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         // Extract plain text from the editor
//         const content = editorState.getCurrentContent().getPlainText();

//         // Validation
//         let validationErrors = {};
//         if (!title.trim()) validationErrors.title = "Title is required";
//         if (!content.trim()) validationErrors.content = "Content is required";
//         if (!image) validationErrors.image = "Image is required";

//         if (Object.keys(validationErrors).length > 0) {
//             setErrors(validationErrors);
//             return;
//         }

//         const formData = new FormData();
//         formData.append('title', title);
//         formData.append('content', content);
//         if (image) formData.append('image', image);

//         await onSubmit(formData);

//         setTitle("");
//         setEditorState(EditorState.createEmpty());
//         setImage(null);
//     };

//     return (
//         <div className="blog-form">
//             <form onSubmit={handleSubmit}>
//                 <div className="d-flex justify-content-between">
//                     <h4 style={{ color: "green" }}>{blog ? "Update Blog" : "Create a Blog"}</h4>
//                     <FaTimes onClick={onClose} />
//                 </div>

//                 <label>
//                     Title:
//                     <input
//                         type="text"
//                         value={title}
//                         onChange={(e) => setTitle(e.target.value)}
//                     />
//                     {errors.title && <span className="text-danger">{errors.title}</span>}
//                 </label>

//                 <label>
//                     Content:
//                     <div style={{ border: '1px solid #ccc', padding: '10px', minHeight: '150px' }}>
//                         <Editor
//                             editorState={editorState}
//                             onChange={setEditorState}
//                         />
//                     </div>
//                     {errors.content && <span className="text-danger">{errors.content}</span>}
//                 </label>

//                 <label>
//                     Image:
//                     {blog?.image && (
//                         <div>
//                             <img
//                                 src={blog.image}
//                                 alt="Current Blog"
//                                 style={{ maxWidth: '100px', maxHeight: '100px', objectFit: 'cover' }}
//                             />
//                         </div>
//                     )}
//                     <input
//                         type="file"
//                         onChange={(e) => setImage(e.target.files[0])}
//                     />
//                     {errors.image && <span className="text-danger">{errors.image}</span>}
//                 </label>

//                 <button type="submit">Submit</button>
//             </form>
//         </div>
//     );
// }

// export default BlogForm;


// import React, { useState, useEffect } from 'react';
// import { FaTimes } from "react-icons/fa";
// import { EditorState, ContentState } from 'draft-js';
// import { Editor } from 'react-draft-wysiwyg';

// import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

// function BlogForm({ onClose, onSubmit, blog }) {
//     const [title, setTitle] = useState(blog?.title || '');
//     const [editorState, setEditorState] = useState(() =>
//         blog?.content
//             ? EditorState.createWithContent(ContentState.createFromText(blog.content))
//             : EditorState.createEmpty()
//     );
//     const [image, setImage] = useState(blog?.image || '');
//     const [errors, setErrors] = useState({});

//     useEffect(() => {
//         if (blog?.image) {
//             setImage(blog.image);
//         }
//     }, [blog]);

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         // Extract plain text from the editor
//         const content = editorState.getCurrentContent().getPlainText();

//         // Validation
//         let validationErrors = {};
//         if (!title.trim()) validationErrors.title = "Title is required";
//         if (!content.trim()) validationErrors.content = "Content is required";
//         if (!image) validationErrors.image = "Image is required";

//         if (Object.keys(validationErrors).length > 0) {
//             setErrors(validationErrors);
//             return;
//         }

//         const formData = new FormData();
//         formData.append('title', title);
//         formData.append('content', content);
//         if (image) formData.append('image', image);

//         await onSubmit(formData);

//         setTitle("");
//         setEditorState(EditorState.createEmpty());
//         setImage(null);
//     };

//     return (
//         <div className="blog-form">
//             <form onSubmit={handleSubmit}>
//                 <div className="d-flex justify-content-between">
//                     <h4 style={{ color: "green" }}>{blog ? "Update Blog" : "Create a Blog"}</h4>
//                     <FaTimes onClick={onClose} />
//                 </div>

//                 <label>
//                     Title:
//                     <input
//                         type="text"
//                         value={title}
//                         onChange={(e) => setTitle(e.target.value)}
//                     />
//                     {errors.title && <span className="text-danger">{errors.title}</span>}
//                 </label>

//                 <label>
//                     Content:
//                     <div style={{ border: '1px solid #ccc', padding: '10px', minHeight: '150px' }}>
//                         <Editor
//                             editorState={editorState}
//                             onEditorStateChange={setEditorState}
//                             // toolbar={{
//                             //     options: ["inline", "blockType", "fontSize", "list", "textAlign", "history"],
//                             //     inline: { options: ["bold", "italic", "underline"] },
                               
//                             // }}
//                             toolbar={{
//                                 options: [
//                                   'inline',
//                                   'blockType',
//                                   'fontSize',
//                                   'fontFamily',
//                                   'list',
//                                   'textAlign',
//                                   'colorPicker',
//                                   'link',
//                                   'embedded',
//                                   'emoji',
//                                   'image',
//                                   'remove',
//                                   'history'
//                                 ],
//                                 inline: {
//                                   options: ['bold', 'italic', 'underline', 'strikethrough', 'monospace', 'superscript', 'subscript'],
//                                 },
//                                 list: {
//                                   options: ['unordered', 'ordered', 'indent', 'outdent'],
//                                 },
//                                 textAlign: {
//                                   options: ['left', 'center', 'right', 'justify'],
//                                 },
//                                 link: {
//                                   options: ['link', 'unlink'],
//                                 },
//                                 history: {
//                                   options: ['undo', 'redo'],
//                                 },
//                               }}
//                               hashtag={{
//                                 separator: ' ',
//                                 trigger: '#',
//                               }}
//                               mention={{
//                                 separator: ' ',
//                                 trigger: '@',
//                                 suggestions: [
//                                   { text: 'JavaScript', value: 'javascript', url: 'js' },
//                                   { text: 'Golang', value: 'golang', url: 'go' },
//                                 ],
//                               }}
//                         />
//                     </div>
//                     {errors.content && <span className="text-danger">{errors.content}</span>}
//                 </label>

//                 <label>
//                     Image:
//                     {blog?.image && (
//                         <div>
//                             <img
//                                 src={blog.image}
//                                 alt="Current Blog"
//                                 style={{ maxWidth: '100px', maxHeight: '100px', objectFit: 'cover' }}
//                             />
//                         </div>
//                     )}
//                     <input
//                         type="file"
//                         onChange={(e) => setImage(e.target.files[0])}
//                     />
//                     {errors.image && <span className="text-danger">{errors.image}</span>}
//                 </label>

//                 <button type="submit">Submit</button>
//             </form>
//         </div>
//     );
// }

// export default BlogForm;
