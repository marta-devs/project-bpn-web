import { createBrowserRouter } from 'react-router';
import { Home } from './pages/Home';
import { Login } from './pages/auth/login';
import { AuthLayout } from './context/auth-context';
import { Example } from './pages/example';

export const router = createBrowserRouter([
	{
		path: '/login',
		Component: Login,
	},
  {
		path: '/example',
		Component: Example,
	},
	{
		path: '/',
		Component: AuthLayout,
		children: [{ index: true, Component: Home }],
	},
]);
