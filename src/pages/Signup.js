import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';
import { FiMenu, FiX } from "react-icons/fi";

function Signup() {
    const [isToggled, setIsToggled] = useState(false);
    const [signupInfo, setSignupInfo] = useState({
        name: '',
        email: '',
        password: '',
        role: 'Editor',
    })
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();
      const toggleNavbar = () => {
            setIsToggled(!isToggled);
        };
         
    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        const copySignupInfo = { ...signupInfo };
        copySignupInfo[name] = value;
        setSignupInfo(copySignupInfo);
    }
    const validate = () => {
        const newErrors = {};

        if (!signupInfo.name.trim() || signupInfo.name.length <3) newErrors.name = "Name must have atleast 3 characters";
        if (!signupInfo.email.trim()  || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signupInfo.email)) {
            newErrors.email = "Valid email is required";
        }
        if (!signupInfo.password.trim() || ! /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(signupInfo.password) || signupInfo.password.length < 8 ) {
            newErrors.password = "Password must be at least 8 characters, include a number and a special character.";
        }
        if (!signupInfo.role) newErrors.role = "Role is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSignup = async (e) => {
        e.preventDefault();
      
        if (!validate()) {
            return;
        }
        try {
            const url = `https://backend-blogs-s8uc.onrender.com/auth/signup`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signupInfo)
            });
            const result = await response.json();
            const { success, message, error } = result;
            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate('/login')
                }, 1000)
            } else if (error) {
                const details = error?.details[0].message;
                handleError(details);
            } else if (!success) {
                handleError(message);
            }
            console.log(result);
        } catch (err) {
            handleError(err);
        }
    }
    return (
        <div className='container'>
             <nav className="navbar navbar-expand-lg  bg-purple px-lg-5 px-0 fixed-top pt-3 z-1 mb-5">
             <div className="container-fluid mx-sm-4 mx-2 text-white">
             <p className='fs-4 cursor-pointer hover:text-purple-500 transition-colors duration-300' onClick={() => navigate("/home")}>  Blog App</p>
                                       
                                       <button className=" d-lg-none mb-2"  type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded={isToggled} aria-label="Toggle navigation"   onClick={toggleNavbar}>
                                       {isToggled ? <FiX size={24} /> : <FiMenu size={24} />}
                                       </button>
                                       <div  className={`collapse navbar-collapse ${isToggled ? "show" : ""}`}  id="navbarNav">
                                           <ul className="navbar-nav ms-lg-auto flex-column flex-lg-row align-items-center">
                                           <li className="nav-item cursor-pointer me-3" >
                                                <span className="nav-link text-white " onClick={() => navigate("/home")}>Home</span>
                                           </li>
                                           </ul>
                                       </div>
                                   </div>
                               </nav>                                                         
        <div className='auth-container px-5 mt-5 py-3   ' style={{marginTop:"900px"}}>
            
            <h1>Signup</h1>
            <form onSubmit={handleSignup}>
                <div>
                    <label htmlFor='name'>Name</label>
                    <input
                        onChange={handleChange}
                        type='text'
                        name='name'
                        autoFocus
                        placeholder='Enter your name...'
                        value={signupInfo.name}
                    />
                    {errors.name && <p className="text-danger p-0">{errors.name}</p>} 
                </div>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input
                        onChange={handleChange}
                        type='email'
                        name='email'
                        placeholder='Enter your email...'
                        value={signupInfo.email}
                    />
                  {errors.email && <p className="text-danger">{errors.email}</p>}
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input
                        onChange={handleChange}
                        type='password'
                        name='password'
                        placeholder='Enter your password...'
                        value={signupInfo.password}
                    />
                     {errors.password && <p className="text-danger">{errors.password}</p>}
                </div>
                <div>
                        
                      <label htmlFor='role'>Role</label>
                        <select
                            name='role'
                            value={signupInfo.role}
                            onChange={handleChange}
                        >
                            <option value="Editor">Editor</option>
                            <option value="Admin">Admin</option>
                           
                        </select>
                    </div>

                <button type='submit' className='mt-3'>Signup</button>
                <span className='text-center'>Already have an account ?
                    <Link to="/login" style={{color:"green"}}>Login</Link>
                </span>
            </form>
            <ToastContainer />
        </div>
        </div>
    )
}

export default Signup


// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { ToastContainer } from 'react-toastify';
// import { handleError, handleSuccess } from '../utils';
// import { FiMenu, FiX } from "react-icons/fi";
// import 'bootstrap/dist/css/bootstrap.min.css';

// function Signup() {
//     const [isToggled, setIsToggled] = useState(false);
//     const [showModal, setShowModal] = useState(false);
//     const [signupInfo, setSignupInfo] = useState({
//         name: '',
//         email: '',
//         password: '',
//         role: 'Editor',
//     });
//     const [errors, setErrors] = useState({});

//     const navigate = useNavigate();

//     const toggleNavbar = () => {
//         setIsToggled(!isToggled);
//     };

    

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         const copySignupInfo = { ...signupInfo };
//         copySignupInfo[name] = value;
//         setSignupInfo(copySignupInfo);
//     };

//     const validate = () => {
//         const newErrors = {};

//         if (!signupInfo.name.trim() || signupInfo.name.length < 3) newErrors.name = "Name must have at least 3 characters";
//         if (!signupInfo.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signupInfo.email)) {
//             newErrors.email = "Valid email is required";
//         }
//         if (!signupInfo.password.trim() || !/^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(signupInfo.password)) {
//             newErrors.password = "Password must be at least 8 characters, include a number and a special character.";
//         }
//         if (!signupInfo.role) newErrors.role = "Role is required";

//         setErrors(newErrors);
//         return Object.keys(newErrors).length === 0;
//     };

//     const handleSignup = async (e) => {
//         e.preventDefault();
//         if (!validate()) {
//             return;
//         }
//         try {
//             const url = `http://localhost:5000/auth/signup`;
//             const response = await fetch(url, {
//                 method: "POST",
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(signupInfo),
//             });
//             const result = await response.json();
//             const { success, message, error } = result;
//             if (success) {
//                 handleSuccess(message);
//                 setTimeout(() => {
//                     navigate('/login');
//                 }, 1000);
//             } else if (error) {
//                 const details = error?.details[0].message;
//                 handleError(details);
//             } else if (!success) {
//                 handleError(message);
//             }
//         } catch (err) {
//             handleError(err);
//         }
//     };

//     return (
//         <div className='container'>
//             <nav className="navbar navbar-expand-lg bg-purple px-lg-5 px-0 fixed-top pt-3 z-1">
//                 <div className="container-fluid mx-sm-4 mx-2 text-white">
//                     <p className='fs-4 cursor-pointer hover:text-purple-500 transition-colors duration-300' onClick={() => navigate("/home")}>Blog App</p>
//                     <button className="d-lg-none mb-2" type="button" onClick={toggleNavbar}>
//                         {isToggled ? <FiX size={24} /> : <FiMenu size={24} />}
//                     </button>
//                     <div className={`collapse navbar-collapse ${isToggled ? "show" : ""}`} id="navbarNav">
//                         <ul className="navbar-nav ms-lg-auto flex-column flex-lg-row align-items-center">
//                             <li className="nav-item cursor-pointer me-3">
//                                 <span className="nav-link text-white" onClick={() => navigate("/home")}>Home</span>
//                             </li>
//                             <li className="nav-item cursor-pointer">
//                                 <button className="btn btn-primary" onClick={() => setShowModal(true)}>Signup</button>
//                             </li>
//                         </ul>
//                     </div>
//                 </div>
//             </nav>

        
//                 <div className="modal fade show d-block" tabIndex="-1">
//                     <div className="modal-dialog">
//                         <div className="modal-content">
//                             <div className="modal-header">
//                                 <h5 className="modal-title">Signup</h5>
//                                 <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
//                             </div>
//                             <div className="modal-body">
//                                 <form onSubmit={handleSignup}>
//                                     <div className="mb-3">
//                                         <label htmlFor='name'>Name</label>
//                                         <input
//                                             onChange={handleChange}
//                                             type='text'
//                                             name='name'
//                                             className="form-control"
//                                             placeholder='Enter your name...'
//                                             value={signupInfo.name}
//                                         />
//                                         {errors.name && <p className="text-danger">{errors.name}</p>}
//                                     </div>
//                                     <div className="mb-3">
//                                         <label htmlFor='email'>Email</label>
//                                         <input
//                                             onChange={handleChange}
//                                             type='email'
//                                             name='email'
//                                             className="form-control"
//                                             placeholder='Enter your email...'
//                                             value={signupInfo.email}
//                                         />
//                                         {errors.email && <p className="text-danger">{errors.email}</p>}
//                                     </div>
//                                     <div className="mb-3">
//                                         <label htmlFor='password'>Password</label>
//                                         <input
//                                             onChange={handleChange}
//                                             type='password'
//                                             name='password'
//                                             className="form-control"
//                                             placeholder='Enter your password...'
//                                             value={signupInfo.password}
//                                         />
//                                         {errors.password && <p className="text-danger">{errors.password}</p>}
//                                     </div>
//                                     <div className="mb-3">
//                                         <label htmlFor='role'>Role</label>
//                                         <select
//                                             name='role'
//                                             value={signupInfo.role}
//                                             onChange={handleChange}
//                                             className="form-select"
//                                         >
//                                             <option value="Editor">Editor</option>
//                                             <option value="Admin">Admin</option>
//                                         </select>
//                                     </div>
//                                     <button type='submit' className='btn btn-success'>Signup</button>
//                                     <span className='d-block mt-3'>Already have an account? <Link to="/login" style={{ color: "green" }}>Login</Link></span>
//                                 </form>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
            
//             <ToastContainer />
//         </div>
//     );
// }

// export default Signup;
