import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import { DELETE_POST } from '../graphql/mutation/postMutation';
import { useMutation } from '@apollo/client';
import { GET_DATA_QUERY } from '../graphql/query/postQuery';

const DeleteButton = ({ postId, callback }) => {
  const [silButon] = useMutation(DELETE_POST, {
    update(proxy) {
      const data = proxy.readQuery({ query: GET_DATA_QUERY });
      proxy.writeQuery({
        query: GET_DATA_QUERY,
        data: { getPosts: data.getPosts.filter(p => p.id !== postId) },
      });
      if (callback) callback();
    },
    variables: { postId },
  });

  return (
    <>
      <IconButton onClick={()=>silButon()} aria-label="settings">
        <DeleteForeverIcon style={{ color: 'red' }} />
      </IconButton>
    </>
  );
};

export default DeleteButton;
