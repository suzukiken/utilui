import React, { useEffect, useState } from 'react';
import Amplify, { Auth, Hub } from 'aws-amplify';
import { Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  link: {
    margin: theme.spacing(1, 1.5),
  }
}))

function Login() {
  const classes = useStyles();
  
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
      switch (event) {
        case 'signIn':
          console.log('signIn');
          break;
        case 'signOut':
          console.log('signOut');
          setUser(null);
          break;
        case 'signIn_failure':
          console.log('signIn_failure');
          break;
        default:
          console.log('default');
      }
    });
    getUser().then(userData => setUser(userData));
  }, []);
  
  useEffect(() => {
    if (user) {
      Auth.currentUserInfo().then((userInfoData) => {
        console.log('userinfo', userInfoData)
        setUserInfo(userInfoData);
      });
    }
  }, [user]);

  function getUser() {
    return Auth.currentAuthenticatedUser()
      .then(userData => {
        console.log('userData', userData)
        console.log(userData.attributes.email)
        const jwtToken = userData.signInUserSession.idToken.jwtToken
        setJwt(jwtToken)
        const jwtTokenPayload = JSON.parse(window.atob(jwtToken.split('.')[1]))
        console.log(jwtTokenPayload['cognito:username'])
        console.log(jwtTokenPayload['email'])
        return userData
      })
      .catch(() => console.log('Not signed in'));
  }
  
  return (
    <React.Fragment>
      <nav>
        <Typography className={classes.link}>
          User: {userInfo ? userInfo.attributes.email : 'None'}
        </Typography>
      </nav>
      { user?
        <Button variant="contained"
          onClick={() => Auth.signOut()}
          >Sign Out
        </Button>
        :
        <Button color="primary" variant="outlined" className={classes.link}
          onClick={() => Auth.federatedSignIn()}
          >Sign In
        </Button>
      }
    </React.Fragment>
  )
}

export default Login