import '../mobile.scss';
import { useNavigate } from 'react-router-dom';
import logoTxt from '../../../../../assets/logoTxt.png';
import logoTxtWite from '../../../../../assets/logoTxtWite.png';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import { useTheme } from '../../../../../context/ThemeContext';

const Header = () => {
	const { theme } = useTheme();
	const navigate = useNavigate();

	const iconColor = theme === 'dark' ? '#fff' : '#000';

	return (
		<header id={theme}>
			<div className="container">
				<div className="header">
					<img
						className="logoTxt"
						src={theme === 'dark' ? logoTxtWite : logoTxt}
						alt="instagram"
						onClick={() => {
							navigate('/');
						}}
					/>
					<nav>
						<AddBoxOutlinedIcon
							sx={{
								color: iconColor,
								width: 25,
								height: 25
							}}
						/>
						<FavoriteBorderOutlinedIcon
							sx={{
								color: iconColor,
								width: 25,
								height: 25
							}}
						/>
					</nav>
				</div>
			</div>
		</header>
	);
};

export default Header;
