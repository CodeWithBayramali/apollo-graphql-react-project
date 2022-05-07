import { Form, Input, Button } from 'antd';
import { useFormik } from 'formik';
import { useMutation, gql } from '@apollo/client';
import React, { useContext } from 'react';
import { REGISTER_USER } from '../graphql/mutation/authMutation';
import { AuthContext } from '../context/auth';
import { useNavigate } from 'react-router-dom';


const Register = () => {
  const context = useContext(AuthContext);
  const navigate = useNavigate()
  const [kullaniciEkle, { loading }] = useMutation(REGISTER_USER, {
    update(proxy, { data: { register: userData } }) {
      context.login(userData);
      navigate('/')
    },
  });

  const formik = useFormik({
    initialValues: {
      kullaniciAd: '',
      parola: '',
      parolaKontrol: '',
      email: '',
    },
    onSubmit: values => {
      kullaniciEkle({ variables: values });
    },
  });

  return (
    <Form name="normal_login" className="login-form" initialValues={{ remember: true }} onSubmitCapture={formik.handleSubmit}>
      <Form.Item name="kullaniciAd" rules={[{ required: true, message: 'Please input your Username!' }]}>
        <Input
          name="kullaniciAd"
          onChange={formik.handleChange('kullaniciAd')}
          value={formik.values.kullaniciAd}
          placeholder="Username"
        />
      </Form.Item>

      <Form.Item name="email" rules={[{ required: true, message: 'Please input your Username!' }]}>
        <Input name="email" onChange={formik.handleChange('email')} value={formik.values.email} placeholder="Email" />
      </Form.Item>

      <Form.Item name="parola" rules={[{ required: true, message: 'Please input your Username!' }]}>
        <Input type="password" name="parola" onChange={formik.handleChange('parola')} value={formik.values.parola} placeholder="Password" />
      </Form.Item>

      <Form.Item name="parolaKontrol" rules={[{ required: true, message: 'Please input your Password!' }]}>
        <Input
          onChange={formik.handleChange('parolaKontrol')}
          value={formik.values.parolaKontrol}
          name="parolaKontrol"
          type="password"
          placeholder="Check Password"
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

export default Register;
