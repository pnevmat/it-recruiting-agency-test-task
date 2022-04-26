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
						image={clickedCard?.url}
						alt={clickedCard?.title}
					/>
				</Card>
			</Box>
		</Modal>
	);
};

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	paddingTop: '10px !important',
	paddingRight: '10px !important',
	paddingBottom: '10px !important',
	paddingLeft: '10px !important',
	border: 'none',
	borderRadius: '5px',
	bgcolor: 'background.paper',
	boxShadow: 24,
	p: 4,
};

export default AlbumsModal;
