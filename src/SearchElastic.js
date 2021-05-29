import { graphqlOperation, API } from 'aws-amplify';
import { searchBlogs } from './graphql/queries';
import { updateBlogLank } from './graphql/mutations';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import LinearProgress from '@material-ui/core/LinearProgress';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles((theme) => ({
  heroContent: {
    padding: theme.spacing(6, 0),
  },
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 700,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  blogTitle: {
    margin: theme.spacing(3, 0, 0),
  },
  blogContent: {
    margin: theme.spacing(0.5, 0, 0),
  },
  blogContainer: {
    padding: theme.spacing(5, 0),
  },
  slider: {
    width: 150
  }
}))

function SearchErastic() {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [inputText, setInputText] = useState("")
  const [articles, setArticles] = useState([])
  
  async function doSearch() {
    try {
      setLoading(true)
      const response = await API.graphql(graphqlOperation(searchBlogs, {
        input: {
          word: inputText,
          fuzziness: Math.ceil(inputText.length / 6 - 1)
        }
      }));
      setLoading(false)
      console.log(response)
      setArticles(response.data.searchBlogs)
    } catch (err) { console.log('error doSearch') }
  }
  
  function handleInputChange(event) {
    console.log(event)
    setInputText(event.target.value)
    // doSearch()
  }
  
  async function handleSlideChange(event, id) {
    console.log(handleSlideChange, event, id)
    try {
      const response = await API.graphql(graphqlOperation(updateBlogLank, {
        input: {
          id: id,
          lank: parseInt(event.target.ariaValueNow)
        }
      }));
      console.log(response)
    } catch (err) { console.log('error doSearch') }
  }
  
  function HighlightedContent(props) {
    let contents = ''
    if (props.highlight.content) {
      for (let i in props.highlight.content) {
        contents += '.....' + props.highlight.content[i] + '.....'
      }
    }
    return (
      <Box className={classes.blogContent} dangerouslySetInnerHTML={{__html: contents}} />  
    )
  }

  return (
    <div>
      <Container maxWidth="md" component="main" className={classes.heroContent}>
        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
          Search
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" component="p">
          Search by AWS Elasticsearch Service 2.3 t2.micro instance
        </Typography>
      </Container>
      <Box display="flex" justifyContent="center">
        <Paper className={classes.root}>
          <InputBase
            className={classes.input}
            placeholder="Search"
            inputProps={{ 'aria-label': 'search' }}
            onChange={handleInputChange}
            value={inputText}
            onKeyDown={e => {
              if (e.keyCode === 13) {
                console.log(e.target.value);
                doSearch()
              }
            }}
          />
          <IconButton className={classes.iconButton} aria-label="search" onClick={doSearch}>
            <SearchIcon />
          </IconButton>
        </Paper>
      </Box>
      <Container maxWidth="md" component="blogContents" className={classes.blogContainer}>
        { loading ? <LinearProgress /> : '' }
        {articles.map((row, index) => (
          <React.Fragment key={index}> 
            <Box className={classes.blogTitle}>
              <Typography variant="h6" align="left">
                {row.title}
              </Typography>
              <Slider
                className={classes.slider}
                value={row.lank}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="auto"
                step={1}
                marks
                min={0}
                max={5}
                onChangeCommitted={e  => handleSlideChange(e, row.id)}
              />
            </Box>
            <HighlightedContent highlight={row.highlight} />
          </React.Fragment> 
        ))}
      </Container>
    </div>
  )
}

export default SearchErastic

