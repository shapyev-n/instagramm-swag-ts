import { useState } from 'react';
import './auth.scss';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import logoTxt from '../../../../assets/logoTxt.png';
import logoTxtWite from '../../../../assets/logoTxtWite.png';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../../../context/ThemeContext';
import { Link } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import api from '../../../../helpers/api';
import { useAppDispatch, useAppSelector } from '../../../../store';
import { registerUser } from '../../../../store/slices/authSlice';

const Register = () => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors }
	} = useForm<IFormUser>();

	const [showPassword, setShowPassword] = useState<boolean>(false);
	const { theme, switchTheme } = useTheme();

	const navigate = useNavigate();
	const password = watch('password');

	const dispatch = useAppDispatch();
	const { status, error } = useAppSelector((state) => state.auth);

	console.log('state.auth', status, error);

	const onSubmit: SubmitHandler<IFormUser> = async (data) => {
		const formData = new FormData();
		formData.append('file', data.photo[0]);

		try {
			const { data: responseImage } = await api.post('/upload/file', formData);

			const newData = {
				email: data.email,
				password: data.password,
				username: data.username,
				photo: responseImage.url
			};

			const resultAction = await dispatch(registerUser(newData));

			if (registerUser.fulfilled.match(resultAction)) {
				alert('Регистрация прошла успешно');
				navigate('/');
			} else {
				if (resultAction.payload) {
					alert(resultAction.payload);
				} else {
					alert('Не удалось зарегистрироваться');
				}
			}
		} catch (error) {
			alert(`Произошла ошибка при регистрации:\n ${error}`);
		}
	};

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
					<h3>Зарегистрируйтесь, чтобы смотреть фото и видео ваших друзей.</h3>
					<button
						type="button"
						onClick={() => {
							navigate('/');
						}}
					>
						Войти через Facebook
					</button>
					<div className="or">
						<div className="line" style={line}></div>
						<p>ИЛИ</p>
						<div className="line" style={line}></div>
					</div>
					<form onSubmit={handleSubmit(onSubmit)}>
						<input type="file" {...register('photo', { required: true })} />
						{errors.photo && <span>Фотография обязательна</span>}

						<input
							style={borderInp}
							type="email"
							placeholder="Email"
							{...register('email', {
								required: 'Email обязателен',
								pattern: {
									value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
									message: 'Неверный формат email'
								}
							})}
						/>
						{errors.email && <span>{errors.email.message}</span>}

						<input
							style={borderInp}
							type="text"
							placeholder="Имя пользователя"
							{...register('username', {
								required: 'Имя пользователя обязательно'
							})}
						/>
						{errors.username && <span>{errors.username.message}</span>}

						<div className="pass">
							<input
								style={borderInp}
								type={showPassword ? 'text' : 'password'}
								placeholder="Пароль"
								{...register('password', { required: 'Пароль обязателен' })}
							/>
							{errors.password && <span>{errors.password.message}</span>}

							<span onClick={() => setShowPassword(!showPassword)}>
								{showPassword ? (
									<VisibilityOffIcon sx={sxIcon} />
								) : (
									<VisibilityIcon sx={sxIcon} />
								)}
							</span>
						</div>

						<div className="pass">
							<input
								style={borderInp}
								type={showPassword ? 'text' : 'password'}
								placeholder="Подтверждение пароля"
								{...register('confirmPassword', {
									required: 'Подтверждение пароля обязательно',
									validate: (value) =>
										value === password || 'Пароль не совпадает'
								})}
							/>
							{errors.confirmPassword && (
								<span>{errors.confirmPassword.message}</span>
							)}

							<span onClick={() => setShowPassword(!showPassword)}>
								{showPassword ? (
									<VisibilityOffIcon sx={sxIcon} />
								) : (
									<VisibilityIcon sx={sxIcon} />
								)}
							</span>
						</div>

						<p>
							Люди, которые пользуются нашим сервисом, могли загрузить вашу
							контактную информацию в Instagram.
							<Link to="" style={{ marginLeft: '5px' }}>
								Подробнее
							</Link>
						</p>
						<p>
							Регистрируясь, вы принимаете наши
							<Link to="" style={{ marginLeft: '5px' }}>
								Условия, Политику конфиденциальности и Политику в отношении
								файлов cookie.
							</Link>
						</p>
						<button type="submit">Регистрация</button>
					</form>
				</div>
				<div className="registerBottom" style={borderInp}>
					<p>
						Есть аккаунт?
						<Link to={'/auth/sign-in'}> Вход</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Register;
