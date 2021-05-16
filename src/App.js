import React from 'react';
import Login from './Login';
import Jwt from './Jwt';
import ExportList from './ExportList';
import Diction from './Diction';
import Strings from './Strings';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.grey[200],
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  cardHeader: {
    backgroundColor: theme.palette.grey[300],
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2),
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
  paper: {
    padding: theme.spacing(2),
    margin: theme.spacing(10, 0),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}))

export default function App() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
            FigmentResearch
          </Typography>
          <Login />
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" component="main">
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <Paper className={classes.paper}>
              <Link href="/jwt">
                jwt
              </Link>
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className={classes.paper}>
              <Link href="/table">
                table
              </Link>
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className={classes.paper}>
              <Link href="/datagrid">
                datagrid
              </Link>
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className={classes.paper}>
              <Link href="/tree">
                tree
              </Link>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <BrowserRouter>
        <Switch>
          <Route path="/jwt">
            <Jwt />
          </Route>
          <Route path="/table">
            <Container maxWidth="lg" component="main" className={classes.container}>
              <ExportList />
            </Container>
          </Route>
          <Route path="/datagrid">
            <Container maxWidth="lg" component="main" className={classes.container}>
              <Strings />
            </Container>
          </Route>
          <Route path="/tree">
            <Diction />
          </Route>
        </Switch>
      </BrowserRouter>
    </React.Fragment>
  );
}

