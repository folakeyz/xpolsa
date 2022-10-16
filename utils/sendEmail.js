const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
    tls: { ciphers: "SSLv3" },
    service: "Outlook365",
  });

  const message = {
    from: `${process.env.FROM_NAME}, <${process.env.FROM_EMAIL}>`, // sender address
    to: options.email,
    cc: options.cc,
    subject: options.subject,
    text: options.message,
    html: `<table width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
    <tbody>
        <tr>
            <td align="center">
                <table class="col-600" width="600" border="0" align="center" cellpadding="0" cellspacing="0">
                    <tbody>
                        <tr>
                            <td align="center" valign="top" bgcolor="#640ad2"
                                style="background:linear-gradient(0deg, rgba(100, 10, 210, 0.8), rgba(100, 10, 210, 0.8)),url("https://vmslag-test.azurewebsites.net/static/media/logo.4bf34e25.png);background-size:cover; background-position:top;height:230">
                                <table class="col-600" width="600" height="200" border="0" align="center"
                                    cellpadding="0" cellspacing="0">
                                    <tbody>
                                        <tr>
                                            <td align="center" style="line-height: 0px;">
                                                <img style="display:block; line-height:0px; font-size:0px; border:0px;"
                                                    src=""https://vmslag-test.azurewebsites.net/static/media/logo.4bf34e25.png"
                                                    width="70" height="70" alt="logo">
                                            </td>
                                        </tr>
                                        <tr>
                                            <td align="center"
                                                style="font-family: 'Raleway', sans-serif; font-size:37px; color:#ffffff;font-weight: bold;">
                                                Lagos State 
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
        <tr>
            <td align="center">
                <table class="col-600" width="600" border="0" align="center" cellpadding="0" cellspacing="0"
                    style="margin-left:20px; margin-right:20px; border-left: 1px solid #dbd9d9; border-right: 1px solid #dbd9d9;">
                    <tbody>
                        <tr>
                            <td height="35"></td>
                        </tr>
    
                        <tr>
                            <td align="center"
                                style="font-family: 'Raleway', sans-serif; font-size:22px; font-weight: bold; color:#2a3a4b;">
                              ${options.salutation}
                            </td>
                        </tr>
                        <tr>
                            <td align="center"
                                style="font-family: 'Lato', sans-serif; font-size:14px; color:#757575; line-height:24px; font-weight: 300;">
                               ${options.content}
                            </td>
                        </tr>
    
                    </tbody>
                </table>
            </td>
        </tr>
    </tbody>
    </table>`,
  };
  const info = await transporter.sendMail(message);
  console.log("Message sent: %s", info.messageId);
};

module.exports = sendEmail;
