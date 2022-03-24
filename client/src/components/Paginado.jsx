import React from 'react';
import '../../src/Paginado.css';
export default function Paginado ({recipesPerPage, allRecipes, paginado}){
    const pageNumbers = []

    for( let i=1; i <= Math.ceil(allRecipes/recipesPerPage); i++){
        pageNumbers.push(i)     
    }

    return(
        <nav>
            <li className='paginado'>
                {pageNumbers &&
                pageNumbers.map(number =>(
                    <ul key={number} className='active'>
                    <button onClick={() => paginado(number)} className='buttonPaginado' >{number}</button>
                    </ul>
                ))}
            </li>
        </nav>
    )
}