import { RouterProvider } from 'react-router-dom';
import { router } from './routes/router.tsx';
import ThemeContext from './context/ThemeContext.tsx';

const App = () => {
	return (
		<>
			<ThemeContext>
				<RouterProvider router={router} />
			</ThemeContext>
		</>
	);
};

export default App;
