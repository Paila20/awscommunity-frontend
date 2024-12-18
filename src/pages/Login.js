import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';

function Login() {

    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    })
   const [errors, setErrors] = useState({});

    const navigate = useNavigate();

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
            const { success, message, jwtToken, name, error } = result;
            if (success) {
                handleSuccess(message);
                localStorage.setItem('token', jwtToken);
                localStorage.setItem('loggedInUser', name);
                setTimeout(() => {
                    navigate('/home')
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
        <div className='auth-container d-flex flex-column align-items-center justify-content-center mb-3 'style={{marginTop:"6rem"}}>
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
                <button type='submit' >Login</button>
                <span className='text-center'>Does't have an account ?
                    <Link to="/signup" style={{color:"green"}} className='text-bold-600'>Signup</Link>
                </span>
            </form>
            <ToastContainer />
        </div>
    )
}

export default Login
