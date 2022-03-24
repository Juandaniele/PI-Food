
const  axios  = require('axios');
const {Recipe, Type} = require('../db')


require('dotenv').config();

 const getApiInfo = async () => {
    try{
        const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&number=100&apiKey=${process.env.API_KEY}`)
        
        const apiInfo =  await apiUrl.data.results.map(e => {
            return {
                id: e.id,
                imagen: e.image,
                nombre : e.title,
                resumenDelPlato: e.summary,
                puntuacion: e.spoonacularScore,
                nivelSaludable: e.healthScore,
                pasoAPaso: e.analyzedInstructions.map(e => {return e.steps.map(e => {return e.step} )}),
                types : e.diets
            }
        })
        
    return apiInfo;}catch(error){console.log('Hubo un error en el getApiInfo', error)};
}


const getDbInfo = async () => {
    return  await Recipe.findAll({
       include: {model: Type,
       attributes: [ 'nombre' ],
       through: {
           attributes: [],
    
       }} 
    })
}
const getAllRecipe = async () =>{
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal;
}
module.exports= {
    getAllRecipe
}