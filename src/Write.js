import { Storage } from 'aws-amplify';
import { useState, useEffect } from 'react';
import { useUserContext } from './UserContext';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useParams } from "react-router-dom";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const useStyles = makeStyles((theme) => ({
  heroContent: {
    padding: theme.spacing(6, 0),
  },
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 700,
  },
  editorContainer: {
    padding: theme.spacing(6, 0),
  },
  mainTextField: {
  }
}))

function Write() {
  const classes = useStyles();
  const [body, setBody] = useState("")
  const [filename, setFilename] = useState("")
  const [open, setOpen] = useState(false)
  const [hasSameFilename, setHasSameFilename] = useState(false)
  const { userContext } = useUserContext()
  let { key } = useParams();
  
  useEffect(() => {
    console.log('useEffect', key)
  }, [key])
  
  useEffect(() => {
    if (key && userContext && userContext.authenticated) {
      getContent(key)
    }
  }, [key, userContext])
  
  const customPrefix = {
    public: ''
  }
  
  function handleBodyChange(event) {
    //console.log(event)
    setBody(event.target.value)
  }
  
  function handleFilenameChange(event) {
    //console.log(event)
    setFilename(event.target.value)
    checkExists(event.target.value)
  }
  
  async function doSave() {
    console.log('doSave')
    const result = await Storage.put(filename, body, {
      customPrefix: customPrefix,
    })
    console.log(result)
    setOpen(false)
  }
  
  async function checkExists(key) {
    console.log('checkExists', key)
    try {
      const result = await Storage.list('', {
        customPrefix: customPrefix
      })
      let found = false
      for (let obj of result) {
        if (obj.key === key) {
          found = true
        }
      }
      setHasSameFilename(found)
      console.log(result, found)
    } catch (err) {
      console.log('error checkExists', err)
    }
  }
  
  async function getContent(key) {
    console.log('getContent', key)
    try {
      const result = await Storage.get(key, {
        customPrefix: customPrefix,
        download: true
      })
      // setBody()
      const content = await result.Body.text()
      setBody(content)
      setFilename(key)
      //console.log(content)
    } catch (err) {
      console.log('error getContent', err)
    }
  }
  
  function handleOpen(event) {
    //console.log('handleOpen')
    setOpen(true)
  }
  
  function handleClose(event) {
    //console.log('handleClose')
    setOpen(false)
  }

  return (
    <div>
      <Container maxWidth="md" component="main" className={classes.heroContent}>
        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
          Write
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" component="p">
          Write text then save it in S3.
        </Typography>
      </Container>
      <Box display="flex" justifyContent="center">
        <IconButton 
          aria-label="upload" 
          onClick={handleOpen}
          disabled={ body.length ? false : true }
          color="primary"
        >
          <CloudUploadIcon 
            fontSize='large'
          />
        </IconButton>
      </Box>
      <Container maxWidth="md" className={classes.editorContainer}>
        <TextField
          className={classes.mainTextField}
          id="filled-multiline-static"
          label="Multiline"
          multiline
          fullWidth
          value={body}
          onChange={handleBodyChange}
          variant="outlined"
        />
      </Container>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Filename for S3 Object</DialogTitle>
        <DialogContent>
          <DialogContentText>
            { hasSameFilename ? 'Overrite' : 'Save' }
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="filename"
            label="filename"
            fullWidth
            onChange={handleFilenameChange}
            value={filename}
          />
        </DialogContent>
        <DialogActions>
          <IconButton 
            aria-label="upload" 
            onClick={doSave}
            color={ hasSameFilename ? 'secondary' : 'primary' }
            disabled={ filename.length ? false : true }>
            <CloudUploadIcon fontSize='large'/>
          </IconButton>
          <Button onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Write

