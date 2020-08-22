import React from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';
import '../../App.css';

export default function Login(props) {
  return (
    <div className='loginContainer'>
      <LoginForm {...props} />
    </div>
  );
}
