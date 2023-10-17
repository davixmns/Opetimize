import {nodemailerTransport} from "../nodemailer/transport.js";
import messages from "../nodemailer/messages.js";

export default {
    async sendResetTokenEmail(req, res){
        try{
            const user = req.user
            const resetToken = req.reset_token
            const message = messages.htmlForgotPasswordEmail(user.name, user.email, resetToken)
            await nodemailerTransport.sendMail(message)
            return res.status(200).json({message: 'Email de recuperação de senha enviado!'})
        }catch (e) {
            console.log(e)
            return res.status(500).json({message: 'Erro ao enviar email'})
        }
    }
}