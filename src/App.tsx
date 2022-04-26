import React, {useState, useEffect} from 'react';
import {createTheme, ThemeProvider, CssBaseline} from '@mui/material';
import {getAlbumsQuery} from './api/albumsApi';
import albumsSelectOptionsHandler from './utils/albumsSelectOptionsHandler';
import LoaderComponent from './components/Loader/LoaderComponent';
import AppBarComponent from './components/AppBar/AppBarComponent';
import AlbumsComponent from './components/Albums/AlbumsComponent';
import FooterComponent from './components/Footer/FooterComponent';
import './App.css';

interface AlbumType {
	albumId: number;
	id: number;
	title: string;
	url: string;
	thumbnailUrl: string;
}

const theme = createTheme();

function App() {
	const [albums, setAlbums] = useState<Array<AlbumType> | []>([]);
	const [albumSelectOptions, setAlbumSelectOptions] = useState<
		Array<number> | []
	>([]);

	useEffect(() => {
		if (albums.length === 0) {
			getAlbumsQuery().then((data) => setAlbums(data));
		}
	}, [albums.length]);

	useEffect(() => {
		if (albums.length > 0 && albumSelectOptions.length === 0) {
			setAlbumSelectOptions(albumsSelectOptionsHandler(albums));
		}
	}, [albumSelectOptions.length, albums.length, albums]);

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<AppBarComponent />
			{albums.length === 0 && albumSelectOptions.length === 0 ? (
				<LoaderComponent />
			) : (
				<AlbumsComponent
					albums={albums}
					selectOptions={albumSelectOptions}
					setAlbums={setAlbums}
				/>
			)}
			<FooterComponent />
		</ThemeProvider>
	);
}

export default App;
