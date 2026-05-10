import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { AppContextProvider} from './Context/AppContext'



createRoot(document.getElementById('root')!).render(
  <AppContextProvider>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </AppContextProvider>
)
