import './App.css';
import Calculator from './components/Calculator';
import {ThemeProvider} from 'styled-components';
import {GlobalStyles} from './components/GlobalStyles';
import {lightTheme, darkTheme} from './components/Themes';
import {useState} from 'react';

function App() {
	const [theme, setTheme] = useState('light');
	const themeToggler = () => {
		theme === 'light' ? setTheme('dark') : setTheme('light');
	};
	return (
		<ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
			<>
				<GlobalStyles />
				<div className='App'>
					<button onClick={themeToggler}>Switch Theme</button>
					<header className='App-header'>
						<Calculator />
					</header>
				</div>
			</>
		</ThemeProvider>
	);
}

export default App;
