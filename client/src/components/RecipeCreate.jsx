import React,{useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { postRecipes, getTypes } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import '../../src/recipecreate.css';

export default function RecipeCreate(){
    const dispatch = useDispatch()
    const diet = useSelector((state) => state.types)
    console.log(typeof(diet))
    const [errors, setErrors] = useState({})
    const [input, setInput] = useState({
        nombre:'',
        resumenDelPlato:'',
        imagen:'',
        puntuacion: '',
        nivelSaludable: '',
        pasoAPaso: '',
        types: []
    })
    function validate(input){
        let errors = {};
        if(!input.nombre){
            errors.nombre = 'Se requiere un nombre'
        }
        else if(!input.resumenDelPlato){
            errors.resumenDelPlato = 'Se requiere un resumen del plato'
        }
        return errors;
    }
    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name] : e.target.value
        }))
    }
    function handleCheck(e){
        if (e.target.checked){
            setInput({
                ...input,
                types:[ ...input.types, e.target.value]
            })
        }
        else{
            setInput({
                ...input,
                types: input.types.filter((t) => t !== e.target.value) 
            })
        }
    }
   
    function handleSubmit(e){
        e.preventDefault();
        dispatch(postRecipes(input))
        alert('Receta creada exitosamente')   
       
    }

    useEffect(() => {
        dispatch(getTypes());
    }, [dispatch])
    
    return(
        <div>
            <Link to ='/home'><button className='btn2'>Volver</button></Link>
            <h1 className='titulo'>Crea tu receta</h1>
            <div className="hola">
            <form className='form' onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label>Nombre: </label>
                    <input type='text' value={input.nombre} name='nombre' onChange ={(e) => handleChange(e)} required></input>
                    
                </div>
                
                <div>
                    <label>Resumen del plato: </label>
                    <input type='text' value={input.resumenDelPlato} name='resumenDelPlato' onChange ={(e) => handleChange(e)} required></input>
                </div>
                <div>
                    <label>Imagen: </label>
                    <input type='text' value={input.imagen} name='imagen' onChange ={(e) => handleChange(e)}></input>
                </div>
                <div>
                    <label>Puntuacion: </label>
                    <input placeholder='0-100' type='number' value={input.puntuacion} name='puntuacion' min='0' max='100' onChange ={(e) => handleChange(e)}></input>
                </div>
                <div>
                    <label>Nivel saludable: </label>
                    <input placeholder='0-100' type='number' value={input.nivelSaludable} name='nivelSaludable' min='0' max='100' onChange ={(e) => handleChange(e)}></input>
                </div>
                <div>
                    <label>Paso a paso: </label>
                    <textarea rows='4'cols='50' value={input.pasoAPaso} name='pasoAPaso' onChange ={(e) => handleChange(e)}></textarea>
                </div>
                
                <div className="check" style={{display:'grid', gridTemplateColumns: '1fr 1fr 1fr', gridTemplateRows:'1fr 1fr 1fr', marginTop:15}}>     
                {
                    
                diet.map((nombre) => (
                            
                            <label >{nombre} <input type='checkbox' name={nombre} value={nombre} onChange={(e) => handleCheck(e)}/> </label>
                            ))}
                </div>
                <button type='submit' className='btn2'>Crear</button>
            </form>
            </div>
        </div>
    )

}