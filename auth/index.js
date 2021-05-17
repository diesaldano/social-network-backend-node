const jwt = require('jsonwebtoken');
const config = require('../config/config')
const error = require('../utils/index');

const secret = config.jwt.secret;

function sign(data) {
  return jwt.sign(data, secret);
}

function verify(token) {
  try {
    return jwt.verify(token, secret)
  } catch (error) {
    throw new Error(error.message)
  }
}

const check = {
  own: function(req, owner) {
    const decoded = decodeHeader(req);
    console.log(decoded);

    if (decoded.id !== owner) {
      throw error('No puedes hacer esto', 401);
    }
  },

  logged: function(req, owner) {
    const decoded = decodeHeader(req);
  },
}

function getToken(auth) {
  if (!auth) {
    throw error('No viene token', 401);
  }

  if (auth.indexOf('Bearer') === -1) {
    throw error('Formato invalido', 401);
  }

  let token = auth.replace('Bearer', '');
  return token;
}

function decodeHeader(req) {
  const authorization = req.headers.authorization || '';
  const token = getToken(authorization);
  const decoded = verify(token);

  req.user = decoded;

  return decoded;
}

module.exports = {
  sign,
  check
};