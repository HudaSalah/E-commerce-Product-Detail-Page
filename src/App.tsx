import { CartDrawer } from './components/cart/CartDrawer'
import { Header } from './components/layout/Header'
import ProductPage from './pages/ProductPage'

export default function App() {
  return (
    <>
      <Header />
      <ProductPage />
      <CartDrawer />
    </>
  )
}