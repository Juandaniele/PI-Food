import axios from 'axios';
   

export function getRecipes(){
    return async function(dispatch){
        var json = await axios.get('http://localhost:3001/recipes', {

        });
        return dispatch({
        type: 'GET_RECIPES',
        payload: json.data
        })
    }
}
export function getNameRecipes(nombre){
    return async function(dispatch){
        try{
        var json = await axios.get('http://localhost:3001/recipes?name='  + nombre);
        return dispatch({
            type: 'GET_NAME_RECIPES',
            payload: json.data
        })
    } catch(error){
        console.log(error)
    }
    }
}

export function orderByName(payload){
    return{
        type: 'ORDER_BY_NAME',
        payload
    }
}
export function orderByScore(payload){
    return{
        type: 'ORDER_BY_SCORE',
        payload
    }
}
export function filterDiets(payload){
    return{
        type: 'FILTER_DIETS',
        payload
    }
}
export function getTypes(){
    return async function (dispatch){
        var info = await axios('http://localhost:3001/types', {})
        const hola = info.data.map((e) => {return e.nombre})
        
        
        return dispatch({type : 'GET_TYPES', payload: hola })
    }
}
export function postRecipes(payload){
    
    return async function(dispatch){
        const info = await axios.post('http://localhost:3001/recipe', payload)
        
        return info;
    }
}
export function getDetail(id){
    return async function (dispatch){
        
            var json = await axios.get('http://localhost:3001/recipes/' + id);
            
            return dispatch ({
                type: 'GET_DETAIL',
                payload: json.data
            })
        
        }
    }
