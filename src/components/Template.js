import React from 'react';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import useWindowPosition from '../animination/useAnimination';
import Collapse from '@mui/material/Collapse';

const useStyles = makeStyles({
  emailbox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
});

const Template = () => {
  const classes = useStyles();
  const checked = useWindowPosition('header');

  return (
    <div className={classes.emailbox} id='go-to-email-template'>
      <Collapse in={checked} {...(checked ? { timeout: 1000 } : {})}>
        <Container>
          <Card sx={{ maxWidth: 600 }}>
            <CardHeader title='New Message' />
            <CardContent>
              <form>
                <TextField
                  style={{ marginBottom: '10px' }}
                  id='standard-basic'
                  label='To'
                  variant='standard'
                  fullWidth
                />
                <TextField
                  style={{ marginBottom: '10px' }}
                  id='standard-basic'
                  label='Subject'
                  variant='standard'
                  fullWidth
                />
                <TextField
                  style={{ marginTop: '40px' }}
                  multiline
                  rows={10}
                  label='body'
                  fullWidth
                />
                <Button style={{ marginTop: '10px' }} variant='contained'>
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
