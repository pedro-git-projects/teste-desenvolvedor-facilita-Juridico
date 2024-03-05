import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Consultar from './pages/Consultar.tsx'
import Cadastrar from './pages/Cadastrar.tsx'
import Rota from './pages/Rota.tsx'
import NotFound from './pages/NotFound.tsx'
import { DarkModeProvider } from './components/state/DarkModeContext.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Consultar />
  },
  {
    path: '/consultar',
    element: <Consultar />
  },
  {
    path: '/cadastar',
    element: <Cadastrar />
  },
  {
    path: '/rotas',
    element: <Rota />
  },
  {
    path: "/*",
    element: <NotFound />
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
<DarkModeProvider>
  <RouterProvider router={router} />
</DarkModeProvider>
)
