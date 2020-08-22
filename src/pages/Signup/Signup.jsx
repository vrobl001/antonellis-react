import React from 'react';
import SignupForm from '../../components/SignupForm/SignupForm';
import '../../App.css';

export default function Signup(props) {
  return (
    <div className='signupContainer'>
      <SignupForm {...props} />
    </div>
  );
}
