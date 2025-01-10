import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';
import { FiMenu, FiX } from "react-icons/fi";
 
function Login() {
    const [isToggled, setIsToggled] = useState(false);
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    })
   const [errors, setErrors] = useState({});
   
    const navigate = useNavigate();
    const toggleNavbar = () => {
        setIsToggled(!isToggled);
    };
      
    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        const copyLoginInfo = { ...loginInfo };
        copyLoginInfo[name] = value;
        setLoginInfo(copyLoginInfo);
    }
    const validate = () => {
        const newErrors = {};


        if (!loginInfo.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginInfo.email)) {
            newErrors.email = "Valid email is required";
        }
        if (!loginInfo.password.trim() || ! /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(loginInfo.password) || loginInfo.password.length < 8 ) {
            newErrors.password = "Password must be at least 8 characters, include a number and a special character.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleLogin = async (e) => {
        e.preventDefault();
        if (!validate()) {
            return;
        }
        // const { email, password } = loginInfo;
        // if (!email || !password) {
        //     return handleError('email and password are required')
        // }
        try {
            const url = `https://backend-blogs-s8uc.onrender.com/auth/login`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginInfo)
            });
            const result = await response.json();
            console.log(response)
            const { success, message, jwtToken, name, error,role } = result;
            if (success) {
                handleSuccess(message);
                localStorage.setItem('token', jwtToken);
                localStorage.setItem('loggedInUser', name);
                localStorage.setItem('role', role);
                console.log(role)
                setTimeout(() => {
                    // navigate('/adminblogs')
                    const role = localStorage.getItem('role')
                    if (role === 'Admin') {
                        navigate('/home');
                      } else if (role === 'Editor') {
                        navigate('/home');
                      }
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
            <nav className="navbar navbar-expand-lg  bg-purple px-lg-5 px-0 fixed-top pt-3">
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
                                 
                                     
                                   
                                     
                                   
                                    
                                    
                                     <li className="nav-item cursor-pointer ">
                                         <button className="btn btn-danger" >Signup</button>
                                     </li>
                                 </ul>
                             </div>
                         </div>
                     </nav>
                     <div>
        <div className='auth-container mt-5  px-5 py-3' style={{marginTop:"800px"}}>

            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input
                        onChange={handleChange}
                        type='email'
                        name='email'
                        placeholder='Enter your email...'
                        value={loginInfo.email}
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
                        value={loginInfo.password}
                    />
                 {errors.password && <p className="text-danger">{errors.password}</p>}
                </div>
                <button type='submit' className='mt-3'>Login</button>
                <span className='text-center'>Does't have an account ?
                    <Link to="/signup" style={{color:"green"}} className='text-bold-600'>Signup</Link>
                </span>
            </form>
            <ToastContainer />
        </div>
        </div>
    </div>
    )
}

export default Login
