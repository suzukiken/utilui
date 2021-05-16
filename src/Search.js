import React from 'react';
import { graphqlOperation, API } from 'aws-amplify';
import { listCrossStackReferences } from './graphql/queries';
import { useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Fuse from 'fuse.js';
import InfoIcon from '@material-ui/icons/Info';
import Popover from '@material-ui/core/Popover';
import Link from '@material-ui/core/Link';

function InfoPopover() {
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
      <Link aria-describedby={id} onClick={show}>
        <InfoIcon />
        how to search
      </Link>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorElement}
        onClose={hide}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <div style={{ padding: 20 }}>
          <table>
            <thead>
              <tr>
                <th>Token</th>
                <th>Match type</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>jscript</code></td>
                <td>fuzzy-match</td>
                <td>Items that fuzzy match <code>jscript</code></td>
              </tr>
              <tr>
                <td><code>=scheme</code></td>
                <td>exact-match</td>
                <td>Items that are <code>scheme</code></td>
              </tr>
              <tr>
                <td><code>'python</code></td>
                <td>include-match</td>
                <td>Items that include <code>python</code></td>
              </tr>
              <tr>
                <td><code>!ruby</code></td>
                <td>inverse-exact-match</td>
                <td>Items that do not include <code>ruby</code></td>
              </tr>
              <tr>
                <td><code>^java</code></td>
                <td>prefix-exact-match</td>
                <td>Items that start with <code>java</code></td>
              </tr>
              <tr>
                <td><code>!^earlang</code></td>
                <td>inverse-prefix-exact-match</td>
                <td>Items that do not start with <code>earlang</code></td>
              </tr>
              <tr>
                <td><code>.js$</code></td>
                <td>suffix-exact-match</td>
                <td>Items that end with <code>.js</code></td>
              </tr>
              <tr>
                <td><code>!.go$</code></td>
                <td>inverse-suffix-exact-match</td>
                <td>Items that do not end with <code>.go</code></td>
              </tr>
            </tbody>
          </table>
        </div>
      </Popover>
    </React.Fragment>
  )
}

function Search() {

  const [exportList, setExportList] = useState([]);
  const [showingList, setShowingList] = useState([]);
  const [searchWord, setSearchWord] = useState([]);
  
  async function doListCrossStackReferences() {
    try {
      const response = await API.graphql(graphqlOperation(listCrossStackReferences));
      console.log(response)
      setExportList(response.data.listCrossStackReferences)
      setShowingList(response.data.listCrossStackReferences)
    } catch (err) { console.log('error doListCrossStackReferences') }
  }
  
  const options = {
    keys: ['name']
  }
  
  const fuse = new Fuse(exportList, options)
  
  function search(event) {
    setSearchWord(event.target.value)
    console.log(searchWord)
    const result = fuse.search(searchWord)
    const searchedList = []
    for (let i=0; i<result.length; i++) {
      searchedList.push(result[i].item)
    }
    setShowingList(searchedList)
  }
  
  function openSearchInfo() {
    console.log('openSearchInfo')
  }
  
  return (
    <React.Fragment>
      <Button
        variant="contained" color="primary"
        onClick={() => doListCrossStackReferences()}
        >List
      </Button>
      
      <form noValidate autoComplete="off">
        <TextField id="sw" label="Search" variant="outlined" value={searchWord} onChange={search} />
        <InfoPopover />
      </form>
      
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Stack</TableCell>
              <TableCell>Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {showingList.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.name.substring(0, 60)}</TableCell>
                <TableCell>{item.stack.split('/')[1]}</TableCell>
                <TableCell>{item.value.substring(0, 60)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>  
  );
}

export default Search
