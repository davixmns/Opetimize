
export default {
    verifyPurchase (p) {
        if(!p.name || !p.price || !p.weight) {
            return "Preencha todos os campos"
        }
        if(p.name.length < 3) {
            return `"${p.name}" é um nome muito curto`
        }
        if(p.name.length > 20) {
            return "ESte nome é muito longo"
        }
        if(p.price <= 0) {
            return "Este preço é inválido"
        }
        if(p.price > 10000) {
            return "Este preço é muito alto"
        }
        if(p.weight <= 0) {
            return "O peso deve ser maior que zero"
        }
        if(p.weight > 10000) {
            return "Este peso é muito alto"
        }
        return true
    }
}
