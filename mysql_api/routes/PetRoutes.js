const express = require("express")
const PetController = require("../controllers/PetController")
const router = express.Router()

router.get("/pets", PetController.getAllPets)
router.get("/pets/:id", PetController.getPetById)
router.post("/pets", PetController.createPet)
router.put("/pets/:id", PetController.updatePetById)
router.delete("/pets/:id", PetController.deletePetById)
router.delete("/pets", PetController.deleteAllPets)

module.exports = router

