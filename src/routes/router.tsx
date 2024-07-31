import { createBrowserRouter } from 'react-router-dom';
import LayoutSite from '../appPages/site/components/layout/LayoutSite';
import HomePage from '../appPages/site/components/pages/HomePage';
import AboutPage from '../appPages/site/components/pages/AboutPage';
import LayoutAuth from '../appPages/auth/components/layout/LayoutAuth';
import LoginPage from '../appPages/auth/components/pages/LoginPage';
import RegistrationPage from '../appPages/auth/components/pages/RegistrationPage';
import SendMessage from '../appPages/site/components/contents/SendMessage';
import ForgotPage from '../appPages/auth/components/pages/ForgotPage';
import ResetPasswordPage from '../appPages/auth/components/pages/ResetPasswordPage';
import SessionProvider from '../providers/SessionProvider';

export const router = createBrowserRouter([
	{
		path: '/auth',
		element: (
			<SessionProvider>
				<LayoutAuth />
			</SessionProvider>
		),
		children: [
			{
				path: '/auth/sign-in',
				element: <LoginPage />
			},
			{
				path: '/auth/sign-up',
				element: <RegistrationPage />
			},
			{
				path: '/auth/forgot',
				element: <ForgotPage />
			},
			{
				path: '/auth/reset-password',
				element: <ResetPasswordPage />
			}
		]
	},
	{
		path: '/',
		element: (
			<SessionProvider>
				<LayoutSite />
			</SessionProvider>
		),
		children: [
			{
				path: '/',
				element: <HomePage />
			},
			{
				path: '/about',
				element: <AboutPage />
			},
			{
				path: '/sendMessage',
				element: <SendMessage />
			}
		]
	}
]);
