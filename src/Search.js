import { graphqlOperation, API } from 'aws-amplify';
import { listProducts, searchProductPhrase } from './graphql/queries';
import { useState, useEffect } from 'react';
import { useUserContext } from './UserContext';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-dom';

const searchClient = algoliasearch('8JKRPB5KDB', '02b5bfae746c4433d6fdb918664cbe18');

function Search() {
  return (
    <InstantSearch searchClient={searchClient} indexName="articles">
      <SearchBox />
      <Hits />
    </InstantSearch>
  )
}

/*
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
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: theme.spacing(0, 2, 0, 0),
  },
  tableContainer: {
    margin: theme.spacing(2, 0, 10),
  }
}))


function Search() {
  const classes = useStyles();
  const [inputText, setInputText] = useState("")
  const [products, setProducts] = useState([])
  const [checked, setChecked] = useState({
    a: false,
    b: false,
    c: false,
  });
  
  function handleChange(handleChange) {
    console.log(handleChange)
    const newChecked = {...checked}
    newChecked[handleChange.target.value] = !newChecked[handleChange.target.value]
    setChecked(newChecked)
  }
  
  async function doSearch() {
    try {
      const response = await API.graphql(graphqlOperation(searchProductPhrase, {title: inputText}));
      console.log(response)
      setProducts(response.data.searchProductPhrase)
    } catch (err) { console.log('error doSearch') }
  }
  
  async function doList() {
    try {
      const response = await API.graphql(graphqlOperation(listProducts));
      console.log(response)
      setProducts(response.data.listProducts)
    } catch (err) { console.log('error doList') }
  }
  
  function handleInputChange(event) {
    console.log(event)
    setInputText(event.target.value)
    doSearch()
  }

  return (
    <div>
      <Container maxWidth="sm" component="main" className={classes.heroContent}>
        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
          Search
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" component="p">
          Search Elastic Search
        </Typography>
      </Container>
      <Box display="flex" justifyContent="center">
        <Paper className={classes.root}>
          <IconButton className={classes.iconButton} aria-label="menu" onClick={doList}>
            <MenuIcon />
          </IconButton>
          <InputBase
            className={classes.input}
            placeholder="Search"
            inputProps={{ 'aria-label': 'search' }}
            onChange={handleInputChange}
            value={inputText}
            onKeyDown={e => {
              if (e.keyCode === 13) {
                console.log(e.target.value);
                doSearch(e)
              }
            }}
          />
          <IconButton className={classes.iconButton} aria-label="search" onClick={doSearch}>
            <SearchIcon />
          </IconButton>
          <Divider className={classes.divider} orientation="vertical" mr={2} />
          <Box>
            <FormControlLabel
              control={
                <Switch
                  checked={checked.a}
                  onChange={handleChange}
                  name="checkedA"
                  color="Primary"
                  value='a'
                />
              }
              label="Title"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={checked.b}
                  onChange={handleChange}
                  name="checkedB"
                  color="Primary"
                  value='b'
                />
              }
              label="Body"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={checked.c}
                  onChange={handleChange}
                  name="checkedC"
                  color="Primary"
                  value='c'
                />
              }
              label="Discontinued"
            />
          </Box>
        </Paper>
      </Box>
      <Container maxWidth="sm" component="main" className={classes.heroContent}>
        <TableContainer component={Paper} className={classes.tableContainer}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Title</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.title}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  )
}
*/
export default Search


