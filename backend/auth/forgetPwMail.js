import nodemailer from "nodemailer";
import fpMails from "./fpMails.js";
import { SENDER_EMAIL, EMAIL_PASSWORD } from "../utils/config.js";

class ForgetPwMail {
  SendEmail = async (email) => {
    const code = 100000 + Math.floor(Math.random() * 900000);
    const savedCode = await fpMails.saveToken(email, code);
    if (!savedCode) return false;
    try {
      const SenderEmail = SENDER_EMAIL;
      const ReceiverEmail = email;
      // using nodemailer to send mail
      // creating an transport
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        auth: {
          user: SenderEmail,
          pass: EMAIL_PASSWORD,
        },
        secure: true,
      });
      // checking transport status
      const verifymail = await this.CheckValidEmail(transporter);
      if (!verifymail) return false;
      let info = transporter.sendMail({
        from: SenderEmail,
        to: ReceiverEmail,
        subject: "Verify your account",
        text: "Change password verification",
        html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2;margin-left: -100px;">
        <div style="margin:50px auto;width:70%;padding:20px 0">
          <div style="border-bottom:1px solid #eee">
            <a href="" style="font-size:1.4em;color: #7d5e00;text-decoration:none;font-weight:600">Fun Olympics</a>
          </div>
          <p style="font-size:1.1em">Hi,</p>
          <p>We received a request to recover your account. Please use the following OTP to reset your password. This OTP is valid for 5 minutes:</p>
          <h2 style="background: #ffc107;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${code}</h2>
          <p style="font-size:0.9em;">Regards,<br />Fun Olympic</p>
          <hr style="border:none;border-top:1px solid #eee" />
          <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
            <p>Pyaris Fun Olympic</p>
            <p>52 Avenue Parmentier</p>
            <p>Paris</p>
          </div>
        </div>
      </div>`,
      });
      if (info) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return error.message;
    }
  };

  CheckValidEmail = async (transporter) => {
    const verified = await transporter.verify();
    if (verified) {
      return true;
    }
    return false;
  };
}
export default new ForgetPwMail();
