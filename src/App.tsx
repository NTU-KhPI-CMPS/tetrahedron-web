import { Route, HashRouter as Router, Routes } from 'react-router-dom'

import MainPage from '@/pages/MainPage'
import { ModalProvider } from '@/providers/ModalProvider'
import Navbar from './components/Navbar'
import ModelViewPage from './pages/ModelViewPage'

const App = () => {
  return (
    <Router>
      <div className="grid h-dvh grid-rows-1 text-coal-black md:grid-rows-[auto,1fr]">
        <Navbar />
        <Routes>
          <Route path="/" index element={<MainPage />} />
          <Route
            path="/model"
            index
            element={
              <ModalProvider>
                <ModelViewPage />
              </ModalProvider>
            }
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App
