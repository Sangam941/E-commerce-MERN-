import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { CustomerLayout } from './components/customer/layout/CustomerLayout'
import { AdminLayout } from './components/admin/layout/AdminLayout'
import HomePage from './pages/customer/HomePage'
import ProductDetailsPage from './pages/customer/ProductDetailsPage'
import CartPage from './pages/customer/CartPage'
import WishlistPage from './pages/customer/WishlistPage'
import OrdersPage from './pages/customer/OrdersPage'
import ProfilePage from './pages/customer/ProfilePage'
import AdminDashboardPage from './pages/admin/AdminDashboardPage'
import "./index.css";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to='/customer/home' replace />} />

        <Route path='/customer' element={<CustomerLayout />}>
          <Route index element={<Navigate to='home' replace />} />
          <Route path='home' element={<HomePage />} />
          <Route path='product/:productId' element={<ProductDetailsPage />} />
          <Route path='cart' element={<CartPage />} />
          <Route path='wishlist' element={<WishlistPage />} />
          <Route path='orders' element={<OrdersPage />} />
          <Route path='profile' element={<ProfilePage />} />
        </Route>

        <Route path='/admin' element={<AdminLayout />}>
          <Route index element={<AdminDashboardPage />} />
        </Route>

        <Route path='*' element={<Navigate to='/customer/home' replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
