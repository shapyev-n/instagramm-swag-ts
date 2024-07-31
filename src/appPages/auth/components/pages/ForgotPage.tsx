import { SubmitHandler, useForm } from 'react-hook-form';
import { useTheme } from '../../../../context/ThemeContext';
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';
import './auth.scss';

import api from '../../../../helpers/api';
import { Link, useNavigate } from 'react-router-dom';

const helpers = 'https://help.instagram.com/374546259294234';

export default function ForgotPage() {
	const { theme, switchTheme } = useTheme();
	const { register, handleSubmit } = useForm<IFormUser>();
	const navigate = useNavigate();

	const onSubmit: SubmitHandler<IFormUser> = async (data) => {
		try {
			const requestData = {
				email: data.email,
				frontEndUrl: window.location.href
			};

			const { data: responseData } = await api.post(
				'/auth/forgot',
				requestData
			);

			console.log('responseData', responseData);
			alert('Ссылка для восстановления доступа была отправлена на вашу почту.');
		} catch (error) {
			alert(error);
		}
	};

	// ? STYLES
	const borderInp = {
		border: theme === 'dark' ? 'solid 1px #a09f9f57' : 'solid 1px #000'
	};
	const border = {
		border: theme === 'dark' ? 'solid 3px #a09f9f57' : 'solid 3px #3d3d3da9'
	};
	const sxIcon = {
		color: theme === 'dark' ? '#fff' : '#000',
		width: 80,
		height: 80,
		margin: 'auto'
	};

	const line = {
		border: theme === 'dark' ? '1px solid #fff' : '1px solid #000',
		opacity: '0.5',
		width: '50%'
	};

	const raius = {
		width: '140px',
		height: '140px',
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
						<HttpsOutlinedIcon sx={sxIcon} />
					</div>
					<h2>Не удается войти?</h2>
					<p>
						Введите свой электронный адрес, имя пользователя или номер телефона,
						и мы отправим вам ссылку для восстановления доступа к аккаунту.
					</p>

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
						<button type="submit">Получить ссылку для входа</button>
					</form>
					<Link
						to={helpers}
						style={{
							fontSize: '13px'
						}}
					>
						Не можете сбросить пароль?
					</Link>
					<div className="or">
						<div className="line" style={line}></div>
						<p>ИЛИ</p>
						<div className="line" style={line}></div>
					</div>
					<span onClick={() => navigate('/auth/sign-up')}>
						Создать новый аккаунт
					</span>
				</div>
				<div
					className="registerBottom"
					style={border}
					onClick={() => navigate('/auth/sign-in')}
				>
					<strong>Вернуться к входу</strong>
				</div>
			</div>
		</div>
	);
}
