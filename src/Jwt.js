import { graphqlOperation, API } from 'aws-amplify';
import { put } from './graphql/mutations';
import { Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  heroContent: {
    padding: theme.spacing(4, 0, 6),
  },
}))

function Jwt() {
  const classes = useStyles();
  
  async function doPut() {
    try {
      const response = await API.graphql(graphqlOperation(put));
      console.log(response)
    } catch (err) { console.log('error doPut') }
  }
  
  return (
    <Container maxWidth="sm" component="main" className={classes.heroContent}>
      <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
        JWT
      </Typography>
      <Typography variant="h5" align="center" color="textSecondary" component="p">
        Check if Jwt is on http header.
      </Typography>
      <Button
        variant="contained" color="primary"
        onClick={() => doPut()}
        >Put
      </Button>
    </Container>
  )
}

export default Jwt