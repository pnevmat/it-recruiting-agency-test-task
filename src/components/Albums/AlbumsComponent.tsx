import {FC, useState, useEffect} from 'react';
import {
	Container,
	Typography,
	Grid,
	Card,
	CardMedia,
	CardContent,
	CardActions,
	Button,
	styled,
} from '@mui/material';
import HeroComponent from '../Hero/HeroComponent';
import AlbumsPagination from './AlbumsPagination';
import AlbumsModal from './AlbumsModal';
import pagesNumberHandler from '../../utils/pagesNumberHandler';
import cardsOnPageHandler from '../../utils/cardsOnPageHandler';

interface AlbumType {
	albumId: number;
	id: number;
	title: string;
	url: string;
	thumbnailUrl: string;
}

interface AlbumsComponentProps {
	albums: Array<AlbumType>;
	selectOptions: Array<number>;
	setAlbums: Function;
}

const AlbumsComponent: FC<AlbumsComponentProps> = ({
	albums,
	selectOptions,
	setAlbums,
}) => {
	const [chosenCards, setChosenCards] = useState(albums);
	const [pages, setPages] = useState<number>(1);
	const [cardsOnPage, setCardsOnPage] = useState<Array<AlbumType> | []>([]);
	const [albumChoice, setAlbumChoice] = useState<string>('All');
	const [activePage, setActivePage] = useState(1);
	const [openModal, setOpenModal] = useState(false);
	const [clickedCard, setClickedCard] = useState<AlbumType | null>(null);

	useEffect(() => {
		setPages(pagesNumberHandler(chosenCards).length);

		setCardsOnPage(cardsOnPageHandler(activePage, chosenCards));
	}, [activePage, chosenCards, chosenCards.length]);

	useEffect(() => {
		if (albumChoice !== 'All') {
			const albumNumber = albumChoice.split(' ')[1];

			setChosenCards(
				albums.filter((card) => card.albumId === Number(albumNumber)),
			);
		}
	}, [albumChoice, albums]);

	const deleteCardHandler = (card: AlbumType) => {
		const updatedAlbumsArray = albums.filter((album) => album.id !== card.id);
		setAlbums(updatedAlbumsArray);
		setChosenCards(updatedAlbumsArray);
	};

	const OpenModalHandler = (card: AlbumType) => {
		setClickedCard(card);
		setOpenModal(true);
	};

	const CloseModalHandler = () => {
		setClickedCard(null);
		setOpenModal(false);
	};

	const albumsChoiceHandler = (value: string) => {
		setActivePage(1);
		setAlbumChoice(value);
	};

	return (
		<main>
			<HeroComponent
				selectOptions={selectOptions}
				albums={albums}
				albumChoice={albumChoice}
				setAlbumChoice={albumsChoiceHandler}
				setChosenCards={setChosenCards}
			/>
			<Container sx={{py: 8}} maxWidth="md">
				<Grid container spacing={4}>
					{cardsOnPage.map((card) => (
						<Grid item key={card.id} xs={12} sm={6} md={4}>
							<StyledCard
								sx={{
									height: '100%',
									display: 'flex',
									flexDirection: 'column',
								}}
								onClick={() => OpenModalHandler(card)}>
								<CardMedia
									component="img"
									image={card.thumbnailUrl}
									alt={card.title}
								/>
								<CardContent sx={{flexGrow: 1}}>
									<Typography gutterBottom variant="h5" component="h2">
										Heading
									</Typography>
									<Typography>{card.title}</Typography>
								</CardContent>
								<StyledCardActions>
									<Button
										size="small"
										onClick={(e) => {
											e.stopPropagation();
											deleteCardHandler(card);
										}}>
										Delete
									</Button>
								</StyledCardActions>
							</StyledCard>
						</Grid>
					))}
				</Grid>
				<AlbumsPagination
					pages={pages}
					activePage={activePage}
					setActivePage={setActivePage}
				/>
				<AlbumsModal
					isOpenModal={openModal}
					closeModal={CloseModalHandler}
					clickedCard={clickedCard}
				/>
			</Container>
		</main>
	);
};

const StyledCard = styled(Card)({
	'&:hover': {
		cursor: 'pointer',
	},
});

const StyledCardActions = styled(CardActions)({
	'& > button': {
		color: '#ff2d2dbf',
	},
});

export default AlbumsComponent;
