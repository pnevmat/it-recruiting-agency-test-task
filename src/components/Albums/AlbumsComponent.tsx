import {FC, useState, useEffect} from 'react';
import {
	Box,
	Container,
	Typography,
	Stack,
	Grid,
	Card,
	CardMedia,
	CardContent,
	CardActions,
	Button,
	InputLabel,
	MenuItem,
	FormControl,
	Select,
	Pagination,
	styled,
} from '@mui/material';
import {SelectChangeEvent} from '@mui/material/Select';
import AlbumsModal from './AlbumsModal';
import settings from '../../settings/settings';

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
// "https://source.unsplash.com/random" - сервис рандомной выдачи рисунка
const AlbumsComponent: FC<AlbumsComponentProps> = ({
	albums,
	selectOptions,
	setAlbums,
}) => {
	const [chosenCards, setChosenCards] = useState(albums);
	const [pages, setPages] = useState<Array<number> | []>([]);
	const [cardsOnPage, setCardsOnPage] = useState<Array<AlbumType> | []>([]);
	const [albumChoice, setAlbumChoice] = useState<string>('All');
	const [activePage, setActivePage] = useState(1);
	const [openModal, setOpenModal] = useState(false);
	const [clickedCard, setClickedCard] = useState<AlbumType | null>(null);

	console.log('Cards to render: ', albums);
	console.log('Album choice: ', albumChoice);
	console.log('Chosen cards: ', chosenCards);
	console.log('Cards on page: ', cardsOnPage);
	console.log('Active page: ', activePage);

	useEffect(() => {
		// Массив страниц больше не нужен так как используетс муи пагинатор
		let pagesArray: Array<number> = [];
		chosenCards.forEach((card, i) => {
			if (i <= chosenCards.length / settings.cardsPerPage + 1 && i !== 0) {
				pagesArray.push(i);
			}
		});
		setPages(pagesArray);

		if (activePage === 1) {
			setCardsOnPage(
				chosenCards.filter((card, i) => i <= settings.cardsPerPage - 1),
			);
		}

		if (activePage !== 1) {
			setCardsOnPage(
				chosenCards.filter(
					(card, i) =>
						i >= (activePage - 1) * settings.cardsPerPage &&
						i <=
							settings.cardsPerPage -
								1 +
								activePage * settings.cardsPerPage -
								settings.cardsPerPage,
				),
			);
		}
	}, [activePage, chosenCards]);

	useEffect(() => {
		if (albumChoice !== 'All') {
			const albumNumber = albumChoice.split(' ')[1];
			console.log('Album number: ', albumNumber);
			setChosenCards(
				albums.filter((card) => card.albumId === Number(albumNumber)),
			);
		}
	}, [albumChoice, albums]);

	const albumChoiceHandler = (value: string) => {
		setAlbumChoice(value);

		if (value === 'All') {
			setChosenCards(albums);
		}
	};

	const deleteCardHandler = (card: AlbumType) => {
		const updatedAlbumsArray = albums.filter((album) => album.id !== card.id);
		setAlbums(updatedAlbumsArray);
		setChosenCards(updatedAlbumsArray);
		console.log('Card is deleted: ', card);
	};

	const OpenModalHandler = (card: AlbumType) => {
		setClickedCard(card);
		setOpenModal(true);
	};

	const CloseModalHandler = () => {
		setClickedCard(null);
		setOpenModal(false);
	};
	// Сделать удаление карточки картинки
	return (
		<main>
			{/* Hero unit */}
			<Box
				sx={{
					bgcolor: 'background.paper',
					pt: 8,
					pb: 6,
				}}>
				<Container maxWidth="sm">
					<Typography
						component="h1"
						variant="h2"
						align="center"
						color="text.primary"
						gutterBottom>
						Album layout
					</Typography>
					<Typography
						variant="h5"
						align="center"
						color="text.secondary"
						paragraph>
						Something short and leading about the collection below—its contents,
						the creator, etc. Make it short and sweet, but not too short so
						folks don&apos;t simply skip over it entirely.
					</Typography>
					<Stack
						sx={{pt: 4}}
						direction="row"
						spacing={2}
						justifyContent="center">
						<FormControl sx={{m: 1, minWidth: 80}}>
							<InputLabel id="autowidth-label">Age</InputLabel>
							<StyledSelect
								labelId="autowidth-label"
								id="select-autowidth"
								value={albumChoice}
								onChange={(e: SelectChangeEvent<unknown>) =>
									albumChoiceHandler(e.target.value as string)
								}
								autoWidth
								label="Albums">
								<MenuItem value={'All'}>All</MenuItem>
								{selectOptions.map((option) => (
									<MenuItem value={option}>{option}</MenuItem>
								))}
							</StyledSelect>
						</FormControl>
						{/* {selectOptions.map((option) => (
							<Button key={option} variant="contained">
								{option}
							</Button>
						))} */}
						{/* <Button variant="outlined">Secondary action</Button> */}
					</Stack>
				</Container>
			</Box>
			<Container sx={{py: 8}} maxWidth="md">
				{/* End hero unit */}
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
									{/* <Button size="small">View</Button> */}
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
				<StyledStack spacing={2}>
					<StyledPagination
						count={pages.length}
						size="large"
						color="primary"
						onChange={(e, value) => {
							setActivePage(value);
						}}
					/>
				</StyledStack>
				<AlbumsModal
					isOpenModal={openModal}
					closeModal={CloseModalHandler}
					clickedCard={clickedCard}
				/>
			</Container>
		</main>
	);
};

const StyledSelect = styled(Select)({
	minWidth: '200px',
});

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

const StyledStack = styled(Stack)({
	marginTop: '30px',
});

const StyledPagination = styled(Pagination)({
	'& > ul': {
		justifyContent: 'center',
	},
});

export default AlbumsComponent;
