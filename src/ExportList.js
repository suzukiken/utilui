import React from 'react';
import { graphqlOperation, API } from 'aws-amplify';
import { listCrossStackReferences } from './graphql/queries';
import { useState, useEffect } from 'react';
import { useUserContext } from './UserContext';
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
import Badge from '@material-ui/core/Badge';
import Fuse from 'fuse.js';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  heroContent: {
    padding: theme.spacing(4, 0, 4),
  },
  container: {
    margin: theme.spacing(3, 0),
  },
  howto: {
    margin: theme.spacing(0, 2),
  },
  controlls: {
    margin: theme.spacing(4, 0, 1),
  },
  tableContainer: {
    margin: theme.spacing(2, 0, 10),
  }
}))

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
})

function InfoPopover() {
  const classes = useStyles();
  const [anchorElement, setAnchorElement] = useState(null);
  
  const show = (event) => {
    setAnchorElement(event.currentTarget)
  }

  const hide = () => {
    setAnchorElement(null)
  }
  
  const id = 'info'
  const open = Boolean(anchorElement)
  
  return (
    <React.Fragment>
      <Link className={classes.howto} aria-describedby={id} onClick={show}>
        how to search 
      </Link>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorElement}
        onClose={hide}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <Box p={3}>
          <TableContainer>
            <Table size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>Token</TableCell>
                  <TableCell>Match type</TableCell>
                  <TableCell>Description</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell><code>jscript</code></TableCell>
                  <TableCell>fuzzy-match</TableCell>
                  <TableCell>Items that fuzzy match <code>jscript</code></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><code>=scheme</code></TableCell>
                  <TableCell>exact-match</TableCell>
                  <TableCell>Items that are <code>scheme</code></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><code>'python</code></TableCell>
                  <TableCell>include-match</TableCell>
                  <TableCell>Items that include <code>python</code></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><code>!ruby</code></TableCell>
                  <TableCell>inverse-exact-match</TableCell>
                  <TableCell>Items that do not include <code>ruby</code></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><code>^java</code></TableCell>
                  <TableCell>prefix-exact-match</TableCell>
                  <TableCell>Items that start with <code>java</code></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><code>!^earlang</code></TableCell>
                  <TableCell>inverse-prefix-exact-match</TableCell>
                  <TableCell>Items that do not start with <code>earlang</code></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><code>.js$</code></TableCell>
                  <TableCell>suffix-exact-match</TableCell>
                  <TableCell>Items that end with <code>.js</code></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><code>!.go$</code></TableCell>
                  <TableCell>inverse-suffix-exact-match</TableCell>
                  <TableCell>Items that do not end with <code>.go</code></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Popover>
    </React.Fragment>
  )
}

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
              {open ? 
                <Badge badgeContent={row.imports.length} color="primary">
                  <KeyboardArrowUpIcon /> 
                </Badge>
                : 
                <Badge badgeContent={row.imports.length} color="primary">
                  <KeyboardArrowDownIcon />
                </Badge>
              }
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
  const { userContext } = useUserContext()
  
  const [exportList, setExportList] = useState([]);
  const [showingList, setShowingList] = useState([]);
  const [searchWord, setSearchWord] = useState([]);
  
  useEffect(() => {
    if (userContext && userContext.authenticated) {
      doListCrossStackReferences()
    }
  }, [userContext])
  
  async function doListCrossStackReferences() {
    try {
      const response = await API.graphql(graphqlOperation(listCrossStackReferences));
      console.log(response)
      setExportList(response.data.listCrossStackReferences)
      setShowingList(response.data.listCrossStackReferences)
    } catch (err) { console.log('error doListCrossStackReferences') }
  }
  
  const fuseOptions = {
    keys: ['name'],
    useExtendedSearch: true
  }
  
  const fuse = new Fuse(exportList, fuseOptions)
  
  function search(event) {
    setSearchWord(event.target.value)
    const result = fuse.search(searchWord)
    const searchedList = []
    for (let i=0; i<result.length; i++) {
      searchedList.push(result[i].item)
    }
    setShowingList(searchedList)
  }

  return (
    <React.Fragment>
    
      <Container maxWidth="lg" component="main" className={classes.heroContent}>
        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
          CloudFormation Exported Parameter List
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" component="p">
          See Parameters with its Importers.
        </Typography>
      </Container>
      
      <Box display="flex" justifyContent="center">
        <Button
          variant="contained" color="primary"
          onClick={() => doListCrossStackReferences()}
          >List
        </Button>
      </Box>
      <Box component="div" className={classes.controlls}>
        <form noValidate autoComplete="off">
          <TextField id="sw" label="Search" variant="outlined" size="small" value={searchWord} onChange={search} />
          <InfoPopover />
        </form>
      </Box>

      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Imports</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Stack</TableCell>
              <TableCell>Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {showingList.map((row, index) => (
              <Row key={index} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
}

export default ExportList
