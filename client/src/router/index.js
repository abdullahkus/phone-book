import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/main-layout';
import AuthLayout from '../layouts/auth-layout';
import Login from '../pages/auth/login';
import Register from '../pages/auth/register';
import PrivateRoute from '../components/private-route';
import PhoneBookList from '../pages/directory/directory-list';
import App from '../App';

const routes = createBrowserRouter([
    {
        element: <AuthLayout />,
        path: '/auth',
        children: [
            {
                children: [
                    {
                        path: 'register',
                        element: <Register />,
                    },
                    {
                        path: 'login',
                        element: <Login />,
                    },
                ],
            },
        ],
    },
    {
        element: <MainLayout />,
        path: '/',
        children: [
            {
                children: [
                    {
                        index: true,
                        element: <PrivateRoute component={App} />,
                    },
                    {
                        path: '/directories',
                        element: <PrivateRoute component={PhoneBookList} />,
                    },
                ],
            },
        ],
    },
]);

export default routes;
