const { Router } = require('express');
const {Recipe, Type} = require('../db');
const { getAllRecipe } = require('./functions');
require('dotenv').config();

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


 router.get('/recipes', async (req,res) =>{
    const name = req.query.name
    let recipesTotal = await getAllRecipe();
    if(name){
        let recipeName = await recipesTotal.filter( e => e.nombre.toLowerCase().includes(name.toLowerCase()))
        
        res.status(200).send(recipeName) 
        
    } else{
        res.status(200).send(recipesTotal)
    }
})


router.get('/types', async (req, res) => {
    let types = await Type.findAll();
    if (types.length === 0){
        const data = [
            {nombre: "gluten free"},
            {nombre: "dairy free"},
            {nombre: "vegetarian"},
            {nombre: "lacto ovo vegetarian"},
            {nombre: "vegan"},
            {nombre: "pescatarian"},
            {nombre: "paleolithic"},
            {nombre: "primal"},
            {nombre: "fodmap friendly"},
            {nombre: "whole30"}]
            types = await Type.bulkCreate(data)
    }
    res.json(types);
})
router.post('/recipe', async (req, res) => {
    const { nombre, resumenDelPlato, imagen, puntuacion, nivelSaludable, pasoAPaso, createdInDb, types} = req.body
    if(nombre && resumenDelPlato){
    const recipeCreate = await Recipe.create({
        nombre, 
        resumenDelPlato, 
        imagen,
        puntuacion, 
        nivelSaludable, 
        pasoAPaso,
        createdInDb
    })

    const typeDb = await Type.findAll({
        where: { nombre: types}
    })
    
    recipeCreate.addType(typeDb)
    res.send('Receta creada')}
    else{
        res.status(404).send('No se pudo crear la recera');
    }
})

router.get('/recipes/:id', async (req, res) => {
    const id = req.params.id;
    const recipes = await getAllRecipe()
    if(id){
        let recipeId = await recipes.filter( e => e.id == id)
        recipeId.length?
        res.status(200).json(recipeId) :
        res.status(400).json("No encontre la receta con ese id")
    }
})
module.exports = router;
