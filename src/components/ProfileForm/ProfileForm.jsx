import React, { useState } from 'react';
import profileService from '../../utils/profileService';
import '../../App.css';

// Material UI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function ProfileForm(props) {
  const classes = useStyles();

  const [form, setState] = useState({
    phone: '',
    address: {
      classification: '',
      street: '',
      apt: '',
      city: '',
      state: '',
      zip: '',
    },
  });

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setState((prevState) => ({
      ...form,
      error: '',
      [name]: value,
      address: {
        ...prevState.userName,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { phone, address } = form;
      await profileService.update({ phone, address });
      props.history.push('/');
    } catch (error) {
      setState((prevState) => ({
        ...form,
        phone: '',
        error: error.message,
        address: { ...prevState, classification: '', street: '', apt: '', city: '', state: '', zip: '' },
      }));
    }
  };

  return (
    <Container className='signupContainer' component='main' maxWidth='xs'>
      <div className={classes.paper}>
        <Typography component='h4' variant='h4'>
          Profile
        </Typography>
        {form.error && <p>{form.error}</p>}
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoFocus
                fullWidth
                id='phone'
                label='Phone'
                onChange={handleChange}
                name='phone'
                type='text'
                value={form.phone}
                variant='outlined'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id='street'
                label='Street'
                onChange={handleChange}
                name='street'
                type='text'
                value={form.address.street}
                variant='outlined'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id='apt'
                label='Apt'
                onChange={handleChange}
                name='apt'
                type='text'
                value={form.address.apt}
                variant='outlined'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id='city'
                label='City'
                onChange={handleChange}
                name='city'
                type='city'
                value={form.address.city}
                variant='outlined'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id='state'
                label='State'
                onChange={handleChange}
                name='state'
                type='text'
                value={form.address.state}
                variant='outlined'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id='zip'
                label='Zip Code'
                onChange={handleChange}
                name='zip'
                type='text'
                value={form.address.zip}
                variant='outlined'
              />
            </Grid>
          </Grid>
          <Button className={classes.submit} color='primary' fullWidth type='submit' variant='contained'>
            Update Profile
          </Button>
        </form>
      </div>
    </Container>
  );
}
