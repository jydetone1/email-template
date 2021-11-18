import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import useWindowPosition from '../animination/useAnimination';
import Collapse from '@mui/material/Collapse';
import axios from 'axios';

const useStyles = makeStyles({
  emailbox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  textmessages: {
    textAlign: 'center',
    color: '#5AFF3D',
  },
});

const Template = () => {
  const classes = useStyles();
  const checked = useWindowPosition('header');
  const [user, setUser] = useState({
    to: '',
    subject: '',
    body: '',
  });
  const [message, setMessage] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    const val = /^[A-Za-z]+$/;
    if (e.target.value === '' || val.test(e.target.value))
      setUser({
        ...user,
        [e.target.name]: e.target.value.split(' ').join(''),
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    setMessage(false);
    setUser({ to: '', subject: '', body: '' });

    if (user.to === '' || user.subject === '' || user.body === '')
      return setError(true);

    if (user.to && user.subject && user.body) {
      axios
        .post('https://mock.at.leanylabs.com/email', { user })
        .then((response) => {
          if (response.status === 200) return;
          setMessage('Message was sent successfully!!');
        })
        .catch((err) => {
          let message =
            typeof err.response !== 'undefined'
              ? err.response.data.message
              : err.message;
          setMessage(message);
        });
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, [user, message]);

  return (
    <div className={classes.emailbox} id='go-to-email-template'>
      <Collapse in={checked} {...(checked ? { timeout: 1000 } : {})}>
        <Container>
          <Card sx={{ maxWidth: 600 }}>
            <CardHeader title='New Message' />
            {message && <h3 className={classes.textmessages}>{message}</h3>}
            <CardContent>
              <form onSubmit={handleSubmit} noValidate autoComplete='off'>
                <TextField
                  style={{ marginBottom: '10px' }}
                  label='To'
                  name='to'
                  value={user.to}
                  onChange={handleChange}
                  variant='standard'
                  error={error}
                  fullWidth
                />
                <TextField
                  style={{ marginBottom: '10px' }}
                  label='Subject'
                  name='subject'
                  value={user.subject}
                  onChange={handleChange}
                  variant='standard'
                  error={error}
                  fullWidth
                />
                <TextField
                  style={{ marginTop: '40px' }}
                  multiline
                  rows={10}
                  name='body'
                  value={user.body}
                  onChange={handleChange}
                  error={error}
                  fullWidth
                />
                <Button
                  type='submit'
                  style={{ marginTop: '10px' }}
                  variant='contained'
                >
                  Send
                </Button>
              </form>
            </CardContent>
          </Card>
        </Container>
      </Collapse>
    </div>
  );
};

export default Template;
