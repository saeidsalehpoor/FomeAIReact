import React, { useState } from 'react';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useNavigation } from '@react-navigation/native';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const API_URL = "http://192.168.1.102:3002";

function RegisterPage() {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [password, setPassword] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [gender, setGender] = useState('');
  const [error, setError] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState('success');
  const [alertMessage, setAlertMessage] = useState('');

  const handleRegister = (event) => {
    event.preventDefault();

    const data = {
      password: password,
      displayname: displayName,
      dateofbirth: dayjs(dateOfBirth).format('YYYY-MM-DD'),
      gender: gender,
      email: email
    };

    // Check if any field is missing
    if (!email || !password || !displayName || !dateOfBirth || !gender) {
      setAlertMessage(`Please provide all required fields.`);
      setAlertSeverity('error');  
      setSnackbarOpen(true);
      return;
    }

    axios.post(`${API_URL}/users/register`, JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then((response) => {
      console.log(response.data);
      setAlertMessage(`User Registered Successfully: ${response.data.message}`);
      setAlertSeverity('success');
      setSnackbarOpen(true);
    })
    .catch((error) => {
      console.error(error);
      setAlertMessage(`Failed to Register User: ${response.data.message}`);
      setAlertSeverity('error');
      setSnackbarOpen(true);
    });
  };

  const navigateToLogin = () => {
    navigation.navigate('LoginPage');
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <ThemeProvider theme={createTheme()}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box component="form" noValidate onSubmit={handleRegister} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                {/* Display error message */}
                {error && (
                  <Grid item xs={12}>
                    <Alert severity="error">{error}</Alert>
                  </Grid>
                )}
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="displayName"
                    label="Display Name"
                    name="displayName"
                    autoComplete="displayName"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
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
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="new-password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputLabel id="gender-label">Gender</InputLabel>
                  <Select
                    labelId="gender-label"
                    id="genderlbl"
                    value={gender}
                    label="Gender"
                    onChange={(e) => setGender(e.target.value)}
                    fullWidth
                  >
                    <MenuItem value={'M'}>Male</MenuItem>
                    <MenuItem value={'F'}>Female</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={6}>
                  <DatePicker
                    label="Date of Birth"
                    value={dateOfBirth}
                    onChange={setDateOfBirth}
                    fullWidth
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
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="#" variant="body2" onClick={navigateToLogin}>
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
        <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
          <Alert onClose={handleSnackbarClose} severity={alertSeverity} sx={{ width: '100%' }}>
            {alertMessage}
          </Alert>
        </Snackbar>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default RegisterPage;
