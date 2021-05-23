import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  heroContent: {
    padding: theme.spacing(6, 0),
  },
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 800,
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
}))


function Search() {
  const classes = useStyles();
  const [checked, setChecked] = React.useState({
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
        <Paper component="form" className={classes.root}>
          <IconButton className={classes.iconButton} aria-label="menu">
            <MenuIcon />
          </IconButton>
          <InputBase
            className={classes.input}
            placeholder="Search Google Maps"
            inputProps={{ 'aria-label': 'search google maps' }}
          />
          <IconButton type="submit" className={classes.iconButton} aria-label="search">
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
    </div>
  )
}

export default Search


