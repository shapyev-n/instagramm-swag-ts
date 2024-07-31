import { Outlet } from 'react-router-dom';

const LayoutAuth = () => {
	return (
		<div>
			<main>
				<Outlet />
			</main>
		</div>
	);
};

export default LayoutAuth;
