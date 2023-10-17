const opetimizeLogo = 'https://cdn.discordapp.com/attachments/1125604141356560458/1163569793505439754/logo.png?ex=65400dd0&is=652d98d0&hm=b3ee5919de22108b7e35c5758d6fe622c8134aaf3c25d90109d1f9878c852aff&'

export default {
    htmlForgotPasswordEmail(userName, userEmail, resetToken) {
        return {
            from: "Opetimize <suporte@opetimize.com>",
            to: userEmail,
            subject: "Recuperação de senha Opetimize",
            html:
                `<div style="background-color: #fff; padding: 20px;">
                <h1 style="color: #F19020; text-align: start;">Recuperação de Senha</h1>
                <p style="color: #000; font-size: 16px; font-weight: bold">Olá,</p>
                <p style="color: #000; font-size: 16px; font-weight: bold">Recebemos uma solicitação para redefinir a senha da sua conta.</p>
                <p style="color: #000; font-size: 16px; font-weight: bold">Digite este código no aplicativo:</p>
                <h1 style="color: #F19020; font-size: x-large">${resetToken}</h1>
                <p style="color: red; font-size: 16px; font-weight: bold">Se não foi você que solicitou, ignore este email.</p>
                <p style="color: #000; font-size: 16px; font-weight: bold">Atenciosamente,</p>
                <img src=${opetimizeLogo} alt="logo" width="100vh" height="100vh" style="border-radius: 30px">
             </div>`
        }
    }
}
