import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameRecipes } from "../actions";
import '../../src/searchbar.css';

export default function SearchBar(){
    const dispatch = useDispatch()
    const [nombre,setName] = useState('')

    function handleInput(e){
        e.preventDefault()
        setName(e.target.value)
        console.log(nombre)
    }

    function handleSubmit(e){
        e.preventDefault()
        dispatch(getNameRecipes(nombre))
    }
    return (
        <div>
            <input
            type = 'text'
            placeholder = 'Buscar receta...'
            onChange = {(e) => handleInput(e)}
            />
            <button className='btn1' type='submit' onClick={(e) => handleSubmit(e)}>Buscar</button>
        </div>
    )
}