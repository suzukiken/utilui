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

//.toISOString()

const useStyles = makeStyles((theme) => ({
  heroContent: {
    padding: theme.spacing(6, 0),
  },
  textFieldBox: {
  },
  buttonBox: {
    padding: theme.spacing(0, 2),
  },
  datagridContainer: {
    height: 500,
    marginTop: theme.spacing(4),
    flex: 1,
  },
}))

function Notify() {
  const LOCALSTORAGE_KEY = 'm3'
  const classes = useStyles();
  const [openBar, setOpenBar] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [barMessage, setBarMessage] = useState("");
  const [receivedMessages, setReceivedMessages] = useState([]);

  const columns = [
    { field: 'message', headerName: 'Message', width: 300, editable: false },
    {
      field: 'created',
      headerName: 'Created',
      width: 250,
      editable: false,
      valueFormatter: (params) => (new Date(params.value)),
    }
  ]
  
  useEffect(() => {
    let storagedMessages = window.localStorage.getItem(LOCALSTORAGE_KEY)
    if (!storagedMessages) {
      storagedMessages = []
    } else {
      storagedMessages = JSON.parse(storagedMessages)
    }
    console.log(storagedMessages)
    setReceivedMessages(storagedMessages)
  }, [])
  
  
  useEffect(() => {
    console.log('subscription')
    const subscription = API.graphql(
      graphqlOperation(eventHappened)
    ).subscribe({
      next: ({ provider, value }) => {
        console.log({ provider, value })
        setBarMessage(value.data.eventHappened.message)
        setOpenBar(true)
        
        const dt = new Date()
        const newMessage = {
          id: uuidv1(),
          message: value.data.eventHappened.message,
          created: dt / 1000 * 1000
        }
        
        console.log(newMessage)
        
        let storagedMessages = window.localStorage.getItem(LOCALSTORAGE_KEY)
        if (!storagedMessages) {
          storagedMessages = []
        } else {
          storagedMessages = JSON.parse(storagedMessages)
        }
        console.log(storagedMessages)
        const newStoragedMessages = [...storagedMessages]
        newStoragedMessages.push(newMessage)
        window.localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(newStoragedMessages))
        
        
        const newReceivedMessages = [...receivedMessages]

        newReceivedMessages.push(newMessage)
        console.log(newReceivedMessages)
        setReceivedMessages(newReceivedMessages)
      },
      error: error => console.warn(error)
    })
    return () => {
      console.log('unsubscribe')
      subscription.unsubscribe();
    }
  }, [receivedMessages])
  
  async function doPutEvent() {
    try {
      const response = await API.graphql(graphqlOperation(putEvent, {message: inputMessage}))
      console.log(response)
      setInputMessage('')
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
        <Box className={classes.textFieldBox}>
          <TextField 
            label="message" 
            autoFocus
            autoComplete
            variant="outlined"
            size="small"
            value={inputMessage}
            onChange={(event) => setInputMessage(event.target.value)}
          />
        </Box>
        <Box className={classes.buttonBox}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => doPutEvent()}
            >PutEvent
          </Button>
        </Box>
      </Box>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={openBar}
        autoHideDuration={2000}
        onClose={handleCloseBar}
        message={barMessage}
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
          pageSize="100"
          sortModel={[
            {
              field: 'created',
              sort: 'desc',
            },
          ]}
        />
      </Container>
    </div>
  )
}

export default Notify


/*

*/