import { useState } from 'react';
import { Storage } from 'aws-amplify';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { DropzoneAreaBase } from 'material-ui-dropzone';
import { v1 as uuidv1 } from 'uuid';
import IconButton from '@material-ui/core/IconButton';
import Attachment from '@material-ui/icons/Attachment';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  heroContent: {
    padding: theme.spacing(4, 0, 2),
  },
  mplus1p: {
    fontFamily: "M PLUS 1p",
    fontStyle: 'normal',
    fontWeight: 'Thin',
    fontSize: 15,
    letterSpacing: 0.5,
    lineHeight: 1.7
  },
  dropzone: {
    padding: theme.spacing(6),
  }
}))

function Upload() {
  const classes = useStyles();
  const [files, setFiles] = useState([])
  
  function handleFileAdd(addedFiles) {
    console.log('addedFiles:', addedFiles)
    let newFiles = [...files, ...addedFiles]
    setFiles(newFiles)
    console.log('files:', files)
  }
  
  function handleFileDelete(file) {
    console.log('deletedFile:', file)
    let newFiles = [...files]
    const index = newFiles.indexOf(file)
    if (-1 < index) {
      newFiles.splice(index, 1);
    }
    console.log('newFiles', newFiles)
    setFiles(newFiles)
    console.log('files:', files)
  }
  
  const imagePrefix = {
    public: 'images/'
  }
  
  async function doSave() {
    console.log('doSave')
    let newFiles = [...files]
    for (let file of files) {
      console.log('file', file)
      const result = await Storage.put(uuidv1(), file, {
        customPrefix: imagePrefix,
      })
      console.log('result', result)
      const index = newFiles.indexOf(file)
      console.log(index)
      if (-1 < index) {
        newFiles.splice(index, 1);
      }
    }
    setFiles(newFiles)
  }
  
  return (
    <React.Fragment> 
      <Container maxWidth="md" component="main" className={classes.heroContent}>
        <Typography variant="h4" gutterBottom>
          h1. Heading
        </Typography>
      </Container>
      <Box display="flex" justifyContent="center">
        <IconButton 
          aria-label="upload" 
          onClick={doSave}
          disabled={ files.length ? false : true }
          color="primary"
        >
          <CloudUploadIcon 
            fontSize='large'
          />
        </IconButton>
      </Box>
      <Container maxWidth="md">
        <DropzoneAreaBase
          dropzoneClass={classes.dropzone}
          filesLimit={10}
          dropzoneText="ファイルを点線のエリアにドラッグドロップしてください。10個まで同時にアップロードできます。"
          fileObjects={files}
          onAdd={handleFileAdd}
          onDelete={handleFileDelete}
          Icon={Attachment}
        />
      </Container>
      <Box display="flex" justifyContent="center">
        {files.map((row, index) => (
          <p key={index}>
            {row.file.name}
          </p>
        ))}
      </Box>
    </React.Fragment> 
  );
}

export default Upload


