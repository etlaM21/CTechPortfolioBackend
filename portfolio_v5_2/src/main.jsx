import React from 'react'
import ReactDOM from 'react-dom/client'

import {
    RouterProvider,
    createBrowserRouter
} from 'react-router-dom'

import App from './App'
import Home from './components/Home.jsx'
import Project from './components/Project.jsx'
import About from './components/About.jsx'
import NotFound from './components/NotFound.jsx'

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <NotFound />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/about',
                element: <About />,
            },
            {
                path: '/project/:id',
                element: <Project />,
            }
        ]
    }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router}>
        <App />
    </RouterProvider>
)
