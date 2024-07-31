import { SubmitHandler, useForm } from 'react-hook-form';
import { useTheme } from '../../../../context/ThemeContext';
import LockResetOutlinedIcon from '@mui/icons-material/LockResetOutlined';
import './auth.scss';
import { useNavigate, useSearchParams } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../store/index';
import { resetPassword } from '../../../../store/slices/authSlice';

export default function ResetPasswordPage() {
	const { theme, switchTheme } = useTheme();
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors }
	} = useForm<IFormResetPassword>();

	const { status, error } = useAppSelector((state) => state.auth);
	const [showPassword, setShowPassword] = useState<boolean>(false);

	const [searchParams] = useSearchParams();
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const password = watch('newPassword');
	const getToken = searchParams.get('token');

	const onSubmit: SubmitHandler<IFormResetPassword> = async (data) => {
		const newData = {
			token: getToken,
			newPassword: data.newPassword
		};
		try {
			const resultAction = await dispatch(resetPassword(newData));
			if (resetPassword.fulfilled.match(resultAction)) {
				alert('Пароль успешно сброшен');
				navigate('/auth/sign-in');
			} else {
				if (resultAction.payload) {
					alert(resultAction.payload);
				} else {
					alert('Не удалось сбросить пароль');
				}
			}
		} catch (error) {
			alert('Произошла ошибка при сбросе пароля');
		}
	};

	useEffect(() => {
		if (status === 'failed' && error) {
			alert(error);
		}
	}, [status, error]);

	// ? STYLES
	const borderInp = {
		border: theme === 'dark' ? 'solid 1px #a09f9f57' : 'solid 1px #000'
	};

	const sxIcon = {
		color: theme === 'dark' ? '#fff' : '#000',
		width: 40,
		height: 40,
		margin: 'auto'
	};

	const sxIconPass = {
		position: 'absolute',
		right: 10,
		top: '10px',
		cursor: 'pointer'
	};

	const raius = {
		width: '70px',
		height: '70px',
		borderRadius: '50%',
		border: theme === 'dark' ? '2px solid #fff' : '2px solid #000',
		display: 'flex',
		opacity: '0.6'
	};

	return (
		<div id="forgot" className={theme}>
			<div className="container">
				<div className="registerTop" style={borderInp}>
					<div style={raius} onClick={switchTheme}>
						<LockResetOutlinedIcon sx={sxIcon} />
					</div>
					<h2>Создайте надежный пароль</h2>
					<p>
						Пароль должен содержать не менее 6 символов, включая цифры, буквы и
						специальные символы (!$@%).
					</p>
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="pass">
							<input
								style={borderInp}
								type={showPassword ? 'text' : 'password'}
								placeholder="Новый пароль"
								{...register('newPassword', { required: true })}
							/>
							{errors.newPassword && <span>{errors.newPassword.message}</span>}

							<span onClick={() => setShowPassword(!showPassword)}>
								{showPassword ? (
									<VisibilityOffIcon sx={sxIconPass} />
								) : (
									<VisibilityIcon sx={sxIconPass} />
								)}
							</span>
						</div>
						<div className="pass">
							<input
								style={borderInp}
								type={showPassword ? 'text' : 'password'}
								placeholder="Введите новый пароль ещё раз"
								{...register('newPasswordConfirm', {
									required: true,
									validate: (value) =>
										value === password || 'Пароль не совпадает'
								})}
							/>
							{errors.newPasswordConfirm && (
								<span>{errors.newPasswordConfirm.message}</span>
							)}

							<span onClick={() => setShowPassword(!showPassword)}>
								{showPassword ? (
									<VisibilityOffIcon sx={sxIconPass} />
								) : (
									<VisibilityIcon sx={sxIconPass} />
								)}
							</span>
						</div>
						<button type="submit">Сбросить пароль</button>
					</form>
					<span onClick={() => navigate('/auth/sign-in')}>Вернуться</span>
				</div>
			</div>
		</div>
	);
}
