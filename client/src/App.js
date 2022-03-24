import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import LandingPage from './components/LandinPage';
import Home from './components/Home';
import RecipeCreate from './components/RecipeCreate'
import Detail from './components/Detail';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
    <div >
      <Routes>
        <Route  path= '/' element= {<LandingPage/>}/>
        <Route  path= '/home' element= {<Home/>}/>
        <Route  path= '/recipe' element= {<RecipeCreate/>}/>
        <Route  path= '/recipes/:id' element= {<Detail/>}/>
      </Routes>
      
    </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
