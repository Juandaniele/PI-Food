import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import '../../src/detail.css'

export default function Detail(){
    
    const  [recipe,setRecipe] = useState(null)
    let {id} = useParams()
    useEffect(() => {
        axios.get('http://localhost:3001/recipes/' + id)
        .then(response => setRecipe(response.data));
        return () => setRecipe(null)
    }, [id])

    return(
        <div>
            {
                recipe ?
                    <div className='div'>
                        <div>
                        <h1 className='titulodetail'>{recipe[0].nombre}</h1>
                        </div>
                        <div>
                        <img src={recipe[0].imagen ? recipe[0].imagen : 'https://media.istockphoto.com/photos/arabic-and-middle-eastern-dinner-table-hummus-tabbouleh-salad-salad-picture-id1175505781?k=20&m=1175505781&s=612x612&w=0&h=STomby2lCtcvpl_hxK6RhknQQWrkvpkHcoDLD4zttFk=' }/>
                        </div>
                        <div className="detalles">
                        <h3>Resumen del plato: </h3><h4 dangerouslySetInnerHTML={{ __html: recipe[0].resumenDelPlato }}/>
                        <br></br>
                        
                        <h3 >Paso a paso: </h3><h4>{recipe[0].pasoAPaso.length ? recipe[0].pasoAPaso : 'No incluye instrucciones'}</h4>
                        <br></br>
                        <h3>Puntuacion: </h3><h4>{recipe[0].puntuacion}</h4>
                        <br></br>
                        <h3>Nivel de comida saludable: </h3><h4>{recipe[0].nivelSaludable}</h4>
                        </div>
                        
                        
                    </div> 
                    : <div><div class="lds-ripple"><div></div><div></div></div></div>
                    
            }
            
            <Link to='/home'>
                <button className='btn5'>Volver</button>
            </Link>
        </div>
    )

}