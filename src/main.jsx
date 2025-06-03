import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './App.jsx'
import RootContext from './context/RootContext.jsx'

createRoot(document.getElementById('root')).render(
  <RootContext>
    <App />
  </RootContext>,
)
