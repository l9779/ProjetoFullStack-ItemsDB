import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Layout from './components/Layout';
import Error from './components/Error';
import HomePage from './pages/Home';
import ItemListPage from './pages/ItemsList';
import LoginPage from './pages/Login';
import Notfound from './pages/NotFound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '*', element: <Notfound /> },
      { path: '/', element: <HomePage /> },
      { path: 'login', element: <LoginPage />, errorElement: <Error /> },
      { path: 'list', element: <ItemListPage />, errorElement: <Error /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
