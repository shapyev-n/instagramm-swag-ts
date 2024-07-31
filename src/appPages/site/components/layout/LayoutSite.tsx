import scss from './LayoutSite.module.scss';
import { Outlet, useLocation,  } from 'react-router-dom';


import SideBar from '../sidebar/SideBar';
import Footer from '../mobile/footer/Footer';
import Header from '../mobile/navbar/Header';

const LayoutSite = () => {
	const location = useLocation();
	const isRegisterPage =
		location.pathname === '/auth/sign-in' && '/auth/sign-up';



	return (
		<div className={scss.LayoutPage}>
			{!isRegisterPage && <SideBar />}

			<main>
				{!isRegisterPage && <Header />}
				<Outlet />
				{!isRegisterPage && <Footer />}
			</main>
		</div>
	);
};

export default LayoutSite;
