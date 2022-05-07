import { TextField, FormControl, Button } from '@mui/material';
import { useFormik } from 'formik';
import { useMutation } from '@apollo/client';
import { CREATE_POST } from '../graphql/mutation/postMutation';
import { GET_DATA_QUERY } from '../graphql/query/postQuery';

const PostForm = () => {

  const [createPost,{error}] = useMutation(CREATE_POST,{
      update(proxy,result){
        const data = proxy.readQuery({query:GET_DATA_QUERY});
        proxy.writeQuery({
          query:GET_DATA_QUERY,
          data:{getPosts:[result.data.createPost,...data.getPosts]}
        })
      }
  })

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    onSubmit:(values,{resetForm})=>{
      createPost({variables:values})
      resetForm()
    }
  });

  return (
    <form onSubmit={formik.handleSubmit} style={{ display: 'flex', flexDirection: 'column',marginBottom:'2rem' }}>
      <FormControl>
        <TextField
          onChange={formik.handleChange('body')}
          name='body'
          value={formik.values.body}
          id="outlined-search"
          multiline
          label="Search field"
          type="search"
          rows={3}
        />
      </FormControl>
      <Button type='submit' sx={{mt:1}} variant="outlined">Send</Button>
    </form>
  );
};

export default PostForm;
