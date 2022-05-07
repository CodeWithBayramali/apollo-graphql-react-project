import { Form, Input, Button } from 'antd';
import { useMutation } from '@apollo/client';
import { useFormik } from 'formik';
import React, { useContext } from 'react';
import { AuthContext } from '../context/auth';
import { LOGIN_USER } from '../graphql/mutation/authMutation';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const context = useContext(AuthContext);
  const navigate = useNavigate();
  const [kullaniciGiris, { loading }] = useMutation(LOGIN_USER, {
    update(proxy, { data:{login:userData} }) {
      context.login(userData);
      navigate('/')
    },
  });

  const formik = useFormik({
    initialValues: {
      kullaniciAd: '',
      parola: '',
    },
    onSubmit: values => {
      kullaniciGiris({ variables: values });
    },
  });

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onSubmitCapture={formik.handleSubmit}
    >
      <Form.Item name="kullaniciAd" rules={[{ required: true, message: 'Please input your Username!' }]}>
        <Input
          name="kullaniciAd"
          onChange={formik.handleChange('kullaniciAd')}
          value={formik.values.kullaniciAd}
          placeholder="Username"
        />
      </Form.Item>

      <Form.Item name="parola" rules={[{ required: true, message: 'Please input your Username!' }]}>
        <Input
          type="password"
          name="parola"
          onChange={formik.handleChange('parola')}
          value={formik.values.parola}
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Button style={{ width: '100%' }} type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Login;
