import { graphqlOperation, API } from 'aws-amplify';
import { parseJwt } from './graphql/queries';
import { Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import { useState } from 'react';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  heroContent: {
    padding: theme.spacing(4, 0, 6),
  },
}))

function Jwt() {
  const classes = useStyles();
  const [claims, setClaims] = useState(null);
  
  async function doParseJwt() {
    try {
      const response = await API.graphql(graphqlOperation(parseJwt));
      console.log(response)
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
      <Container maxWidth="lg" component="main" className={classes.heroContent}>
        <Button
          variant="contained" color="primary"
          onClick={() => doParseJwt()}
          >Put
        </Button>
        { claims ? 
          <List className={classes.root}>
            <ListItem alignItems="flex-start">
              <ListItemText
                primary="at_hash"
              />
              <ListItemText
                primary={claims.at_hash}
              />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start">
              <ListItemText
                primary="sub"
              />
              <ListItemText
                primary={claims.sub}
              />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start">
              <ListItemText
                primary="cognito_groups.0"
              />
              <ListItemText
                primary={claims.cognito_groups[0]}
              />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start">
              <ListItemText
                primary="email_verified"
              />
              <ListItemText
                primary={claims.email_verified}
              />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start">
              <ListItemText
                primary="iss"
              />
              <ListItemText
                primary={claims.iss}
              />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start">
              <ListItemText
                primary="cognito_username"
              />
              <ListItemText
                primary={claims.cognito_username}
              />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start">
              <ListItemText
                primary="aud"
              />
              <ListItemText
                primary={claims.aud}
              />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start">
              <ListItemText
                primary="identities.0.userId"
              />
              <ListItemText
                primary={claims.identities[0].userId}
              />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start">
              <ListItemText
                primary="identities.0.providerName"
              />
              <ListItemText
                primary={claims.identities[0].providerName}
              />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start">
              <ListItemText
                primary="identities.0.providerType"
              />
              <ListItemText
                primary={claims.identities[0].providerType}
              />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start">
              <ListItemText
                primary="identities.0.issuer"
              />
              <ListItemText
                primary={claims.identities[0].issuer}
              />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start">
              <ListItemText
                primary="identities.0.primary"
              />
              <ListItemText
                primary={claims.identities[0].primary}
              />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start">
              <ListItemText
                primary="identities.0.dateCreated"
              />
              <ListItemText
                primary={claims.identities[0].dateCreated}
              />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start">
              <ListItemText
                primary="token_use"
              />
              <ListItemText
                primary={claims.token_use}
              />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start">
              <ListItemText
                primary="auth_time"
              />
              <ListItemText
                primary={claims.auth_time}
              />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start">
              <ListItemText
                primary="exp"
              />
              <ListItemText
                primary={claims.exp}
              />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start">
              <ListItemText
                primary="iat"
              />
              <ListItemText
                primary={claims.iat}
              />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start">
              <ListItemText
                primary="email"
              />
              <ListItemText
                primary={claims.email}
              />
            </ListItem>
          </List>
        : '' }
      </Container>
    </React.Fragment>
  )
}

export default Jwt

