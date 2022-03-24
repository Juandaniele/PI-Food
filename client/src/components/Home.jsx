import React from 'react';
import {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getRecipes, orderByName, filterDiets, orderByScore} from '../actions';
import {Link, resolvePath} from 'react-router-dom';
import Card from './Card';
import Paginado from './Paginado';
import SearchBar from './SearchBar';
import '../../src/Home.css';

export default function Home(){

const dispatch = useDispatch()
const allRecipes = useSelector ((state) => state.allRecipes)
const [orden, setOrden] = useState('')
const [currentPage, setCurrentPage] = useState(1)
const [recipesPerPage, setRecipesPerPage] = useState(12)
const indexLastRecipe = currentPage * recipesPerPage
const indexFirstRecipe = indexLastRecipe - recipesPerPage
const currentRecipes = allRecipes.slice(indexFirstRecipe, indexLastRecipe)

const paginado = (pageNumber) => {
    setCurrentPage(pageNumber)
}

useEffect(() =>{
    dispatch(getRecipes())
},[dispatch])

function handleSort(e){
    e.preventDefault();
    dispatch(orderByName(e.target.value))
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`)
}
function handleSortScore(e){
    e.preventDefault();
    dispatch(orderByScore(e.target.value))
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`)
}

function handleFilterDiets(e){
    e.preventDefault();
    dispatch(filterDiets(e.target.value))
}
return(
    <div >
        {currentRecipes ?
        <div>
            <div style={{display:'grid', gridTemplateColumns: '1fr 1fr ', gridTemplateRows:'1fr', }}>
        <h1 className='tituloHome'>The Good Food</h1>
        
            
            <Link to = '/recipe'>
                <button className='btn'> Crear receta </button>            
                </Link>
                
                </div>
        <div style={{display:'inline-block', alignItems:'center', width:'60%', marginLeft:'100px', marginTop:"50px" }}>
        <div className='contendorFiltros' style={{display:'grid', gridTemplateColumns: '1fr 1fr 1fr', gridTemplateRows:'1fr'}}>
            <div className='puntuacion' style={{display:'grid', gridTemplateColumns: '1fr', gridTemplateRows:'1fr', }}>
            <label >Ordenar por puntuacion</label>
        <select className='btn' onClick={e => {handleSortScore(e)}}>
                <option value = 'min' >0-100</option>
                <option value = 'may'>100-0</option>
            </select>
            </div>
            <div className='alfabeticamente' style={{display:'grid', gridTemplateColumns: '1fr', gridTemplateRows:'1fr', }}>
            <label >Ordenar alfabeticamente</label>
        <select className='btn' onClick={e => {handleSort(e)}}>
                <option value = 'asc' >A-Z</option>
                <option value = 'desc'>Z-A</option>
            </select>
            </div>
            <div className='recetas' style={{display:'grid', gridTemplateColumns: '1fr', gridTemplateRows:'1fr', }}>
            <label >Filtrar por tipo de recetas</label>
            <select className='btn' onChange={e => handleFilterDiets(e)}>
                <option value ='todas'>Todas</option>
                <option value ='vegetarian'>Vegetarian</option>
                <option value ='vegan'>Vegan</option>
                <option value ='lacto ovo vegetarian'>Ovo vegetarian</option>
                <option value ='gluten free'>Gluten free </option>
                <option value ='dairy free'>Dairy free </option>
                <option value ='pescatarian'>Pescatarian </option>
                <option value ='paleolithic'>Paleolithic </option>
                <option value ='primal'>Primal </option>
                <option value ='fodmap frindly'>Fodmap frindly </option>
                <option value ='whole30'>Whole 30 </option>
            </select>
            </div>
            </div>
            </div>
            <SearchBar/>
            <Paginado
            recipesPerPage= {recipesPerPage}
            allRecipes={allRecipes.length}
            paginado= {paginado} />
        
        <div style={{display:'grid', gridTemplateColumns: '1fr 1fr 1fr', gridTemplateRows:'1fr 1fr 1fr', }}>
            
         { 
           currentRecipes?.map( e =>{
            
            let dietsArray = function() {
            let aux = [];
            if(e.types.length <= 0) return aux = "No incluye dietas";
            if(e.types[0].nombre){
            aux = e.types.map(el => {
            return el.nombre
            })
            return aux.join(", ");
            }
            else{ 
            aux = e.types;
            return aux.join(", ");
           } 
           
        }   
        
            return (
               <div key={e.id}  style={{alignItems: 'center', display: 'flex', justifyContent: 'center', 
                
                }}>
                    
                   <Card id={e.id} imagen={e.imagen ? e.imagen : 'https://media.istockphoto.com/photos/arabic-and-middle-eastern-dinner-table-hummus-tabbouleh-salad-salad-picture-id1175505781?k=20&m=1175505781&s=612x612&w=0&h=STomby2lCtcvpl_hxK6RhknQQWrkvpkHcoDLD4zttFk=' } nombre={e.nombre} tipoDeDieta={dietsArray()} puntuacion={e.puntuacion}/>
                   
                   </div>
                   )
           })
          }
        </div> </div> : <p>Loading</p>
} 
    </div>
    )
}