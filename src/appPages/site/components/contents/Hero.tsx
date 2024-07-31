import './contents.scss';
import { Avatar } from '@mui/material';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../store/index';
import { fetchUserData } from '../../../../store/slices/authSlice';
import { uploadFile, getMyPost } from '../../../../store/slices/todosSlice';

const defaultProfileImage =
	'https://as2.ftcdn.net/v2/jpg/05/89/93/27/1000_F_589932782_vQAEAZhHnq1QCGu5ikwrYaQD0Mmurm0N.jpg';

const Hero = () => {
	const dispatch = useAppDispatch();

	const userData = useAppSelector((state) => state.auth);
	const todoData = useAppSelector((state) => state.todos);

	console.log('userData', userData);
	console.log('todoData', todoData);

	const [selectedFile, setSelectedFile] = useState<File | null>(null);

	useEffect(() => {
		dispatch(fetchUserData());
	}, [dispatch]);

	useEffect(() => {
		dispatch(getMyPost());
	}, [dispatch]);

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0] || null;
		setSelectedFile(file);
		if (file) {
			dispatch(uploadFile(file));
		}
	};

	const handleClick = () => {
		document.getElementById('fileInput')?.click();
	};

	return (
		<div id="hero">
			<div className="container">
				<div className="hero">
					<div className="addHistory" onClick={handleClick}>
						<input
							type="file"
							id="fileInput"
							style={{ display: 'none' }}
							onChange={handleFileChange}
						/>
						<div className="user">
							<span>+</span>
							<div>
								<Avatar
									src={
										selectedFile
											? todoData.post || defaultProfileImage
											: defaultProfileImage
									}
									sx={{ width: 56, height: 56 }}
								/>
							</div>
						</div>
						<p>Добавить в историю</p>
					</div>
					<div className="getHistory">
						<div className="user">
							<div>
								<Avatar
									src="https://cdn.pixabay.com/photo/2023/05/17/12/09/ai-generated-8000865_640.jpg"
									sx={{ width: 56, height: 56 }}
								/>
							</div>
						</div>
						<p>Текстовый пост</p>
					</div>
					<div className="getHistory">
						<div className="user">
							<div>
								<Avatar
									src="https://cdn.pixabay.com/photo/2023/05/17/12/09/ai-generated-8000865_640.jpg"
									sx={{ width: 56, height: 56 }}
								/>
							</div>
						</div>
						<p>Фотопост</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Hero;
