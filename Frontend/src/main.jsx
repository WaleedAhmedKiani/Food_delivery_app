
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from "react-router-dom"
import StoreContextProvider from './components/context/StoreContext.jsx'
import ScrollToTop from './components/scroll/ScrollTop.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <ScrollToTop/>
    <StoreContextProvider>
      <App />
    </StoreContextProvider>

  </BrowserRouter>,
)
