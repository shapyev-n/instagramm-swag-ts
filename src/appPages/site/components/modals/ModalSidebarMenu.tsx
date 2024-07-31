import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import MonitorHeartOutlinedIcon from '@mui/icons-material/MonitorHeartOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import Brightness4OutlinedIcon from '@mui/icons-material/Brightness4Outlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useTheme } from '../../../../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../../../store/slices/authSlice';
import { useAppDispatch } from '../../../../store';

export default function ModalSidebarMenu({
	closeModal
}: ModalSidebarMenuProps) {
	const { theme, switchTheme } = useTheme();
	const dispatch = useAppDispatch();

	const navigate = useNavigate();

	const sxIcon = {
		color: theme === 'dark' ? '#fff' : '#000',
		width: 25,
		height: 25
	};

	return (
		<div className="menu" id={theme} onClick={closeModal}>
			<div className="top">
				<button>
					<SettingsOutlinedIcon sx={sxIcon} />
					Настройки
				</button>
				<button>
					<MonitorHeartOutlinedIcon sx={sxIcon} />
					Ваши действия
				</button>
				<button>
					<BookmarkBorderOutlinedIcon sx={sxIcon} />
					Сохраненное
				</button>
				<button onClick={() => switchTheme()}>
					<Brightness4OutlinedIcon sx={sxIcon} />
					Переключить режим
				</button>
				<button>
					<InfoOutlinedIcon sx={sxIcon} />
					Сообщение о проблеме
				</button>
			</div>
			<div className="center">
				<button
					onClick={() => {
						navigate('/auth/sign-in');
					}}
				>
					Переключение между акк.
				</button>
			</div>
			<button
				onClick={() => {
					dispatch(logoutUser());
					navigate('/auth/sign-in');
				}}
			>
				Выйти
			</button>
		</div>
	);
}
