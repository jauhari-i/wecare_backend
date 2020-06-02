const transporter = require('../config/nodeMailer');
const fs = require('fs');
const handlebars = require('handlebars');
const path = require('path');

const readHtmlFile = (path, cb) => {
  fs.readFile(path, { encoding: 'utf-8' }, (err, html) => {
    err ? cb(err) : cb(null, html);
  });
};

module.exports = sendVerificationEmail = async (email, kode, cb) => {
  readHtmlFile(path.join(__dirname, '../public/mail.html'), (err, html) => {
    err && cb(err);
    const template = handlebars.compile(html);
    const data = {
      kode: kode,
    };
    const htmlToSend = template(data);
    const mailOptions = {
      from: `"We Care" <no-reply@wecare.com>`,
      to: email,
      subject: 'Email Verification',
      html: htmlToSend,
    };
    transporter.sendMail(mailOptions, (err, info) => {
      err ? cb(err) : cb(null, info);
    });
  });
};
