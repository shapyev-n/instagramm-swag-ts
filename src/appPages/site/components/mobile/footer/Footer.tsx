import '../mobile.scss';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import SubscriptionsOutlinedIcon from '@mui/icons-material/SubscriptionsOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import { Avatar } from '@mui/material';
import { useTheme } from '../../../../../context/ThemeContext';
import { useEffect, useState } from 'react';
import Profil from '../../modals/Profil';
import { useAppDispatch, useAppSelector } from '../../../../../store';
import { fetchUserData } from '../../../../../store/slices/authSlice';

const Footer = () => {
	const { theme } = useTheme();
	const [modalProfil, setModalProfil] = useState(false);
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const userData = useAppSelector((state) => state.auth);
	const todoData = useAppSelector((state) => state.todos);

	console.log('todoData', todoData);

	useEffect(() => {
		dispatch(fetchUserData());
	}, [dispatch]);

	function closeModalprofil() {
		setModalProfil(false);
	}
	function openModalprofil() {
		setModalProfil(true);
	}

	const sxIxon = {
		color: theme === 'dark' ? '#fff' : '#000',
		width: 25,
		height: 25
	};

	return (
		<footer
			id={theme}
			style={{
				borderTop: theme === 'dark' ? 'solid 1px #a09f9f57' : 'solid 1px #000'
			}}
		>
			<div className="container">
				<div className="footer">
					<HomeIcon
						sx={sxIxon}
						onClick={() => {
							navigate('/');
						}}
					/>
					<SearchIcon
						sx={sxIxon}
						onClick={() => {
							navigate('/');
						}}
					/>
					<SubscriptionsOutlinedIcon
						sx={sxIxon}
						onClick={() => {
							navigate('/');
						}}
					/>
					<SendOutlinedIcon
						sx={sxIxon}
						onClick={() => {
							navigate('/sendMessage');
						}}
					/>
					{userData.isAuth ? (
						<Avatar
							src={userData?.user ? userData.user.photo : '/broken-image.jpg'}
							sx={sxIxon}
							onClick={() => {
								openModalprofil();
							}}
						/>
					) : (
						<Avatar
							src="/broken-image.jpg"
							sx={sxIxon}
							onClick={() => {
								navigate('/auth/sign-in');
							}}
						/>
					)}
				</div>
			</div>
			{modalProfil ? <Profil closeModalprofil={closeModalprofil} /> : null}
		</footer>
	);
};

export default Footer;
