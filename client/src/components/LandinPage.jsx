import React from 'react';
import {Link} from 'react-router-dom';
import '../../src/landing.css';
import videocomida from './videocomida.mp4';

export default function LandingPage(){
    return(
        
        <div id='hero'>
            
            
            
            
            <div className='promo'>
            <h1 className='h1'> Bienvenidos <p></p> The Good Food </h1>
           
            <Link to ='/home'>
                <button className='btna'> <span>Ingresar</span></button>
            </Link>
            </div>
            <video muted autoPlay loop 
            >
                <source src={videocomida} type='video/mp4'/>
            </video>
            <div className='capa'></div>
            
            
        </div>
        
    )
}