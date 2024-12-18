import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';

function Signup() {

    const [signupInfo, setSignupInfo] = useState({
        name: '',
        email: '',
        password: ''
    })
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();
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

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        // const { name, email, password } = signupInfo;
        // if (!name || !email || !password) {
        //     return handleError('name, email and password are required')
        // }
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
        <div className='auth-container d-flex flex-column align-items-center justify-content-center my-5 '>
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
                    {errors.name && <p className="text-danger">{errors.name}</p>} 
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
                <button type='submit'>Signup</button>
                <span className='text-center'>Already have an account ?
                    <Link to="/login" style={{color:"green"}}>Login</Link>
                </span>
            </form>
            <ToastContainer />
        </div>
    )
}

export default Signup

