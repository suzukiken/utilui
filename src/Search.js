import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
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
import TableRow from '@material-ui/core/TableRow';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, connectSearchBox, connectHits } from 'react-instantsearch-dom';
import Link from '@material-ui/core/Link';

const searchClient = algoliasearch('8JKRPB5KDB', '02b5bfae746c4433d6fdb918664cbe18');

const CustomSearchBox = connectSearchBox(MaterialUiSearchBox);
const CustomHits = connectHits(MaterialUiHits);


const useStyles = makeStyles((theme) => ({
  heroContent: {
    padding: theme.spacing(6, 0),
  },
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 600,
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
  },
  title: {
    margin: theme.spacing(1),
  }
}))

function Search() {
  const classes = useStyles();
  
  return (
    <div>
      <Container maxWidth="sm" component="main" className={classes.heroContent}>
        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
          Search
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" component="p">
          by Algolia
        </Typography>
      </Container>
      <InstantSearch searchClient={searchClient} indexName="articles">
        <Box display="flex" justifyContent="center">
          <CustomSearchBox className="searchbox" />
        </Box>
        <Container maxWidth="md" component="main" className={classes.heroContent}>
          <TableContainer component={Paper} className={classes.tableContainer}>
            <Table aria-label="simple table">
              <CustomHits />
            </Table>
          </TableContainer>
        </Container>
      </InstantSearch>
    </div>
  )
}

function MaterialUiSearchBox({currentRefinement, isSearchStalled, refine}) {
  const classes = useStyles();
  
  const [checked, setChecked] = useState({
    b: true,
    c: false,
  });
  
  function handleChange(handleChange) {
    console.log(handleChange)
    const newChecked = {...checked}
    newChecked[handleChange.target.value] = !newChecked[handleChange.target.value]
    setChecked(newChecked)
  }
  
  return (
    <Paper className={classes.root}>
      <IconButton className={classes.iconButton} aria-label="search">
        <SearchIcon />
      </IconButton>
      <InputBase
        className={classes.input}
        placeholder="Search…"
        inputProps={{ "aria-label": "search" }}
        value={currentRefinement}
        onChange={(e) => refine(e.target.value)}
        searchAsYouType={false}
      />
      <Divider className={classes.divider} orientation="vertical" mr={2} />
      <Box>
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
  )
}

function createMarkup(val) {
  return {__html: val}
}

function MaterialUiHits({ hits }) {
  const classes = useStyles();
  
  function handleClick(hit) {
    window.open('/article/' + hit.filename)
  }

  return (
    <TableBody>
      {hits.map(hit => (
        <TableRow key={hit.objectID}>
          <TableCell>
            <Typography
              component="div"
              color="textPrimary"
              className={classes.title}
            >
              <Link href="#" onClick={() => handleClick(hit)}>
                <Box
                  dangerouslySetInnerHTML={createMarkup(hit._highlightResult.title.value)} 
                />
              </Link>
            </Typography>
            <Box 
              className={classes.title}
              dangerouslySetInnerHTML={createMarkup(hit._highlightResult.content.value.substring(0, 500) + "...")} 
            />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  )
}

export default Search

