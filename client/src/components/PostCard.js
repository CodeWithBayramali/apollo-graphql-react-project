import React, { useContext } from 'react';
import {
  Grid,
  Badge,
  Card,
  CardHeader,
  CardActions,
  CardContent,
  Avatar,
  IconButton,
  Typography,
  Rating,
} from '@mui/material';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import moment from 'moment';

import { AuthContext } from '../context/auth';
import DeleteButton from './DeleteButton';


function PostCard({ post }) {
  const { kullanici } = useContext(AuthContext);

  
  return (
    <Grid item xs={2} sm={4} md={4}>
      <Card sx={{ maxWidth: 345 }} elevation={4}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              R
            </Avatar>
          }
          action={
            kullanici &&
            kullanici.kullaniciAd === post.kullaniciAd && (
              <DeleteButton postId={post.id}/>
            )
          }
          title={post.kullaniciAd}
          subheader={moment(post.olusturulmaTarihi).startOf('hour').fromNow().toString()}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {post.body}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <Badge badgeContent={post.begeniSayisi} color="secondary">
              <FavoriteIcon style={{ fontSize: 28 }} />
            </Badge>
          </IconButton>
          <IconButton aria-label="share" sx={{ ml: 5 }}>
            <Badge badgeContent={post.yorumSayisi} color="secondary">
              <InsertCommentIcon style={{ fontSize: 28 }} />
            </Badge>
          </IconButton>
          <Rating sx={{ ml: 8 }} value={post.begeniSayisi === 5 ? 5 : 3} readOnly />
        </CardActions>
      </Card>
    </Grid>
  );
}

export default PostCard;
