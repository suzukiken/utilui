import React, { useEffect, useState } from 'react';
import Amplify, { Auth, Hub } from 'aws-amplify';

function Login() {
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
    <div className="navbar-end">
      <div className="navbar-item">
        <div className="block">
          User: <strong>{userInfo ? userInfo.attributes.email : 'None'}</strong>
        </div>
      </div>
      <div className="navbar-item">
        <div className="buttons">
          { user?
            <button 
              className="button is-link"
              onClick={() => Auth.signOut()}
              >Sign Out
            </button>
          :
            <button 
              className="button is-link"
              onClick={() => Auth.federatedSignIn()}
              >Sign In
            </button>
          }
        </div>
      </div>
    </div>
  )
}

export default Login