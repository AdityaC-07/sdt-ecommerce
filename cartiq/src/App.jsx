import { Routes, Route } from 'react-router-dom'
import { ROUTES } from './constants/routes'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Toast from './components/ui/Toast'
import SeniorModeOverlay from './components/features/SeniorModeOverlay'
import Home from './pages/customer/Home'

function App() {
  console.log('App component rendering')
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path={ROUTES.HOME} element={<Home />} />
        </Routes>
      </main>
      <Footer />
      <Toast />
      <SeniorModeOverlay />
    </div>
  )
}

export default App
