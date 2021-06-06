import * as React from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { graphqlOperation, API } from 'aws-amplify';
import { getParams } from './graphql/queries';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import fileDownload from 'js-file-download';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Snackbar from '@material-ui/core/Snackbar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
  heroContent: {
    padding: theme.spacing(4, 0, 2),
  },
}))

function Download() {
  const classes = useStyles();

  const LOCALSTORAGE_KEY = 'download'
  
  const [content, setContent] = useState('');
  const [respond, setRespond] = useState('');
  const [openBar, setOpenBar] = useState(false);
  const [barMessage, setBarMessage] = useState('');
  const [searchedItems, setSearchedItems] = useState([]);
  
  async function doGet() {
    try {
      const response = await API.graphql(graphqlOperation(getParams, {content: content}));
      console.log(response)
      setRespond(response.data.getParams)
      updateSearchedItems()
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
  
  useEffect(() => {
    let items = window.localStorage.getItem(LOCALSTORAGE_KEY)
    if (!items) {
      items = []
    } else {
      items = JSON.parse(items)
    }
    console.log(items)
    setSearchedItems(items)
  }, []) 
  
  function updateSearchedItems() {
    let newItems = [...searchedItems]
    const items = content.split('\n')
    for (let line of items) {
      newItems.push(line)
    }
    const newItems2 = Array.from(new Set(newItems))
    setSearchedItems(newItems2)
    window.localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(newItems2))
  }
  
  function deleteItem(itemText) {
    let newItems = [...searchedItems]
    const index = searchedItems.indexOf(itemText)
    newItems.splice(index, 1)
    setSearchedItems(newItems)
    window.localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(newItems))
  }
  
  
  function copyText(itemText) {
    navigator.clipboard.writeText(itemText).then(function() {
      setBarMessage(`copied ${itemText}`)
      setOpenBar(true)
    })
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
      <Container maxWidth="sm">
        <Paper elevation={1} square>
          <Box m={1}>
            <List component="nav" aria-label="main mailbox folders">
              {searchedItems.map((item, index) => (
                <ListItem button key={index} onClick={() => copyText(item)}>
                  <ListItemText primary={item} />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete" onClick={() => deleteItem(item)}>
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Box>
        </Paper>
      </Container>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={openBar}
        autoHideDuration={500}
        message={barMessage}
        onClose={() => setOpenBar(false)}
      />
    </React.Fragment> 
  );
}

export default Download


