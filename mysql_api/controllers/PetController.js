const PetModel = require("../models/PetModel")

module.exports = {
    async getAllPets(req, res) {
        try{
            const pets = await PetModel.findAll()
            res.status(200).json(pets)
        }catch (error){
            console.log(error)
            res.status(500).json({ error });
        }
    },

    async getPetById(req, res) {
        try{
            const pet = await PetModel.findByPk(req.params.id)
            if(!pet){
                res.status(404).json({message: "Pet não encontrado!"})
            }
            res.status(200).json(pet)
        }catch (error){
            console.log(error)
            res.status(500).json({ error });
        }
    },

    async createPet(req, res) {
        try{
           const {user_id, breed, name, age, weight} = req.body
            const pet = {user_id, breed, name, age, weight}
            await PetModel.create(pet)
            res.status(201).json({message: "Pet cadastrado com sucesso!"})
        }catch (error){
            console.log(error)
            res.status(500).json({ error });
        }
    },

    async updatePetById(req, res) {
        try {
            const id = req.params.id;
            const oldPet = await PetModel.findByPk(id);
            if (!oldPet) {
                res.status(404).json({ message: "Pet não encontrado!" });
            }
            const { user_id, name, breed, age, weight } = req.body;
            const newPet = { user_id, name, breed, age, weight };
            await PetModel.update(newPet, { where: { pet_id: id } });
            res.status(200).json({ message: "Pet modificado com sucesso!" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error });
        }
    },


    async deletePetById(req, res) {
        try{
            const id = req.params.id
            const pet = await PetModel.findByPk(id)
            if(!pet){
                res.status(404).json({message: "Pet não encontrado!"})
            }
            await pet.destroy()
            res.status(200).json({message: "Pet deletado com suceso"})
        }catch (error){
            console.log(error)
            res.status(500).json({ error });
        }
    },

    async deleteAllPets(req, res) {
        try{
            await PetModel.destroy({
                truncate: true // Remove todas as linhas da tabela
            });
            res.status(200).json({ message: "Todos os pets foram deletadas com sucesso!" });
        }catch (error){
            console.log(error)
            res.status(500).json({ error });
        }
    },

}
