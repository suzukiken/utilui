import React, { useEffect, useState } from 'react';
import Amplify, { Auth, Hub } from 'aws-amplify';
import { Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useUserContext } from './UserContext';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  user: {
    margin: theme.spacing(1),
  },
  signButton: {
    margin: theme.spacing(1),
  }
}))

function UserInfo(props) {
  const classes = useStyles();
  if (props.userInfo) {
    return (
      <nav>
        <Typography className={classes.user}>
          User: {props.userInfo.attributes.email}
        </Typography>
      </nav>
    )
  }
  return (null)
}

function Login() {
  const classes = useStyles();
  const { setUserContext } = useUserContext()
  
  const [user, setUser] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [jwt, setJwt] = useState(null);
  
  Amplify.configure({
    API: {
      graphql_headers: jwtRequestHeader
    }
  })
  
  async function jwtRequestHeader() {
    return { 'v-cognito-user-jwt': jwt }
  }

  useEffect(() => {
    Hub.listen('auth', ({ payload: { event, data } }) => {
      if (event === 'signIn') {
        getUser().then(userData => setUser(userData));
      } else if (event === 'signOut') {
        setUser(null);
      }
    })
    getUser().then(userData => setUser(userData));
  }, [])
  
  useEffect(() => {
    if (user) {
      Auth.currentUserInfo().then((userInfoData) => {
        console.log('userinfo', userInfoData)
        setUserInfo(userInfoData)
      })
    }
  }, [user])
  
  useEffect(() => {
    if (user) {
      const jwtToken = user.signInUserSession.idToken.jwtToken
      setJwt(jwtToken)
    }
  }, [user])
  
  useEffect(() => {
    if (user) {
      setUserContext({authenticated: true})
    }
  }, [user, setUserContext])

  function getUser() {
    return Auth.currentAuthenticatedUser()
      .then(userData => {
        return userData
      })
      .catch(() => console.log('Not signed in'));
  }
  
  return (
    <React.Fragment>
      <UserInfo userInfo={userInfo} />
      <Box className={classes.signButton}>
        { user?
          <Button 
            variant="outlined"
            onClick={() => Auth.signOut()}
            >Sign Out
          </Button>
          :
          <Button 
            color="primary" 
            variant="contained"
            onClick={() => Auth.federatedSignIn()}
            >Sign In
          </Button>
        }
      </Box>
    </React.Fragment>
  )
}

export default Login