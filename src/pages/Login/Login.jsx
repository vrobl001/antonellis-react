import React from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';
import '../../App.css';

export default function Login(props) {
  return (
    <div className='pageContainer loginContainer'>
      <LoginForm {...props} />
    </div>
  );
}
