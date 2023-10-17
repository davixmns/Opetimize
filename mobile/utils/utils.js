const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default {
    verifyPurchase(p) {
        if (!p.name || !p.price || !p.weight) return "Preencha todos os campos"
        if (p.name.length < 3) return `"${p.name}" é um nome muito curto`
        if (p.name.length > 20) return "ESte nome é muito longo"
        if (p.price <= 0) return "Este preço é inválido"
        if (p.price > 10000) return "Este preço é muito alto"
        if (p.weight <= 0) return "O peso deve ser maior que zero"
        if (p.weight > 10000) return "Este peso é muito alto"
        return true
    },

    verifyCredentials(email, password) {
        if (!email || !password) return "Preencha todos os campos"
        if (!emailRegex.test(email)) return "Este email é inválido"
        return true
    },

    verifyUser(name, email) {
        if (!name || !email) return "Preencha todos os campos"
        if (name.length < 3) return `"${name}" é um nome muito curto`
        if (name.length > 40) return "Este nome é muito longo"
        if (!emailRegex.test(email)) return "Este email é inválido"
        return true
    },

    verifyUserOnRegister(u) {
        if (!u.name || !u.email) return "Preencha todos os campos"
        if (u.name.length < 3) return `"${u.name}" é um nome muito curto`
        if (u.name.length > 20) return "Este nome é muito longo"
        if (!emailRegex.test(u.email)) return "Este email é inválido"
        if(u.password.length < 6) return "A senha deve ter no mínimo 8 caracteres"
        return true
    },
    emailRegex
}
