import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { RouterProvider } from 'react-router-dom';
import { UserProvider } from './contexts/user.context';
import router from './router';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <UserProvider>
            <RouterProvider router={router}>
                <App />
            </RouterProvider>
        </UserProvider>
    </React.StrictMode>,
);
