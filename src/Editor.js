import * as React from 'react';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  GridColumnsToolbarButton,
} from '@material-ui/data-grid';

import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { graphqlOperation, API } from 'aws-amplify';
import { listFictions } from './graphql/queries';
import { batchPutFictions, batchDeleteFictions } from './graphql/mutations';
import { v1 as uuidv1 } from 'uuid';

const useStyles = makeStyles((theme) => ({
  heroContent: {
    padding: theme.spacing(4, 0, 2),
  },
  datagridContainer: {
    height: 500,
    flexGrow: 1
  },
  button: {
    margin: theme.spacing(1),
  }
}))

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridColumnsToolbarButton />
      <GridToolbarExport />
    </GridToolbarContainer>
  )
}

function Editor() {
  const classes = useStyles();
  
  const [rows, setRows] = useState([]);
  const [modIds, setModifiedIds] = useState([]);
  
  const columns = [
    { field: 'id', headerName: 'Id', width: 380, editable: false, hide: true },
    { field: 'sku', headerName: 'Sku', width: 90, editable: true },
    { field: 'name', headerName: 'Name', width: 130, editable: true },
    { field: 'pcs', headerName: 'Pcs', width: 90, type: 'number', editable: true },
    {
      field: 'ship',
      headerName: 'Ship',
      type: 'date',
      width: 180,
      editable: true,
    },
    { 
      field: 'modified', 
      headerName: 'Modified', 
      width: 120, 
      editable: false, 
      type: 'boolean', 
      valueGetter: isModified
    },
  ]
  
  function isModified(params) {
    if (modIds.indexOf(params.id) == '-1') {
      return false
    } else {
      return true
    }
  }

  function deleteRows() {
    console.log('deleteRows')
    /*
    try {
      const response = await API.graphql(graphqlOperation(deleteFiction, {id: }));
      console.log(response.data.deleteFiction)
      doList()
    } catch (err) { console.log('error deleteRow') }
    */
  }
  
  function saveRows() {
    console.log('saveRows')
    /*
    try {
      const response = await API.graphql(graphqlOperation(deleteFiction, {id: }));
      console.log(response.data.deleteFiction)
      doList()
    } catch (err) { console.log('error deleteRow') }
    */
  }
  
  async function doList() {
    try {
      const response = await API.graphql(graphqlOperation(listFictions));
      console.log(response)
      setRows(response.data.listFictions)
    } catch (err) { console.log('error listFictions') }
  }
  
  function addRow() {
    console.log('addRow')
    let newRows = [...rows]
    const dt = new Date()
    const now = `${dt.getFullYear()}/${(dt.getMonth()+1)}/${dt.getDate()}`
    const newId = `fiction-${uuidv1()}`
    newRows.push({
      id: newId,
      name: '',
      age: 0,
      created: now,
    })
    let newModIds = [...modIds]
    newModIds.push(newId)
    setModifiedIds(newModIds)
    setRows(newRows)
  }
  
  const handleEditRowModelChange = React.useCallback((params) => {
    console.log('handleEditRowModelChange', params)
  }, [])
  
  const handleEditCellChangeCommitted = React.useCallback(
    ({ id, field, props }) => {
      console.log('handleEditCellChangeCommitted', id)
      console.log('handleEditCellChangeCommitted', field)
      console.log('handleEditCellChangeCommitted', props)
    },
    [],
  )

  const handleEditCellChange = React.useCallback(
    ({ id, field, props }) => {
      console.log('handleEditCellChange', id)
      console.log('handleEditCellChange', field)
      console.log('handleEditCellChange', props)
    },
    [],
  )
  
  const handleRowSelected = React.useCallback(
    (params) => {
      console.log('handleRowSelected', params)
    },
    [],
  )
  
  return (
    <React.Fragment> 
      <Container maxWidth="lg" component="main" className={classes.heroContent}>
        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
          Editable DataGrid
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" component="p">
          Try edit values in cells.
        </Typography>
      </Container>
      <Container maxWidth="md" className={classes.datagridContainer}>
        <Box display="flex" justifyContent="center" m={2}>
          <Button className={classes.button}
            variant="contained" color="primary"
            onClick={() => doList()}
            >Pull Remote Rows
          </Button>
          <Button className={classes.button}
            variant="contained" color="primary"
            onClick={() => addRow()}
            >Add an Empty Row
          </Button>
          <Button className={classes.button}
            variant="contained" color="primary"
            onClick={() => saveRows()}
            >Save Selected Rows
          </Button>
          <Button className={classes.button}
            variant="contained" color="primary"
            onClick={() => deleteRows()}
            >Delete Selected Rows
          </Button>
        </Box>
          <DataGrid 
            rows={rows} 
            columns={columns}
            onEditRowModelChange={handleEditRowModelChange}
            onEditCellChangeCommitted={handleEditCellChangeCommitted}
            onEditCellChange={handleEditCellChange}
            onRowSelected={handleRowSelected}
            pageSize="10"
            components={{
              Toolbar: CustomToolbar,
            }}
            checkboxSelection
          />
      </Container>
    </React.Fragment> 
  );
}

export default Editor


