import { CartDrawer } from './components/cart/CartDrawer'
import { Footer } from './components/layout/Footer'
import { Header } from './components/layout/Header'
import {ProductPage} from './pages/ProductPage'

export default function App() {
  return (
    <>
      <Header />
      <ProductPage />
      <Footer />
      <CartDrawer />
    </>
  )
}