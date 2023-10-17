import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config({path: '../.env'})

const mailer_user = process.env.MAILER_USER;
const mailer_pass = process.env.MAILER_PASS;

console.log("AAAAAAAAAAAAAAA" + mailer_user, mailer_pass)

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