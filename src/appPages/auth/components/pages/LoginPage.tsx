import axios from 'axios';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';
import { useTheme } from '../../../../context/ThemeContext';
import './auth.scss';

import logoTxt from '../../../../assets/logoTxt.png';
import logoTxtWite from '../../../../assets/logoTxtWite.png';
import api from '../../../../helpers/api';

const LoginPage = () => {
	const { register, handleSubmit } = useForm<IFormUser>();
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const { theme, switchTheme } = useTheme();
	const navigate = useNavigate();

	const onSubmit: SubmitHandler<IFormUser> = async (data) => {
		try {
			const { data: responseData } = await api.post('/auth/sign-in', data);

			localStorage.setItem('tokens', JSON.stringify(responseData));
			navigate('/');
		} catch (error) {
			alert('Неверный емайл или пароль');
		}
	};

	// Интерцептор для обновления токена
	api.interceptors.response.use(
		(response) => response,
		async (error) => {
			const originalRequest = error.config;
			if (error.response?.status === 401 && !originalRequest._retry) {
				originalRequest._retry = true;
				const refreshToken = localStorage.getItem('refreshToken');
				try {
					const { data } = await axios.post(
						`${import.meta.env.VITE_BACKEND_API}/auth/refresh`,
						{ refreshToken }
					);
					localStorage.setItem('accessToken', data.accessToken);
					originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
					return axios(originalRequest);
				} catch (err) {
					console.error('Не удалось обновить токен', err);
					localStorage.removeItem('accessToken');
					localStorage.removeItem('refreshToken');
					localStorage.removeItem('accessTokenExpiration');
					navigate('/auth/sign-in');
				}
			}
			return Promise.reject(error);
		}
	);

	// ? STYLES
	const borderInp = {
		border: theme === 'dark' ? 'solid 1px #a09f9f57' : 'solid 1px #000'
	};
	const sxIcon = {
		position: 'absolute',
		right: 10,
		top: '10px',
		cursor: 'pointer'
	};

	const line = {
		border: theme === 'dark' ? '1px solid #fff' : '1px solid #000',
		opacity: '0.5',
		width: '50%'
	};

	return (
		<div id="register" className={theme}>
			<div className="container">
				<div className="registerTop" style={borderInp}>
					<img
						className="logoTxt"
						src={theme === 'dark' ? logoTxtWite : logoTxt}
						alt="instagram"
						onClick={switchTheme}
					/>
					<button onClick={() => navigate('/')}>Войти через Facebook</button>
					<div className="or">
						<div className="line" style={line}></div>
						<p>ИЛИ</p>
						<div className="line" style={line}></div>
					</div>
					<form onSubmit={handleSubmit(onSubmit)}>
						<input
							style={borderInp}
							type="email"
							placeholder="email"
							{...register('email', {
								required: true,
								pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
							})}
						/>
						<div className="pass">
							<input
								style={borderInp}
								type={showPassword ? 'text' : 'password'}
								placeholder="password"
								{...register('password', { required: true })}
							/>
							<div onClick={() => setShowPassword(!showPassword)}>
								{showPassword ? (
									<VisibilityOffIcon sx={sxIcon} />
								) : (
									<VisibilityIcon sx={sxIcon} />
								)}
							</div>
							<Link to={'/auth/forgot'}>Забыли пароль?</Link>
						</div>
						<button>Войти</button>
					</form>
				</div>
				<div className="registerBottom" style={borderInp}>
					<p>
						Нет аккаунта?
						<Link to={'/auth/sign-up'}> Зарегистрируйтесь!</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
