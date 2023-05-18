const nodemailer = require('nodemailer');

// Configurar transporte SMTP
const transporter = nodemailer.createTransport({
    host: 'smtp.example.com', // Insira o host do seu provedor de e-mail SMTP
    port: 587, // Insira a porta do seu provedor de e-mail SMTP
    secure: false, // Define se a conexão deve usar SSL/TLS. Para usar SSL/TLS, defina como true
    auth: {
        user: 'seu-email@example.com', // Insira seu endereço de e-mail
        pass: 'sua-senha', // Insira sua senha
    },
});

// Definir informações do e-mail
const mailOptions = {
    from: 'seu-email@example.com', // Insira o remetente do e-mail
    to: 'destinatario@example.com', // Insira o destinatário do e-mail
    subject: 'Exemplo de e-mail', // Insira o assunto do e-mail
    text: 'Olá, este é um exemplo de e-mail enviado usando o Nodemailer!', // Insira o conteúdo do e-mail
};

// Enviar o e-mail
transporter.send(mailOptions, (error, info) => {
    if (error) {
        console.log('Erro ao enviar o e-mail:', error);
    } else {
        console.log('E-mail enviado com sucesso!');
    }
});
