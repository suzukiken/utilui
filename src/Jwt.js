import { graphqlOperation, API } from 'aws-amplify';
import { parseJwt } from './graphql/queries';
import { Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import { useState, useEffect } from 'react';
import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import { useUserContext } from './UserContext';
import jwt_decode from "jwt-decode";

const useStyles = makeStyles((theme) => ({
  heroContent: {
    padding: theme.spacing(4, 0, 2),
  },
  tableContainer: {
    margin: theme.spacing(6, 0, 10),
  }
}))

function Jwt() {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [claims, setClaims] = useState(null);
  
  const { userContext } = useUserContext()
  
  useEffect(() => {
    if (userContext && userContext.authenticated) {
      const jwtIdToken = userContext.user.signInUserSession.idToken.jwtToken
      console.log(new Date(jwt_decode(jwtIdToken).exp * 1000))
      const jwtAccessToken = userContext.user.signInUserSession.accessToken.jwtToken
      console.log(jwt_decode(jwtAccessToken))
    }
  }, [userContext])
  
  async function doParseJwt() {
    try {
      setLoading(true)
      const response = await API.graphql(graphqlOperation(parseJwt));
      console.log(response)
      setLoading(false)
      setClaims(response.data.parseJwt)
    } catch (err) { console.log('error doParseJwt') }
  }
  
  return (
    <React.Fragment>
      <Container maxWidth="sm" component="main" className={classes.heroContent}>
        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
          JWT
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" component="p">
          Check if Jwt is on http header.
        </Typography>
      </Container>
      <Container maxWidth="md" component="main">
        <Box display="flex" justifyContent="center" m={2}>
          <Button
            variant="contained" color="primary"
            onClick={() => doParseJwt()}
            >Send
          </Button>
        </Box>
        { loading ? <LinearProgress /> : '' }
        { claims ? 
          <TableContainer component={Paper} className={classes.tableContainer}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Value</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>at_hash</TableCell>
                  <TableCell>{claims.at_hash}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>sub</TableCell>
                  <TableCell>{claims.sub}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>cognito_groups.0</TableCell>
                  <TableCell>{claims.cognito_groups[0]}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>email_verified</TableCell>
                  <TableCell>{claims.email_verified}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>iss</TableCell>
                  <TableCell>{claims.iss}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>cognito:username</TableCell>
                  <TableCell>{claims.cognito_username}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>aud</TableCell>
                  <TableCell>{claims.aud}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>identities.0.userId</TableCell>
                  <TableCell>{claims.identities[0].userId}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>identities.0.providerName</TableCell>
                  <TableCell>{claims.identities[0].providerName}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>identities.0.providerType</TableCell>
                  <TableCell>{claims.identities[0].providerType}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>identities.0.issuer</TableCell>
                  <TableCell>{claims.identities[0].issuer}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>identities.0.primary</TableCell>
                  <TableCell>{claims.identities[0].primary}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>identities.0.dateCreated</TableCell>
                  <TableCell>{claims.identities[0].dateCreated}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>token_use</TableCell>
                  <TableCell>{claims.token_use}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>auth_time</TableCell>
                  <TableCell>{claims.auth_time}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>exp</TableCell>
                  <TableCell>{claims.exp}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>iat</TableCell>
                  <TableCell>{claims.iat}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>email</TableCell>
                  <TableCell>{claims.email}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        : '' }
      </Container>
    </React.Fragment>
  )
}

export default Jwt

