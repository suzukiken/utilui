import React from 'react';
import { UserProvider } from './UserContext';
import Login from './Login';
import Jwt from './Jwt';
import Search from './Search';
import Notify from './Notify';
import ExportList from './ExportList';
import Editor from './Editor';
import Articles from './Articles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import './App.css';

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
  toolbarLink: {
    margin: theme.spacing(0, 1.5),
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
    <UserProvider>
      <React.Fragment>
        <CssBaseline />
        <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
          <Toolbar className={classes.toolbar}>
            <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
              <Link href="/" color="inherit">
                FigmentResearch
              </Link>
            </Typography>
            <Link href="/jwt" className={classes.toolbarLink}>
              JWT
            </Link>
            <Link href="/table" className={classes.toolbarLink}>
              CFN
            </Link>
            <Link href="/editor" className={classes.toolbarLink}>
              EDITOR
            </Link>
            <Link href="/notify" className={classes.toolbarLink}>
              NOTIFY
            </Link>
            <Link href="/search" className={classes.toolbarLink}>
              SEARCH
            </Link>
            <Link href="/articles" className={classes.toolbarLink}>
              ARTICLES
            </Link>
            <Login />
          </Toolbar>
        </AppBar>
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
            <Route path="/editor">
              <Editor />
            </Route>
            <Route path="/search">
              <Search />
            </Route>
            <Route path="/notify">
              <Notify />
            </Route>
            <Route path="/articles">
              <Articles />
            </Route>
            <Route path="/article/:id">
              <Articles />
            </Route>
          </Switch>
        </BrowserRouter>
      </React.Fragment>
    </UserProvider>
  );
}

//  children={<Articles />}