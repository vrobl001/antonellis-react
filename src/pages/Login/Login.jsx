import React from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';
import styles from './Login.module.css';

export default function Login(props) {
  return (
    <div className={styles.loginFormContainer}>
      <LoginForm {...props} />
    </div>
  );
}
