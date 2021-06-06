import * as React from 'react';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { graphqlOperation, API } from 'aws-amplify';
import { getParams } from './graphql/queries';
import TextField from '@material-ui/core/TextField';
import fileDownload from 'js-file-download';

const useStyles = makeStyles((theme) => ({
  heroContent: {
    padding: theme.spacing(4, 0, 2),
  },
}))

function Download() {
  const classes = useStyles();

  const [content, setContent] = useState('');
  const [respond, setRespond] = useState('');
  
  async function doGet() {
    try {
      const response = await API.graphql(graphqlOperation(getParams, {content: content}));
      console.log(response)
      setRespond(response.data.getParams)
    } catch (err) { console.log('error getParams') }
  }
  
  function handleInput(event) {
    console.log('handleInput')
    setContent(event.target.value)
  }
  
  function doSave() {
    console.log('doSave', respond)
    fileDownload(respond, 'my.txt')
  }
  
  return (
    <React.Fragment> 
      <Container maxWidth="lg" component="main" className={classes.heroContent}>
        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
          Get Params
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" component="p">
          Get Params from AWS
        </Typography>
      </Container>
      <Container maxWidth="md" className={classes.datagridContainer}>
        <TextField
          id="outlined-multiline-static"
          label="Multiline"
          multiline
          fullWidth
          value={content}
          variant="outlined"
          onChange={handleInput}
        />
        <Box display="flex" justifyContent="center" m={2}>
          <Button className={classes.button}
            variant="outlined"
            onClick={() => doGet()}
            >Get
          </Button>
        </Box>
        <TextField
          id="outlined-multiline-static"
          label="Multiline"
          multiline
          fullWidth
          variant="outlined"
          value={respond}
        />
        <Box display="flex" justifyContent="center" m={2}>
          <Button className={classes.button}
            variant="outlined"
            onClick={() => doSave()}
            >Save
          </Button>
        </Box>
      </Container>
      <Box>
        <pre>
          BUCKET_NAME: ssm::/user/local
          BUCKET_NAME2: ssm:ap-northeast-1:/user/local
          TABLE_NAME: cfn::table-name
          TABLE_NAME2: cfn:us-east-1:table-name
          PASSWORD: sm::slack-app-telldone
          PASSWORD2: sm::slack-app-telldone:hellokitty
          PASSWORD2: sm:us-east-1:slack-app-telldone
        </pre>
      </Box>
    </React.Fragment> 
  );
}

export default Download


