import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { eventHappened } from './graphql/subscriptions';
import { putEvent } from './graphql/mutations';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { DataGrid } from '@material-ui/data-grid';
import { v1 as uuidv1 } from 'uuid';

const useStyles = makeStyles((theme) => ({
  heroContent: {
    padding: theme.spacing(6, 0),
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  datagridContainer: {
    height: 500,
    marginTop: theme.spacing(4),
    flex: 1,
  },
}))

function Notify() {
  const classes = useStyles();
  const [openBar, setOpenBar] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [receivedMessage, setReceivedMessage] = useState("");
  const [receivedMessages, setReceivedMessages] = useState([]);

  const columns = [
    { field: 'message', headerName: 'Message', width: 300, editable: false },
    {
      field: 'created',
      headerName: 'Created',
      type: 'datetime',
      width: 200,
      editable: false
    }
  ]
  
  useEffect(() => {
    const subscription = API.graphql(
      graphqlOperation(eventHappened)
    ).subscribe({
      next: ({ provider, value }) => {
        console.log({ provider, value })
        setReceivedMessage(value.data.eventHappened.message)
        setOpenBar(true)
        const newReceivedMessages = [...receivedMessages]
        const dt = new Date()
        newReceivedMessages.push({
          id: uuidv1(),
          message: value.data.eventHappened.message,
          created: dt.toISOString()
        })
        setReceivedMessages(newReceivedMessages)
      },
      error: error => console.warn(error)
    })
    return () => {
      subscription.unsubscribe();
    }
  })
  
  async function doPutEvent() {
    let messages = window.localStorage.getItem('mess1')
    if (!messages) {
      messages = []
    } else {
      messages = JSON.parse(messages)
    }
    console.log(messages)
    const newMessages = [...messages]
    newMessages.push(inputMessage)
    window.localStorage.setItem('mess1', JSON.stringify(newMessages))
    try {
      const response = await API.graphql(graphqlOperation(putEvent, {message: inputMessage}))
      console.log(response)
    } catch (err) { console.log('error doPutEvent') }
  }

  const handleCloseBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenBar(false);
  }

  return (
    <div>
      <Container maxWidth="sm" component="main" className={classes.heroContent}>
        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
          Subscription
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" component="p">
          Send message then you get notified.
        </Typography>
      </Container>
      <Box display="flex" justifyContent="center">
        <TextField 
          id="outlined-basic" 
          label="message" 
          autoFocus
          autoComplete
          value={inputMessage}
          onChange={(event) => setInputMessage(event.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => doPutEvent()}
          >PutEvent
        </Button>
      </Box>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={openBar}
        autoHideDuration={2000}
        onClose={handleCloseBar}
        message={receivedMessage}
        action={
          <IconButton size="small" aria-label="close" color="inherit" onClick={handleCloseBar}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
      <Container maxWidth="sm" className={classes.datagridContainer}>
        <DataGrid 
          rows={receivedMessages} 
          columns={columns}
          pageSize="10"
        />
      </Container>
    </div>
  )
}

export default Notify


