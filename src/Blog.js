import * as React from 'react';
import { useState, useEffect } from 'react';
import { useUserContext } from './UserContext';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

const useStyles = makeStyles((theme) => ({
  heroContent: {
    padding: theme.spacing(6, 0, 6),
  },
  container: {
    flexGrow: 1
  },
  blogTag: {
    margin: theme.spacing(4, 0, 0.6)
  },
  blogContent: {
    margin: theme.spacing(2, 0, 0)
  },
  blogTitle: {
    margin: theme.spacing(0.3, 0, 0),
    fontFamily: "M PLUS 1p",
    fontStyle: 'normal',
    fontWeight: 'Thin',
    fontSize: 15,
    letterSpacing: 0.5,
    lineHeight: 1.7
  },
  blogDate: {
    margin: theme.spacing(0, 1),
    fontSize: 12,
  },
  root: {
    flexGrow: 1,
    margin: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  card: {
    minHeight: 180,
  }
}))

function Blog() {
  const classes = useStyles();
  const { userContext } = useUserContext()

  const [primary, setPrimary] = useState({});
  const [secodary, setSecondary] = useState([]);
  const [third, setThird] = useState([]);
  const [contents, setContents] = useState({});
  
  useEffect(() => {
    async function doFeature() {
      try {
        fetch('https://static.figment-research.com/summary-recom.json')
          .then(res => res.json())
          .then(result => {
            console.log(result)
            setPrimary(result.primary)
            setThird(result.third)
            setSecondary(result.secondary)
          }
        )
      } catch (err) {
        console.log('error doFeature')
      }
    }
    async function doGet() {
      try {
        fetch('https://static.figment-research.com/summary-tag.json')
          .then(res => res.json())
          .then(result => {
            console.log(result)
            setContents(result)
          }
        )
      } catch (err) {
        console.log('error doGet')
      }
    }
    if (userContext && userContext.authenticated) {
      doGet()
      doFeature()
    }
  }, [userContext])
  
  return (
    <React.Fragment> 
      <Container maxWidth="lg" component="main" className={classes.heroContent}>
        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
          Blog Categories
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" component="p">
          See.
        </Typography>
      </Container>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          {secodary.map((item, index) => (
            <Grid item xs={6}>
              <CardActionArea component="a" href="#" key={index}>
                <Card className={classes.card}>
                  <div className={classes.cardDetails}>
                    <CardContent>
                      <Typography component="h2" variant="h5">
                        {item.title}
                      </Typography>
                      <Typography variant="subtitle1" color="textSecondary">
                        {item.date}
                      </Typography>
                      <Typography variant="subtitle1" paragraph>
                        {item.filename}
                      </Typography>
                    </CardContent>
                  </div>
                </Card>
              </CardActionArea>
            </Grid>
          ))}
          {third.map((item, index) => (
            <Grid item xs={4}>
              <CardActionArea component="a" href="#" key={index}>
                <Card className={classes.card}>
                  <div className={classes.cardDetails}>
                    <CardContent>
                      <Typography component="h2" variant="h5">
                        {item.title}
                      </Typography>
                      <Typography variant="subtitle1" color="textSecondary">
                        {item.date}
                      </Typography>
                      <Typography variant="subtitle1" paragraph>
                        {item.filename}
                      </Typography>
                    </CardContent>
                  </div>
                </Card>
              </CardActionArea>
            </Grid>
          ))}
          <Grid item xs={12}>
            <CardActionArea component="a" href="#">
              <Card className={classes.card}>
                <div className={classes.cardDetails}>
                  <CardContent>
                    <Typography component="h2" variant="h5">
                      {primary.title}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                      {primary.date}
                    </Typography>
                    <Typography variant="subtitle1" paragraph>
                      {primary.filename}
                    </Typography>
                  </CardContent>
                </div>
              </Card>
            </CardActionArea>
          </Grid>
        </Grid>
      </Container>
      <Container maxWidth="sm" className={classes.container}>
        {Object.keys(contents).map((key, index1) => (
          <React.Fragment key={index1}> 
            <Box className={classes.blogTag}>
              <Typography variant="h6" align="left">
                {key}
              </Typography>
            </Box>
            {contents[key].map((article, index2) => (
              <Box key={index2} className={classes.blogTitle}>
                <div>
                  {article.title}
                  <span className={classes.blogDate}>{article.date}</span>
                </div>
              </Box>
            ))}
          </React.Fragment> 
        ))}
      </Container>
    </React.Fragment> 
  );
}

export default Blog

/*

*/