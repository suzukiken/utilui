import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  heroContent: {
    padding: theme.spacing(4, 0, 2),
  },
  mplus1p: {
    fontFamily: "M PLUS 1p",
    fontStyle: 'normal',
    fontWeight: 'Thin',
    fontSize: 15,
    letterSpacing: 0.5,
    lineHeight: 1.7
  }
}))

function TypeFace() {
  const classes = useStyles();

  return (
    <React.Fragment> 
      <Container maxWidth="md" component="main" className={classes.heroContent}>
        <Typography variant="h1" component="h2" gutterBottom>
          h1. Heading
        </Typography>
        <Typography variant="h2" gutterBottom>
          h2. Heading
        </Typography>
        <Typography variant="h3" gutterBottom>
          h3. Heading
        </Typography>
        <Typography variant="h4" gutterBottom>
          h4. Heading
        </Typography>
        <Typography variant="h5" gutterBottom>
          textはAnalyzeされる。Inverse Indexが作られる。
        </Typography>
        <div className={classes.mplus1p}>またAWS Elasticsearch Serviceとは別にElastic.coのElasticsearchもあり、Elastic.coの情報の方が検索にはよく登場するのでそちらのドキュメントを見ることも多い。もちろん自分でElasticsearchをインストールして動かすこともできるので、それをしている人の記事も検索に出てくる</div>
      </Container>
    </React.Fragment> 
  );
}

export default TypeFace


