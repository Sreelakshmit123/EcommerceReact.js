import { Routes , Route } from 'react-router-dom'
import './App.css'
import Home from './Components/Home'
import MobileTablet from './Pages/MobileTablet'
import '/MobileTablet.css'
function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/mobiletablet' element={<MobileTablet/>}/>
      </Routes>
    </>
  )
}

export default App
