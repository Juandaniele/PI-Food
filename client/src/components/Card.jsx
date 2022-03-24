import React from 'react';
import { Link } from 'react-router-dom';
import '../../src/Card.css'

export default function Card({id, imagen, nombre, tipoDeDieta, puntuacion}){
    return(
     
        <div style={{margin:10,}}> 
        <div style={{width:250,height:300,padding:5}} className='recipecard' >
        <div >
            <Link to={`/recipes/${id}`}>
                
            <img  src= {imagen}  width='100px' haight='100px'/>
            <h1 >{nombre}</h1>
            
            <h3 > Tipo de dieta: {tipoDeDieta}</h3>
            <h3 > Puntuacion: {puntuacion}</h3>
            
            </Link>  
            </div>      
            </div>
            </div>
            
    )
}