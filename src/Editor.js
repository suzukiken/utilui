import * as React from 'react';
import { useState, useEffect } from 'react';
import { useUserContext } from './UserContext';
import { makeStyles } from '@material-ui/core/styles';
import { Button, IconButton } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  GridColumnsToolbarButton,
} from '@material-ui/data-grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { graphqlOperation, API } from 'aws-amplify';
import { listFictions } from './graphql/queries';
import { updateFiction, batchDeleteFictions, batchPutFictions } from './graphql/mutations';
import { v1 as uuidv1 } from 'uuid';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Delete from '@material-ui/icons/Delete';
import InfoIcon from '@material-ui/icons/Info';


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

function dateFormatter(params) {
  const dt = new Date(params.value)
  return (
    `${dt.getFullYear()}-${("0"+(dt.getMonth()+1)).slice(-2)}-${("0"+dt.getDate()).slice(-2)}`
  )
}

function Editor() {
  const classes = useStyles();
  const { userContext } = useUserContext()
  
  const [rows, setRows] = useState([]);
  const [modifiedRows, setModifiedRows] = useState([]);
  const [modifiedIds, setModifiedIds] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [selected, setSelected] = useState([]);
  
  const columns = [
    { field: 'id', headerName: 'Id', width: 380, editable: false, hide: true },
    { field: 'sku', headerName: 'Sku', width: 90, editable: true },
    { field: 'name', headerName: 'Name', width: 130, editable: true },
    { field: 'pcs', headerName: 'Pcs', width: 90, type: 'number', editable: true },
    {
      field: 'ship',
      headerName: 'Ship',
      type: 'date',
      width: 120,
      editable: true,
      valueFormatter: (params) => dateFormatter(params)
    },
    { 
      field: 'saved', 
      headerName: 'Saved', 
      width: 140, 
      editable: false, 
      type: 'boolean',
      valueGetter: isSaved,
      renderCell: (params) => (
        <IconButton 
          aria-label="Upload" 
          bgcolor="primary"
          onClick={() => putRow(params)}
          disabled={params.value}
        >
          <CloudUploadIcon />
        </IconButton>
      )
    }
    /*
    { 
      field: 'delete', 
      headerName: 'Delete', 
      width: 150, 
      editable: false, 
      renderCell: (params) => (
        <Button className={classes.button}
          variant="outlined"
          color="secondary"
          size="small"
          startIcon={<DeleteForeverIcon />}
          onClick={() => deleteRow(params)}
          >Delete
        </Button>
      )
    }
    */
  ]
  
  useEffect(() => {
    if (userContext && userContext.authenticated) {
      doList()
    }
  }, [userContext])
  
  useEffect(() => {
    setSelected(selectedIds.length !== 0)
  }, [selectedIds])
  
  useEffect(() => {
    let newModifiedIds = []
    for (let i=0; i<modifiedRows.length; i++) {
      newModifiedIds.push(modifiedRows[i].id)
    }
    setModifiedIds(newModifiedIds)
  }, [modifiedRows])
  
  function isSaved(params) {
    return -1 === modifiedIds.indexOf(params.row.id)
  }
  
  /*
  async function deleteRow(params) {
    console.log('deleteRow', params)
    try {
      const response = await API.graphql(graphqlOperation(deleteFiction, {id: params.row.id}));
      console.log('deleteRow', response)
      let index = null
      for (let i=0; i<rows.length; i++) {
        if (rows[i].id === params.row.id) {
          index = i
          break
        }
      }
      if (index != null) {
        let newRows = [...rows]
        newRows.splice(index, 1);
        setRows(newRows)
      }
    } catch (err) { console.log('error deleteFiction') }
  }
  */
  
  async function deleteRows() {
    console.log('deleteRows')
  }
  
  async function putRows() {
    let sendRows = []
    for (let i=0; i<rows.length; i++) {
      if (-1 < selectedIds.indexOf(rows[i].id)) {
        const dt = new Date(rows[i].ship)
        const ship = `${dt.getFullYear()}-${("0"+(dt.getMonth()+1)).slice(-2)}-${("0"+dt.getDate()).slice(-2)}`
        let row = {
          id: rows[i].id,
          sku: parseInt(rows[i].sku),
          name: rows[i].name,
          pcs: parseInt(rows[i].pcs),
          ship: ship
        }
        sendRows.push(row)
      }
    }
    console.log('putRows', sendRows)
    try {
      const response = await API.graphql(graphqlOperation(batchPutFictions, {fictions: sendRows}));
      console.log(response.data.batchPutFictions)
    } catch (err) { console.log('error putRows') }
  }
  
  async function putRow(params) {
    console.log('putRow', params)
    const dt = new Date(params.row.ship)
    const ship = `${dt.getFullYear()}-${("0"+(dt.getMonth()+1)).slice(-2)}-${("0"+dt.getDate()).slice(-2)}`
    const row = {
      id: params.row.id,
      sku: parseInt(params.row.sku),
      name: params.row.name,
      pcs: parseInt(params.row.pcs),
      ship: ship
    }
    try {
      const response = await API.graphql(graphqlOperation(updateFiction, {input: row}));
      console.log(response)
      //setRows(response.data.updateFiction)
    } catch (err) { console.log('error putRow') }
  }
  
  async function doList() {
    try {
      const response = await API.graphql(graphqlOperation(listFictions));
      console.log(response)
      setRows(response.data.listFictions)
      setModifiedRows([])
      setSelectedIds([])
    } catch (err) { console.log('error listFictions') }
  }
  
  function addRow() {
    let newRows = [...rows]
    const dt = new Date()
    const now = `${dt.getFullYear()}-${("0"+(dt.getMonth()+1)).slice(-2)}-${("0"+(dt.getDate()+1)).slice(-2)}`
    const newId = `fiction-${uuidv1()}`
    const row = {
      id: newId,
      sku: 0,
      name: '',
      pcs: 0,
      ship: now,
    }
    newRows.push(row)
    setRows(newRows)
    
    let newModifiedRows = [...modifiedRows]
    row.added = true
    newModifiedRows.push(row)
    setModifiedRows(newModifiedRows)
  }
  
  function getCurrentValueOfRow(id, field) {
    for (var i=0; i<rows.length; i++) {
      if (rows[i].id === id) {
        return rows[i][field]
      }
    }
  }
  
  function handleEditCellChangeCommitted(params){
    console.log('handleEditCellChangeCommitted', params)
    const currentValue = getCurrentValueOfRow(params.id, params.field)
    console.log('getCurrentValueOfRow', currentValue)
    console.log('params.props.value', params.props.value)
    if(params.props.value !== String(currentValue)) {
      console.log('diff')
      const newModifiedRows = [...modifiedRows]
      let index = null
      for (let i=0; i<newModifiedRows.length; i++) {
        if (newModifiedRows[i].id === params.id) {
          console.log('row found')
          index = i
          break
        }
      }
      if(index == null) {
        const row = {id: params.id}
        row[params.field] = params.props.value
        newModifiedRows.push(row)
      } else {
        newModifiedRows[index][params.field] = params.props.value
      }
      setModifiedRows(newModifiedRows)
    } else {
      console.log('same')
      const newModifiedRows = [...modifiedRows]
      let index = null
      for (let i=0; i<newModifiedRows.length; i++) {
        if (newModifiedRows[i].id === params.id) {
          console.log('row found')
          index = i
          break
        }
      }
      if(index !== null) {
        const keys = Object.keys(newModifiedRows[index])
        keys.splice(keys.indexOf('id'), 1)
        const idx = keys.indexOf(params.field)
        if (idx !== -1) {
          keys.splice(idx, 1)
        }
        if (Object.keys(keys).length === 0) {
          newModifiedRows.splice(index, 1)
        } else {
          delete newModifiedRows[index][params.field]
        }
      }
      setModifiedRows(newModifiedRows)
    }
  }
  
  function handleSelectionModelChange(params) {
    console.log(params.selectionModel)
    setSelectedIds(params.selectionModel)
  }
  
  function showStates() {
    console.log('rows', rows)
    console.log('modifiedRows', modifiedRows)
    console.log('modifiedIds', modifiedIds)
    console.log('selectedIds', selectedIds)
    console.log('selected', selected)
  }
  
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
            startIcon={<CloudDownloadIcon />}
            onClick={() => doList()}
            >Init
          </Button>
          <IconButton 
            aria-label="Add" 
            color="primary"
            onClick={() => addRow()}
          >
            <AddCircleIcon fontSize="large" />
          </IconButton>
          <IconButton 
            aria-label="Push" 
            color="primary"
            onClick={() => putRows()}
            disabled={!selected}
          >
            <CloudUploadIcon fontSize="large" />
          </IconButton>
          <IconButton 
            aria-label="Push" 
            color="primary"
            onClick={() => deleteRows()}
            disabled={!selected}
          >
            <Delete fontSize="large" />
          </IconButton>
          <IconButton 
            aria-label="Debug" 
            color="primary"
            onClick={() => showStates()}
          >
            <InfoIcon />
          </IconButton>
        </Box>
          <DataGrid 
            rows={rows} 
            columns={columns}
            onEditCellChangeCommitted={handleEditCellChangeCommitted}
            onSelectionModelChange={handleSelectionModelChange}
            pageSize="10"
            components={{
              Toolbar: CustomToolbar,
            }}
            checkboxSelection
            disableSelectionOnClick
          />
      </Container>
    </React.Fragment> 
  );
}

export default Editor


