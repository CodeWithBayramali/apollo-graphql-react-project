import React from 'react';
import { useQuery } from '@apollo/client';
import PostCard from '../components/PostCard';
import { Grid,CircularProgress } from '@mui/material';

import {GET_DATA_QUERY} from '../graphql/query/postQuery'
import PostForm from './PostForm';

function HomeScreen() {
  const { loading, error, data } = useQuery(GET_DATA_QUERY);

    return (
      <>
      <PostForm />
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
      {
        loading ? <CircularProgress color='secondary' />: 
       data.getPosts && data.getPosts.map((item,index) => (
          <PostCard key={index} post={item} />
        ))
      }
    </Grid>
    </>
  )
}

export default HomeScreen;
