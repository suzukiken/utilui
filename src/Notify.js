import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { eventHappened } from './graphql/subscriptions';
import { putEvent } from './graphql/mutations';

function Notify() {

  const [openBar, setOpenBar] = useState(false);
  const [message, setMessage] = useState(false);
  
  useEffect(() => {
    const subscription = API.graphql(
      graphqlOperation(eventHappened)
    ).subscribe({
      next: ({ provider, value }) => {
        setMessage(value.data.eventHappened.message)
        setOpenBar(true)
        console.log({ provider, value })
      },
      error: error => console.warn(error)
    })
    return () => {
      subscription.unsubscribe();
    }
  })
  
  async function doPutEvent() {
    try {
      const response = await API.graphql(graphqlOperation(putEvent, {message: 'hello'}));
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
      <Button onClick={doPutEvent}>PutEvent</Button>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={openBar}
        autoHideDuration={2000}
        onClose={handleCloseBar}
        message={message}
        action={
          <IconButton size="small" aria-label="close" color="inherit" onClick={handleCloseBar}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </div>
  )
}

export default Notify


