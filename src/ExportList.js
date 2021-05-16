import React from 'react';
import { graphqlOperation, API } from 'aws-amplify';
import { listCrossStackReferences } from './graphql/queries';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Collapse from '@material-ui/core/Collapse';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Popover from '@material-ui/core/Popover';
import { v4 as uuidv4 } from 'uuid';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  container: {
    margin: theme.spacing(3, 0),
  },
}))

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
})

function ValPopover(props) {
  const { row } = props;
  const [anchorElement, setAnchorElement] = useState(null);
  
  const showFullValueOnPopper = (event) => {
    setAnchorElement(event.currentTarget)
  }

  const hidePopper = () => {
    setAnchorElement(null)
  }
  
  const id = uuidv4()
  const open = Boolean(anchorElement)
  
  let shortened = row.value.substring(0, 20)
  if (20 <= row.value.length) {
    shortened += '...'
  }
  
  return (
    <React.Fragment>
      <Link aria-describedby={id} onClick={showFullValueOnPopper}>
        {shortened}
      </Link>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorElement}
        onClose={hidePopper}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <div style={{ padding: 20 }}>{row.value}</div>
      </Popover>
    </React.Fragment>
  )
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  
  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          {row.imports.length ? 
            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          :
            ''
          }
        </TableCell>
        <TableCell>{row.name.substring(0, 60)}</TableCell>
        <TableCell>{row.stack.split('/')[1]}</TableCell>
        <TableCell><ValPopover row={row} /></TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Import Stack Name
              </Typography>
              <Table size="small">
                <TableBody>
                  {row.imports.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}

function ExportList() {
  const classes = useStyles();
  
  const [exportList, setExportList] = useState([]);
  
  async function doListCrossStackReferences() {
    try {
      const response = await API.graphql(graphqlOperation(listCrossStackReferences));
      console.log(response)
      setExportList(response.data.listCrossStackReferences)
    } catch (err) { console.log('error doListCrossStackReferences') }
  }

  return (
    <React.Fragment>
      <Button
        variant="contained" color="primary"
        onClick={() => doListCrossStackReferences()}
        >List
      </Button>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Imports</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Stack</TableCell>
              <TableCell>Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {exportList.map((row, index) => (
              <Row key={index} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>  
  );
}

export default ExportList
