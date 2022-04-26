import React, {FC} from 'react';
import {
	Box,
	Container,
	Typography,
	Stack,
	InputLabel,
	Select,
	MenuItem,
	FormControl,
	styled,
} from '@mui/material';
import {SelectChangeEvent} from '@mui/material/Select';

interface AlbumType {
	albumId: number;
	id: number;
	title: string;
	url: string;
	thumbnailUrl: string;
}

interface HeroComponentProps {
	selectOptions: Array<number>;
	albums: Array<AlbumType>;
	albumChoice: string;
	setAlbumChoice: Function;
	setChosenCards: Function;
}

const HeroComponent: FC<HeroComponentProps> = ({
	selectOptions,
	albums,
	albumChoice,
	setAlbumChoice,
	setChosenCards,
}) => {
	const albumChoiceHandler = (value: string) => {
		setAlbumChoice(value);

		if (value === 'All') {
			setChosenCards(albums);
		}
	};

	return (
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
					the creator, etc. Make it short and sweet, but not too short so folks
					don&apos;t simply skip over it entirely.
				</Typography>
				<Stack sx={{pt: 4}} direction="row" spacing={2} justifyContent="center">
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
								<MenuItem key={option} value={option}>
									{option}
								</MenuItem>
							))}
						</StyledSelect>
					</FormControl>
				</Stack>
			</Container>
		</Box>
	);
};

const StyledSelect = styled(Select)({
	minWidth: '200px',
});

export default HeroComponent;
