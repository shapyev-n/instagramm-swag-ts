import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import { useTheme } from '../../../../context/ThemeContext';

const video =
	'https://videos.pexels.com/video-files/4777883/4777883-hd_1080_1920_24fps.mp4';
const Card = () => {
	const { theme } = useTheme();

	const sxIcon = {
		color: theme === 'dark' ? '#fff ' : '#000',
		width: 25,
		height: 25
	};

	return (
		<div className="card">
			<div className="top">
				<img src="" alt="" />
				<div className="txt">
					<p>js_35 и motion_web</p>
					<p style={{ opacity: 0.6, fontSize: '14px' }}>Оригинальное видео</p>
				</div>
				<span>...</span>
			</div>
			<div className="media">
				<video src={video} autoPlay loop muted></video>
			</div>
			<div className="btns">
				<div className="left">
					<FavoriteBorderOutlinedIcon sx={sxIcon} />
					<ModeCommentOutlinedIcon sx={sxIcon} />
					<SendOutlinedIcon sx={sxIcon} />
				</div>
				<BookmarkBorderOutlinedIcon sx={sxIcon} />
			</div>
			<p>37 143 отметок "Нравится"</p>
			<p style={{ opacity: 0.6 }}>Посмотреть все комментарии (75)</p>
		</div>
	);
};

export default Card;
