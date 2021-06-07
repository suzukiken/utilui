import * as React from 'react';
import { useState, useEffect } from 'react';
import { useUserContext } from './UserContext';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { graphqlOperation, API } from 'aws-amplify';
import { getArticle, listArticles } from './graphql/queries';
import Markdown from 'markdown-to-jsx';
import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  heroContent: {
    padding: theme.spacing(6, 0, 6),
  },
  container: {
    flexGrow: 1
  },
  blogTitle: {
    margin: theme.spacing(4, 0, 0)
  },
  blogContent: {
    margin: theme.spacing(2, 0, 0)
  }
}))

function Articles() {
  const classes = useStyles();
  const { userContext } = useUserContext()
  
  let { id } = useParams();
  
  const [contents, setContents] = useState([]);
  
  useEffect(() => {
    async function doGet(key) {
      try {
        const response = await API.graphql(graphqlOperation(getArticle, {id: "blog/" + key}));
        console.log(response.data.getArticle)
        setContents([...contents, response.data.getArticle])
      } catch (err) {
        console.log('error doGet') 
      }
    }
    if (userContext && userContext.authenticated) {
      if (id) {
        doGet(id)
      } else {
        doListArticles().then(data => setContents(data))
      }
    }
  }, [id, userContext])
  
  function doListArticles() {
    console.log('doListArticles')
    return API.graphql(graphqlOperation(listArticles, {limit: 10}))
      .then(response => {
        return response.data.listArticles
      })
      .catch(() => console.log('error listArticles'))
  }
  
  return (
    <React.Fragment> 
      <Container maxWidth="lg" component="main" className={classes.heroContent}>
        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
          Markdown Rendering
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" component="p">
          See.
        </Typography>
      </Container>
      <Container maxWidth="sm" className={classes.container}>
        {contents.map((blog, index) => (
          <React.Fragment key={index}> 
            <Box className={classes.blogTitle}>
              <Typography variant="h5" align="left">
                {blog.title}
              </Typography>
            </Box>
            <Box display="flex" justifyContent="left" className={classes.blogContent}>
              <Markdown>
                {blog.content}
              </Markdown>
            </Box>
          </React.Fragment> 
        ))}
      </Container>
    </React.Fragment> 
  );
}

export default Articles
