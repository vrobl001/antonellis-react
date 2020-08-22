import React, { useState } from 'react';
import userService from '../../utils/userService';
import { Link } from 'react-router-dom';
import '../../App.css';

// Material UI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(15),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignupForm(props) {
  const classes = useStyles();

  const [form, setState] = useState({
    userName: {
      firstName: '',
      lastName: '',
    },
    email: '',
    password: '',
    passwordConf: '',
    error: '',
  });

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (name === 'firstName' || name === 'lastName') {
      setState((prevState) => ({
        ...form,
        error: '',
        userName: {
          ...prevState.userName,
          [name]: value,
        },
      }));
    } else {
      setState({
        ...form,
        error: '',
        [name]: value,
      });
    }
  };

  const handlePasswordMatch = () => {
    if (form.password.length >= 8 && form.passwordConf.length === form.password.length) {
      if (form.password !== form.passwordConf) {
        return setState({
          ...form,
          passwordConf: '',
          error: 'Passwords do not match!',
        });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid()) return;
    try {
      const { userName, email, password } = form;
      await userService.signup({ userName, email, password });
      props.handleSignupOrLogin();
      props.history.push('/');
    } catch (error) {
      setState({
        ...form,
        email: '',
        password: '',
        passwordConf: '',
        error: error.message,
      });
    }
  };

  const isFormValid = () => {
    handlePasswordMatch();
    return (
      form.userName.firstName &&
      form.userName.lastName &&
      form.email &&
      form.password &&
      form.passwordConf &&
      form.password === form.passwordConf
    );
  };

  return (
    <div className='pageContainer'>
      <Card className='signupCard'>
        <CardContent className='signupContainer'>
          <Typography component='h4' variant='h4'>
            Sign up
          </Typography>
          {form.error && <p>{form.error}</p>}
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete='fname'
                  autoFocus
                  fullWidth
                  id='firstName'
                  label='First Name'
                  onChange={handleChange}
                  name='firstName'
                  required
                  type='text'
                  value={form.userName.firstName}
                  variant='outlined'
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete='lname'
                  fullWidth
                  id='lastName'
                  label='Last Name'
                  onChange={handleChange}
                  name='lastName'
                  required
                  type='text'
                  value={form.userName.lastName}
                  variant='outlined'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete='email'
                  fullWidth
                  id='email'
                  label='Email Address'
                  onChange={handleChange}
                  name='email'
                  required
                  type='email'
                  value={form.email}
                  variant='outlined'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete='current-password'
                  fullWidth
                  id='password'
                  label='Password'
                  onChange={handleChange}
                  name='password'
                  required
                  type='password'
                  value={form.password}
                  variant='outlined'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete='current-password'
                  fullWidth
                  id='passwordConf'
                  label='Password Confirmation'
                  onChange={handleChange}
                  name='passwordConf'
                  required
                  type='password'
                  value={form.passwordConf}
                  variant='outlined'
                />
              </Grid>
            </Grid>
            <Button
              className={classes.submit}
              color='primary'
              disabled={!isFormValid()}
              fullWidth
              type='submit'
              variant='contained'>
              Sign Up
            </Button>
          </form>
          <Typography component='h6'>
            <Link to='/login' variant='body2'>
              Already have an account? Sign in
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
