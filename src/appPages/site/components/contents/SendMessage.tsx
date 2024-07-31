import './contents.scss';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import PhotoOutlinedIcon from '@mui/icons-material/PhotoOutlined';
import { Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../../../context/ThemeContext';

const SendMessage = () => {
	const { theme } = useTheme();
	const navigate = useNavigate();

	const iconColor = theme === 'dark' ? '#fff' : '#000';
	const sxIcon = {
		color: theme === 'dark' ? '#fff' : '#000',
		width: 25,
		height: 25
	};

	return (
		<div id="message">
			<div className="container">
				<div className="header" id={theme}>
					<div className="left">
						<ArrowBackOutlinedIcon
							sx={sxIcon}
							onClick={() => {
								navigate('/');
							}}
						/>
						<Avatar src="/broken-image.jpg" sx={sxIcon} />
						<p>JS 35</p>
					</div>
					<InfoOutlinedIcon sx={sxIcon} />
				</div>
				<div className="message">
					<div className="userInfo">
						<Avatar
							src="/broken-image.jpg"
							sx={{
								color: iconColor,
								width: 50,
								height: 50
							}}
						/>
						<p className="p">JS 35</p>
						<p>js35 • Instagram</p>
						<button
							style={{
								color: iconColor,
								background: theme === 'dark' ? '#ffffff3d' : '#0000004c'
							}}
						>
							Смотреть профиль
						</button>
					</div>
					<p className="info">
						Этот аккаунт не может получать ваши сообщения, так как его владелец
						не хочет получать новые запросы на переписку от всех пользователей.
					</p>
					<div className="user">
						<Avatar src="/broken-image.jpg" sx={sxIcon} />
						<p>
							Hello dear customer, I'm Elina from mtcgame support team. how can
							i assist you?
						</p>
					</div>
					<div className="user">
						<Avatar src="/broken-image.jpg" sx={sxIcon} />
						<p>Hello dear customer</p>
					</div>
				</div>
				<div className="footer" id={theme}>
					<div className="box">
						<input
							type="text"
							placeholder="Напишите сообщение..."
							style={{
								color: iconColor,
								padding: '0 15px'
							}}
						/>
						<PhotoOutlinedIcon sx={sxIcon} />
						<FavoriteBorderOutlinedIcon sx={sxIcon} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default SendMessage;
