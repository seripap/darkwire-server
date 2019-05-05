require('dotenv').config()

const {
  MAILGUN_API_KEY,
  MAILGUN_DOMAIN,
} = process.env;

const apiKey = MAILGUN_API_KEY;
const domain = MAILGUN_DOMAIN;

const mailgun = require('mailgun-js')({apiKey, domain});

module.exports.send = (data) => {
  mailgun.messages().send(data, function (error, body) {

  });
}
