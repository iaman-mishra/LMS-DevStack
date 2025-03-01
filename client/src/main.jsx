import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AppContextProvider } from './context/AppContext.js'

createRoot(document.getElementById('root')).render(
  <AppContextProvider>
    <App />
  </AppContextProvider>,
)
