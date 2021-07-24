const nodemailer = require('nodemailer');
require('dotenv').config();

const {
  HOST, PORT, USER, PASS,
} = process.env;

const transport = nodemailer.createTransport({
  host: HOST,
  port: PORT,
  auth: {
    user: USER,
    pass: PASS,
  },
});

module.exports = transport;
