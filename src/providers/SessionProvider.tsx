import axios from 'axios';
import { FC, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const URL = import.meta.env.VITE_BACKEND_API;

const SessionProvider: FC<SessionProviderProps> = ({ children }) => {
	const { pathname } = useLocation();

	const checkSession = async () => {
		const localStorageData = JSON.parse(localStorage.getItem('tokens') || '');
		if (localStorageData) {
			if (localStorageData.accessTokenExpiration <= new Date().getTime()) {
				const { data: responseData } = await axios.patch(
					`${URL}/auth/refresh`,
					{
						refreshToken: localStorageData.refreshToken
					}
				);
				localStorage.removeItem('tokens');
				localStorage.setItem('tokens', JSON.stringify(responseData));
				window.location.reload();
			} else {
				console.log('accessToken живой!');
			}
		}
	};

	useEffect(() => {
		checkSession();
	}, [pathname]);

	return children;
};

export default SessionProvider;
