const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const path = require('path');
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

transport.use('compile', hbs({
  viewEngine: 'handlebars',
  viewPath: path.resolve('./resources/mail/'),
  extName: '.html',
}));

module.exports = transport;