import React, { useState } from 'react';
import userService from '../../utils/userService';
import { Link } from 'react-router-dom';
import styles from './LoginForm.module.css';

// Material UI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Signup(props) {
  const classes = useStyles();

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
    <Container className={styles.loginContainer} component='main' maxWidth='xs'>
      <div className={classes.paper}>
        <Typography component='h4' variant='h4'>
          Sign in
        </Typography>
        {form.error && <p>{form.error}</p>}
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
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
          <FormControlLabel control={<Checkbox value='remember' color='primary' />} label='Remember me' />
          <Button
            className={classes.submit}
            color='primary'
            disabled={!isFormValid()}
            fullWidth
            type='submit'
            variant='contained'>
            Sign In
          </Button>
        </form>
        <Typography component='h6'>
          <Link to='/signup' variant='body2'>
            Don't have an account? Sign Up
          </Link>
        </Typography>
      </div>
    </Container>
  );
}
