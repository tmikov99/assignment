import * as React from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from "react-router-dom";
import { registerUser } from '../util/RequestUtil';

export default function SignUp() {
    let navigate = useNavigate();
    const handleSubmit = (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      let user = {
        "firstName": data.get('firstName'),
        "lastName": data.get('lastName'),
        "email": data.get('email'),
        "password": data.get('password'),
        "matchingPassword": data.get('matchingPassword'),
        "phoneNumber": data.get('phoneNumber'),
      }
      // axios.post(`http://localhost:8080/user`, user).then(res => {
      registerUser(user).then(res => {
        navigate("../signIn", { replace: true });
      })
    };
  
    return (
        <Box
          sx={{
            marginTop: 8,
            marginLeft: 'auto',
            marginRight: 'auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            maxWidth: '50rem'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3, ml: 3, mr: 3, mb: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="phoneNumber"
                  label="Phone Number"
                  id="phoneNumber"
                  autoComplete="phone-number"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="first-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="last-name"
                  name="lastName"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="matchingPassword"
                  label="Repeat Password"
                  type="password"
                  id="matchingPassword"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
    );
  }