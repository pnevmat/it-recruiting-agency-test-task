import React, {FC} from 'react';
import {Modal, Box, Card, CardMedia} from '@mui/material';

interface AlbumType {
	albumId: number;
	id: number;
	title: string;
	url: string;
	thumbnailUrl: string;
}

interface AlbumsModalProps {
	isOpenModal: boolean;
	closeModal: Function;
	clickedCard: AlbumType | null;
}

const AlbumsModal: FC<AlbumsModalProps> = ({
	isOpenModal,
	closeModal,
	clickedCard,
}) => {
	console.log('Clicked card: ', clickedCard);

	return (
		<Modal
			open={isOpenModal}
			onClose={() => closeModal()}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description">
			<Box sx={style}>
				<Card
					sx={{
						height: '100%',
					}}>
					<CardMedia
						component="img"
						sx={{
							// 16:9
							pt: '56.25%',
						}}
						image={clickedCard?.url}
						alt={clickedCard?.title}
					/>
				</Card>
				{/* <Typography id="modal-modal-title" variant="h6" component="h2">
					Text in a modal
				</Typography>
				<Typography id="modal-modal-description" sx={{mt: 2}}>
					Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
				</Typography> */}
			</Box>
		</Modal>
	);
};

const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};

export default AlbumsModal;
