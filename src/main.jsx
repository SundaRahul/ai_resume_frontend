import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SignInPage from './auth/sign-in'
import Home from './Home'
import Dashboard from './Dashboard'
import {ClerkProvider} from '@clerk/clerk-react'
import EditResume from './Dashboard/Resume/[Resume_id]/edit'
import ViewResume from './my-resume/[Resume_id]/view'


const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
const router=createBrowserRouter([
  {
    element:<App/>,
    children:[
      {
        path:'/dashboard',
        element:<Dashboard/>
      },
      {
        path:'/dashboard/resume/:Resume_id/edit',
        element:<EditResume/>

      }
    ]
  },
  {
    path:'/',
    element:<Home/>
  },
  {
    path:'/auth/sign-in',
    element:<SignInPage/>
  },
  {
    path:'/my-resume/:Resume_id/view',
    element:<ViewResume/>
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} >
      <RouterProvider router={router}/>
    </ClerkProvider>
    
  </StrictMode>,
)
