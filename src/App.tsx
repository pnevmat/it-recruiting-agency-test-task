import React from 'react';
import {createTheme, ThemeProvider, CssBaseline} from '@mui/material';
import AppBarComponent from './components/AppBar/AppBarComponent';
import AlbumsComponent from './components/Albums/AlbumsComponent';
import FooterComponent from './components/Footer/FooterComponent';
import './App.css';

const theme = createTheme();

function App() {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<AppBarComponent />
			<AlbumsComponent />
			<FooterComponent />
		</ThemeProvider>
	);
}

export default App;
