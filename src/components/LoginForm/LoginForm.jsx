import React, { useState } from 'react';
import userService from '../../utils/userService';
import { Link } from 'react-router-dom';
import '../../App.css';

// Material UI
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

export default function Signup(props) {
  const [form, setState] = useState({
    email: '',
    password: '',
    error: '',
  });

  const handleChange = (e) => {
    setState({
      ...form,
      error: '',
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid()) return;
    try {
      const { email, password } = form;
      await userService.login({ email, password });
      props.handleSignupOrLogin();
      props.history.push('/');
    } catch (error) {
      setState({
        ...form,
        email: '',
        password: '',
        error: error.message,
      });
    }
  };

  const isFormValid = () => {
    return form.email && form.password;
  };

  return (
    <div className='loginFormContainer'>
      <Card className='loginCard'>
        <CardContent>
          <Typography component='h4' variant='h4'>
            Log In
          </Typography>
          <div className='errorContainer'>{form.error && <p>{form.error}</p>}</div>
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete='email'
                  autoFocus
                  fullWidth
                  id='email'
                  label='Email Address'
                  margin='normal'
                  name='email'
                  onChange={handleChange}
                  required
                  type='email'
                  value={form.email}
                  variant='outlined'
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete='current-password'
                  fullWidth
                  id='password'
                  label='Password'
                  margin='normal'
                  name='password'
                  onChange={handleChange}
                  required
                  type='password'
                  value={form.password}
                  variant='outlined'
                />
              </Grid>
              <Grid item xs={12}>
                <Button color='primary' disabled={!isFormValid()} fullWidth type='submit' variant='contained'>
                  Sign In
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Link className='signupLink' to='/signup' variant='body2'>
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
