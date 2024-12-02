import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './component/LoginAndRegister/Register'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './component/LoginAndRegister/Login';
import ProtectedRoute from './component/ProtectedRoute';
import Home from './component/Home';
import ViewCart from './component/Cart/ViewCart';
import AddDishes from './component/Admin/AddDishes';
import EditDish from './component/Admin/EditDish';
import ProfilePage from './component/ProfilePage';
import ViewOrder from './component/ViewOrder';
import RecentOrder from './component/RecentOrder';


function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path='/view-profile' element={<ProfilePage/>}/>
          <Route path='/orders' element={<ViewOrder/>}/>
          <Route path="/recent-order" element={<RecentOrder />} />
          <Route path="/view-cart" element={<ViewCart />} />
          <Route path="/edit-dish" element={<EditDish />} />
          <Route path="/add-dish" element={<AddDishes />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
