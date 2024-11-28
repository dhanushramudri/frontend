import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const URL = 'http://localhost:8000/';
  const [user, setUser] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState(''); 
  const navigate = useNavigate();

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${URL}user/login`, user);
      console.log(response.data);
      localStorage.setItem('accesstoken', response.data.accesstoken);
      localStorage.setItem('refreshtoken', response.data.refreshtoken);
      localStorage.setItem('userRole', response.data.user.role);
      navigate('/');
    } catch (err) {
      setError('Login failed. Please check your credentials.'); 
      console.error(err);
    }
  };
  return (
    <div className='login-page'>
      <form className='log' onSubmit={loginSubmit}>
      <img className='regimg' src='img1.jpg'/>
        <input
          type='email'
          name='email'
          placeholder='Email'
          value={user.email}
          onChange={onChangeInput}
          required
        />
        <input
          type='password'
          name='password'
          placeholder='Password'
          value={user.password}
          onChange={onChangeInput}
          required
        />
        <button type='submit'>Login</button>
        {error && <div className='error-message'>{error}</div>} {/* Display error message */}
        <Link className='Link' to='/register'>Don't have an account? Register</Link>
      </form>
    </div>
  );
};

export default Login;