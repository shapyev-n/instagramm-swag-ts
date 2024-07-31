import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = (): ThemeContextType => {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error('useTheme must be used within a ThemeProvider');
	}
	return context;
};

interface ThemeProviderProps {
	children: React.ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
	const [theme, setTheme] = useState<string>(
		JSON.parse(localStorage.getItem('mode') || `"light"`)
	);

	useEffect(() => {
		if (theme === 'dark') {
			document.body.classList.add('Dark');
		} else {
			document.body.classList.remove('Dark');
		}
	}, [theme]);

	const switchTheme = () => {
		setTheme((cur) => {
			const newTheme = cur === 'light' ? 'dark' : 'light';
			localStorage.setItem('mode', JSON.stringify(newTheme));
			return newTheme;
		});
	};

	const values: ThemeContextType = {
		theme,
		switchTheme
	};

	return (
		<ThemeContext.Provider value={values}>{children}</ThemeContext.Provider>
	);
};

export default ThemeProvider;
