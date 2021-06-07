import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { graphqlOperation, API } from 'aws-amplify';
import { deactivateRefreshToken } from './graphql/mutations';

const useStyles = makeStyles((theme) => ({
  heroContent: {
    padding: theme.spacing(6, 0),
  },
  textField: {
    width: '46ch',
  },
}))

function UserManager() {
  const classes = useStyles();
  const [email, setEmail] = useState("")
  
  function handleChange(event) {
    setEmail(event.target.value)
  }
  
  async function doDeactivateRefreshToken() {
    console.log('doDeactivateRefreshToken')
    try {
      const response = await API.graphql(graphqlOperation(deactivateRefreshToken, {email: email}));
      console.log(response)
      setEmail('')
    } catch (err) {
      console.log('error doDeactivateRefreshToken') 
    }
  }

  return (
    <div>
      <Container maxWidth="md" component="main" className={classes.heroContent}>
        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
          Deactivate Cognito UserPool RefreshToken
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" component="p">
          Inout email address of the user then click button.
        </Typography>
      </Container>
      <Container maxWidth="md">
        <Box display="flex" justifyContent="center">
          <TextField
            className={classes.textField}
            id="filled-static"
            label="user email"
            value={email}
            onChange={handleChange}
            variant="outlined"
          />
          <Button 
            aria-label="deactivate" 
            onClick={doDeactivateRefreshToken}
            color="primary"
            variant="contained"
          >Deactivate
          </Button>
        </Box>
      </Container>
    </div>
  )
}

export default UserManager

