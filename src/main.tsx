import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import Inscription from './pages/inscription'
import Dashbord from './pages/Dashboard'
import Connexion from './pages/connexion'
import App from './App'



import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/inscription",
    element: <Inscription />
  },
  {
    path: "/connexion",
    element: <Connexion />
  },
  {
    path: "/dashbord",
    element: <Dashbord/>
  },
  
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
