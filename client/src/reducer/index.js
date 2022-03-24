
const initialState = {
    recipes: [],
    detail: [],
    allRecipes: [],
    types: []
}

function rootReducer (state= initialState, action){
    switch(action.type){
        case 'GET_RECIPES':
            return{
                ...state,
                recipes: action.payload,
                allRecipes: action.payload
        }
        case 'GET_NAME_RECIPES':
            return{
                ...state,
                
                allRecipes: action.payload
            }
        

        case 'ORDER_BY_NAME':
            let sortedArr = action.payload === 'asc'?
            state.allRecipes.sort(function (a, b){
                if (a.nombre.toLowerCase() > b.nombre.toLowerCase()) {
                    return 1;
                }
                if (b.nombre.toLowerCase() > a.nombre.toLowerCase()){
                    return -1;
                }
                return 0
            }):
            state.allRecipes.sort(function (a, b){
                if (a.nombre.toLowerCase() > b.nombre.toLowerCase()) {
                    return -1;
                }
                if (b.nombre.toLowerCase() > a.nombre.toLowerCase()){
                    return 1;
                }
                return 0
            })
            
            return {
                ...state,
                allRecipes: sortedArr
            }
        case 'ORDER_BY_SCORE':
            let score = action.payload === 'min'?
            state.allRecipes.sort(function (a, b){
                if (a.puntuacion > b.puntuacion) {
                    return 1;
                }
                if (b.puntuacion > a.puntuacion){
                    return -1;
                }
                return 0
            }):
            state.allRecipes.sort(function (a, b){
                if (a.puntuacion > b.puntuacion) {
                    return -1;
                }
                if (b.puntuacion > a.puntuacion){
                    return 1;
                }
                return 0
            })
            return {
                ...state,
                allRecipes: score
            }
        case 'GET_TYPES':
            return{
                ...state,
                types: action.payload
            }
        case 'POST_RECIPE':
            return{
                ...state
            }
        case 'FILTER_DIETS':
            
            
            const fin = action.payload === 'todas' ? state.recipes.filter((e) => {return e.nombre}) : state.recipes.filter((e) => {
               return e.types.includes(action.payload) || e.types.map((e) => e.nombre ).includes(action.payload)
            })
            
            return{
                ...state,
                allRecipes: fin
            }
        case 'GET_DETAIL':
            return{
                ...state,
                detail: action.payload
               } 
        default: return state;
    }
}

export default rootReducer;