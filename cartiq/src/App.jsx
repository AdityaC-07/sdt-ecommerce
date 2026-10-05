import { Routes, Route } from 'react-router-dom'
import { ROUTES } from './constants/routes'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Toast from './components/ui/Toast'
import SeniorModeOverlay from './components/features/SeniorModeOverlay'
import Home from './pages/customer/Home'
import NotFound from './pages/errors/NotFound'
import DesignProcess from './pages/DesignProcess'
import CaseStudy from './pages/info/CaseStudy'
import ErrorBoundary from './components/common/ErrorBoundary'

function App() {
  console.log('App component rendering')
  return (
    <ErrorBoundary>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path={ROUTES.HOME} element={<Home />} />
            <Route path={ROUTES.DESIGN_PROCESS} element={<DesignProcess />} />
            <Route path={ROUTES.CASE_STUDY} element={<CaseStudy />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <Toast />
        <SeniorModeOverlay />
      </div>
    </ErrorBoundary>
  )
}

export default App
