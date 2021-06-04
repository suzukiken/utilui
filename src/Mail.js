import * as React from 'react';
import { useState, useEffect } from 'react';
import { useUserContext } from './UserContext';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { graphqlOperation, API } from 'aws-amplify';
import { listMails, getMail } from './graphql/queries';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  heroContent: {
    padding: theme.spacing(6, 0, 6),
  },
  container: {
    flexGrow: 1
  },
  blogContent: {
    margin: theme.spacing(2, 0, 0)
  }
}))

function Mail() {
  const classes = useStyles();
  const { userContext } = useUserContext()
  
  const [mailId, setMailId] = useState('');
  const [content, setContent] = useState('');
  const [mails, setMails] = useState([]);
  
  useEffect(() => {
    getMails()
  }, [userContext])
  
  function handleChange(e) {
    console.log('handleChange')
    setMailId(e.target.value)
  }
  
  async function getContent() {
    console.log('getContent')
    try {
      const response = await API.graphql(graphqlOperation(getMail, {id: mailId}));
      console.log(response.data.getMail)
      setContent(response.data.getMail)
    } catch (err) { console.log('error getContent') }
  }
  
  async function getMails() {
    console.log('getMails')
    try {
      const response = await API.graphql(graphqlOperation(listMails));
      console.log(response.data.listMails)
      setMails(response.data.listMails)
    } catch (err) { console.log('error getMails') }
  }

  return (
    <React.Fragment> 
      <Container maxWidth="lg" component="main" className={classes.heroContent}>
        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
          Mail
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" component="p">
          See.
        </Typography>
      </Container>
      <Container maxWidth="sm" className={classes.container}>
        <TextField id="standard-basic" label="Standard"
          onChange={handleChange}
        />
        <Button variant="contained" onClick={getContent}>Get</Button>
      </Container>
      <Container maxWidth="sm" className={classes.container}>
        <Box>
          {content}
        </Box>
      </Container>
      <Container maxWidth="sm" className={classes.container}>
        {mails.map((mail, index) => (
          <Box>
            <Typography variant="h5" align="left">
              {mail.key} {mail.size} {mail.modified}
            </Typography>
          </Box>
        ))}
      </Container>
    </React.Fragment> 
  );
}

export default Mail
