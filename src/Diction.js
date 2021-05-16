import React from 'react';
import { graphqlOperation, API } from 'aws-amplify';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import { getDiction } from './graphql/queries';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles((theme) => ({

}))

function Diction() {
  const classes = useStyles();
  
  const [diction, setDiction] = useState({});

  async function doGetDiction() {
    try {
      const response = await API.graphql(graphqlOperation(getDiction));
      setDiction(response.data.getDiction);
      console.log(response)
    } catch (err) { console.log('error doGetDiction') }
  }

  return (
    <React.Fragment>
      <Container maxWidth="lg" className={classes.container}>
        <Button
          variant="contained" color="primary"
          onClick={() => doGetDiction()}
          >Get Dictionary
        </Button>
        <Card className={classes.root}>
          <CardContent>
            <table className="table">
              <thead>
                <tr>
                  <th>Key</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>number</td><td>{diction.number}</td></tr>
                <tr><td>kanji</td><td>{diction.kanji}</td></tr>
                <tr><td>english</td><td>{diction.english}</td></tr>
                <tr><td>katakana</td><td>{diction.katakana}</td></tr>
              </tbody>
            </table>
          </CardContent>
        </Card>
      </Container>
    </React.Fragment>  
  );
}

export default Diction
