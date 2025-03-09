import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';
import { FiMenu, FiX } from "react-icons/fi";
import Navbar from './Navbar';
 
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
        // if (!loginInfo.password.trim() || ! /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(loginInfo.password) || loginInfo.password.length < 8 ) {
        //     newErrors.password = "Password must be at least 8 characters, include a number and a special character.";
        // }

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
            const url = `http://localhost:5000/api/auth/login`;
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
                    if (role?.toLowerCase() === 'admin') {
                        navigate('/admin/admindashboard');
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
        <div className=''>
            <Navbar/>
        <div className='about-form '>

            <h1 style={{color:"blue"}}>Login</h1>
            <form onSubmit={handleLogin}>
                <div className='form-group'>
                    <label htmlFor='email'>Email</label>
                    <input
                        onChange={handleChange}
                        className='form-control'
                        type='email'
                        name='email'
                        placeholder='Enter your email...'
                        value={loginInfo.email}
                    />
                     {errors.email && <p className="text-danger">{errors.email}</p>}
                </div>
                <div className='form-group'>
                    <label htmlFor='password'>Password</label>
                    <input
                        onChange={handleChange}
                        className='form-control'
                        type='password'
                        name='password'
                        placeholder='Enter your password...'
                        value={loginInfo.password}
                    />
                 {errors.password && <p className="text-danger">{errors.password}</p>}
                </div>
                <button type='submit' className='mt-4 btn btn-primary text-center w-50 d-flex align-items-center justify-content-center '>Login</button>
                {/* <span className='text-center'>Does't have an account ?
                    <Link to="/signup" style={{color:"green"}} className='text-bold-600'>Signup</Link>
                </span> */}
            </form>
            <ToastContainer />
        </div>
        </div>

    )
}

export default Login
