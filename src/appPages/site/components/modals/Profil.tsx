import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './modals.scss';
import { useAppDispatch, useAppSelector } from '../../../../store';
import { fetchUserData, logoutUser } from '../../../../store/slices/authSlice';

const profilImg =
	'https://as2.ftcdn.net/v2/jpg/05/89/93/27/1000_F_589932782_vQAEAZhHnq1QCGu5ikwrYaQD0Mmurm0N.jpg';

export default function Profil({ closeModalprofil }: ModalFooterMenuProps) {
	const { user, isAuth, error } = useAppSelector((state) => state.auth);

	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const [now, setNow] = useState(new Date());
	useEffect(() => {
		const intervalId = setInterval(() => setNow(new Date()), 1000);
		return () => clearInterval(intervalId);
	}, []);

	// Извлекаем время истечения срока действия токена из localStorage
	const tokens = localStorage.getItem('tokens');
	const accessTokenExpiration = tokens
		? JSON.parse(tokens).accessTokenExpiration
		: null;
	const tokenExpirationTime = accessTokenExpiration
		? new Date(Number(accessTokenExpiration)).toLocaleTimeString()
		: 'N/A';

	useEffect(() => {
		if (isAuth) {
			dispatch(fetchUserData());
		}
	}, [dispatch, isAuth]);

	console.log(error);

	return (
		<div id="profil">
			{isAuth ? (
				<div className="profil_content">
					<table style={{ margin: 'auto', width: '100%' }}>
						<tr>
							<td style={{ paddingRight: '10px' }}>Токен действителен до:</td>
							<td>{tokenExpirationTime}</td>
						</tr>
						<tr>
							<td>Время сейчас:</td>
							<td>{now.toLocaleTimeString()}</td>
						</tr>
					</table>
					<div className="user_info">
						<div className="img">
							<img
								src={user?.photo !== 'string' ? user?.photo : profilImg}
								alt=""
							/>
						</div>
						<div className="txt">
							<p>{user?.email}</p>
							<p>{user?.username}</p>
							<button
								className="logout"
								onClick={() => {
									dispatch(logoutUser());
									navigate('/auth/sign-in');
								}}
							>
								выйти
							</button>
						</div>
					</div>

					<button className="close" onClick={() => closeModalprofil()}>
						закрыть окно
					</button>
				</div>
			) : (
				<div className="profil_content">
					<p style={{ margin: 'auto' }}>loadind...</p>
				</div>
			)}
		</div>
	);
}
