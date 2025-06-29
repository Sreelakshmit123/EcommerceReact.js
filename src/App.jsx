import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './Components/Home'
import MobileTablet from './Pages/MobileTablet'
import MobileProductCard from './Pages/MobileProductCard'
import Wishlist from './Components/Wishlist'
import AddToCart from './Components/AddToCart'
import ProductView from './Components/ProductView'
import '/MobileTablet.css'
import './Wishlist.css'
import './AddToCart.css'
import './ProductView.css'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/mobiletablet' element={<MobileTablet />} />
        <Route path="/filtered-products" element={<MobileProductCard />} />
        <Route path='/wishlist' element={<Wishlist />} />
        <Route path='/shoppingCart' element={<AddToCart />} />
        <Route path='/product-view' element={<ProductView />} />
      </Routes>
    </>
  )
}

export default App
