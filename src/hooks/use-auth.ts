import type { Usuario } from '@/interfaces/usuario';
import { instanceAxios } from '@/lib/axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

export default function useAuth() {
	const [user, setUser] = useState<Usuario | null>(null);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem('token');
		const hasUser = localStorage.getItem('usuario');

		if (token) {
			if (hasUser) {
				instanceAxios.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
				setIsAuthenticated(true);
				setUser(JSON.parse(hasUser) as Usuario);
			}
		}

		setIsLoading(false);
	}, []);

	async function handleLogin(url: string, data: any) {
		const {
			data: { token, usuario },
		} = await instanceAxios.post(url, data);

		localStorage.setItem('token', JSON.stringify(token));
		localStorage.setItem('Usuario', JSON.stringify(usuario));
		instanceAxios.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
		setUser(usuario);
		setIsAuthenticated(true);
		navigate('/');
	}

	async function handleLogout() {
    setUser(null)
		setIsAuthenticated(false);
		localStorage.removeItem('token');
		instanceAxios.defaults.headers.Authorization = null;
		navigate('/login');
	}

	return { isAuthenticated, isLoading, handleLogin, handleLogout, user };
}
