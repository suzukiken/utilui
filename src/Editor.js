import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  heroContent: {
    padding: theme.spacing(4, 0, 4),
  },
  datagridContainer: {
    height: 500
  },
  button: {
    margin: theme.spacing(1),
  }
}))

const columns = [
  { field: 'name', headerName: 'Name', width: 180, editable: true },
  { field: 'age', headerName: 'Age', type: 'number', editable: true },
  {
    field: 'created',
    headerName: 'Created',
    type: 'date',
    width: 180,
    editable: true,
  }
]

const initialRows = [
  {
    id: 1,
    name: 'ken',
    age: 25,
    created: '2020/05/01',
  },
  {
    id: 2,
    name: 'tetu',
    age: 36,
    created: '2020/05/01',
  },
]

function Editor() {
  const classes = useStyles();
  
  const [rows, setRows] = useState(initialRows);
  
  function getLargestId() {
    let largestId = 0
    for (let i=0; i<rows.length; i++) {
      if (largestId < rows[i].id) {
        largestId = rows[i].id
      }
    }
    return largestId
  }
  
  function showRows() {
    console.log(rows)
  }
  
  function initRows() {
    setRows(initialRows)
  }
  
  function addRow() {
    console.log('addRow')
    let newRows = [...rows]
    const dt = new Date()
    const now = `${dt.getFullYear()}/${(dt.getMonth()+1)}/${dt.getDate()}`
    console.log(getLargestId())
    const newId = getLargestId() + 1
    newRows.push({
      id: newId,
      name: `name-${newId}`,
      age: 0,
      created: now,
    })
    setRows(newRows)
  }
  
  const handleEditRowModelChange = React.useCallback((params) => {
    console.log('handleEditRowModelChange', params)
  }, []);
  
  const handleEditCellChangeCommitted = React.useCallback(
    ({ id, field, props }) => {
      console.log('handleEditCellChangeCommitted', id)
      console.log('handleEditCellChangeCommitted', field)
      console.log('handleEditCellChangeCommitted', props)
    },
    [],
  );

  const handleEditCellChange = React.useCallback(
    ({ id, field, props }) => {
      console.log('handleEditCellChange', id)
      console.log('handleEditCellChange', field)
      console.log('handleEditCellChange', props)
    },
    [],
  );
  
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
      <Container maxWidth="sm" className={classes.datagridContainer}>
        <Box display="flex" justifyContent="center" m={2}>
          <Button className={classes.button}
            variant="contained" color="primary"
            onClick={() => addRow()}
            >Add
          </Button>
          <Button className={classes.button}
            variant="contained" color="primary"
            onClick={() => showRows()}
            >Show
          </Button>
          <Button className={classes.button}
            variant="contained" color="primary"
            onClick={() => initRows()}
            >Init
          </Button>
        </Box>
        <DataGrid 
          rows={rows} 
          columns={columns}
          onEditRowModelChange={handleEditRowModelChange}
          onEditCellChangeCommitted={handleEditCellChangeCommitted}
          onEditCellChange={handleEditCellChange}
        />
      </Container>
    </React.Fragment> 
  );
}

export default Editor


