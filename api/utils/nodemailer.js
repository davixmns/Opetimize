import nodemailer from 'nodemailer';

const mailer_user = process.env.MAILER_USER;
const mailer_pass = process.env.MAILER_PASS;

export const nodemailerTransport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: mailer_user,
        pass: mailer_pass
    },
    tls: {
        rejectUnauthorized: false
    }
});

export function htmlForgotPasswordEmail(email, token, resetUrl) {
    return {
        from: "Opetimize Support <support@opetimize.com>",
        to: email,
        subject: "Recuperação de senha Opetimize",
        text: "Recuperação de senha",
        html: `<a href="${resetUrl}?token=${token}" 
                  style="padding: 1rem 4rem; border-radius: 8px; color: #ffffff; 
                  background: #0C1B33; font-weight: 900; text-decoration: none; 
                  cursor: pointer; font-size: 14px;">REDEFINIR SUA SENHA</a>`
    }

}