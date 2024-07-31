import './style.scss';
import InstagramIcon from '@mui/icons-material/Instagram';
import logoTxt from '../../../../assets/logoTxt.png';
import logoTxtWite from '../../../../assets/logoTxtWite.png';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import SubscriptionsOutlinedIcon from '@mui/icons-material/SubscriptionsOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import { Avatar } from '@mui/material';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '../../../../context/ThemeContext';
import ModalSidebarMenu from '../modals/ModalSidebarMenu';
import { useEffect, useState } from 'react';
import Profil from '../modals/Profil';
import { useAppDispatch, useAppSelector } from '../../../../store';
import { fetchUserData } from '../../../../store/slices/authSlice';

const SideBar = () => {
	const { theme } = useTheme();
	const navigate = useNavigate();
	const [modal, setModal] = useState(false);
	const [modalProfil, setModalProfil] = useState(false);
	const dispatch = useAppDispatch();

	const { user, isAuth, error } = useAppSelector((state) => state.auth);
	const todoData = useAppSelector((state) => state.todos);

	console.log(error);
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

	function closeModal() {
		setModal(false);
	}
	function openModal() {
		setModal(true);
	}

	// ?STYLES
	const sxIcon = {
		color: theme === 'dark' ? '#fff' : '#000',
		width: 30,
		height: 30
	};

	return (
		<>
			<div
				className="SideBar"
				id={theme}
				style={{
					borderRight:
						theme === 'dark' ? 'solid 1px #a09f9f57' : 'solid 1px #000'
				}}
			>
				<div className="container">
					<div className="sideBar">
						<div className="box">
							<div className="header" id={theme}>
								<div className="icon_ista">
									<InstagramIcon
										onClick={() => {
											navigate('/');
										}}
										sx={{
											sxIcon,
											paddingLeft1: '10px'
										}}
									/>
								</div>
								<img
									className="logoTxt"
									src={theme === 'dark' ? logoTxtWite : logoTxt}
									alt="instagram"
									onClick={() => {
										navigate('/');
									}}
								/>
							</div>
							<nav>
								<button
									onClick={() => {
										navigate('/');
									}}
								>
									<HomeIcon sx={sxIcon} />
									<span>Главная</span>
								</button>
								<button
									onClick={() => {
										navigate('/');
									}}
								>
									<SearchIcon sx={sxIcon} />
									<span>Поисковый запрос</span>
								</button>
								<button
									onClick={() => {
										navigate('/');
									}}
								>
									<ExploreOutlinedIcon sx={sxIcon} />
									<span>Интересное</span>
								</button>
								<button
									onClick={() => {
										navigate('/');
									}}
								>
									<SubscriptionsOutlinedIcon sx={sxIcon} />
									<span>Reels</span>
								</button>
								<button
									onClick={() => {
										navigate('/sendMessage');
									}}
								>
									<SendOutlinedIcon sx={sxIcon} />
									<span>Сообщения</span>
								</button>
								<button>
									<FavoriteBorderOutlinedIcon sx={sxIcon} />
									<span>Уведомления</span>
								</button>
								<button>
									<AddBoxOutlinedIcon sx={sxIcon} />
									<span>Создать</span>
								</button>
								{isAuth ? (
									<button
										onClick={() => {
											openModalprofil();
										}}
									>
										<Avatar
											src={user ? user?.photo : '/broken-image.jpg'}
											sx={{ width: 30, height: 30 }}
										/>
										<span>Профиль</span>
									</button>
								) : (
									<button
										onClick={() => {
											navigate('/auth/sign-in');
										}}
									>
										<Avatar
											src="/broken-image.jpg"
											sx={{ width: 30, height: 30 }}
										/>
										<span>Профиль</span>
									</button>
								)}
							</nav>
						</div>
						<div className="footer" id={theme}>
							<button onClick={() => openModal()}>
								<MenuIcon sx={sxIcon} />
								<span>Ещё</span>
							</button>
						</div>
					</div>
				</div>
			</div>
			{modalProfil ? <Profil closeModalprofil={closeModalprofil} /> : null}
			{modal ? <ModalSidebarMenu closeModal={closeModal} /> : null}
		</>
	);
};

export default SideBar;
