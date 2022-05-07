const { AuthenticationError } = require('apollo-server-express');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');

module.exports = context => {
  const authHeader = context.req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split('Bearer ')[1];
    if (token) {
      try {
        const user = jwt.verify(token, SECRET_KEY);
        return user;
      } catch (error) {
        throw new AuthenticationError('Hatalı Token !');
      }
    } else {
      throw new Error('Bearer token bulunamadı !');
    }
  } else {
    throw new Error('Authorization token bulunamadı');
  }
};
