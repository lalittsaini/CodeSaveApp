import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/Home';
import Save from './components/Save';
import ViewSave from './components/ViewSave';
import ErrorPage from './components/ErrorPage';

const App = () => {
  const router = createBrowserRouter([
    {
    path: "*", 
    element: <ErrorPage />,
  },
    {
      path:"/",
      element:<>

      <Home/>
      <Save/>
      </>

    },
    {
      path:"/save",
      element:<>

      <Save/>
      </>

    },
    {
      path:"/save/:id",
      element:<>
      <ViewSave/>
      </>

    },
  ]);
  return (
    <div className=''>
      <RouterProvider router={router} />
      
    </div>
  )
}

export default App