const nodemailer = require("nodemailer");

const { DOMAIN, EMAIL, PASSWORD } = process.env;

const getEmailData = (req, template) => {
   let data = null;
   const { email, username } = req.body;

   switch (template) {
      case "hello":
         // const { email } = req.session;
         data = {
            from: "Cache-n-Dash <cacheanddashDEV@gmail.com>",
            to: email,
            subject: "Please verify your email.",
            html: `<h1> Hello nate<h1>
            <p> Thank you for signing up for Cache-n-dash. There is only one thing left to do. <p>
             <h3> Verify your account by clicking on this link <a target="" href="${DOMAIN}/auth/verify/${email}/${username}"> Verify Accout <a> <h3>
             <p> From the Cache-N-Dash Team <p>`,
         };
         break;
      default:
         data;
   }
   return data;
};

// href="${DOMAIN}/auth/verify/${email}/${username}

const sendEmail = (req, type) => {
   const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
         user: EMAIL,
         pass: PASSWORD,
      },
   });

   const mail = getEmailData(req, type);
   console.log(mail);
   transporter.sendMail(mail, function (error, response) {
      if (error) {
         console.log(error);
      } else {
         console.log("Email was sent successfully.");
      }
      transporter.close();
   });
};

module.exports = { sendEmail };

// module.exports = {
//    veryfyEmail: (req, res) => {
//       const { email, username } = req.body;
//       const message = {
//          from: EMAIL,
//          to: email,
//          subject: `Verify Cashe-n-dash Accout`,
//          html: `<h1> Hello ${username}<h1>
//          <p> Thank you for signing up for Cache-n-dash. There is only one thing left to do. <p>
//           <h3> Verify your account by clicking on this link <a target="" href="${DOMAIN}/auth/verify/${email}/${username}"> Verify Accout <a> <h3>
//           <p> From the Cache-N-Dash Team <p>`,
//       };
//       return transporter.sendMail(message, (err, info) => {
//          if (err) {
//             throw new Error(err);
//          }
//       });
//    },
// };
