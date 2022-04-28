import React, {FC} from 'react';
import {Stack, Pagination, styled} from '@mui/material';

interface AlbumsPaginationProps {
	pages: number;
	activePage: number;
	setActivePage: Function;
}

const AlbumsPagination: FC<AlbumsPaginationProps> = ({
	pages,
	activePage,
	setActivePage,
}) => {
	return (
		<StyledStack spacing={2}>
			<StyledPagination
				count={pages}
				page={activePage}
				size="large"
				color="primary"
				onChange={(e, value) => {
					setActivePage(value);
				}}
			/>
		</StyledStack>
	);
};

const StyledStack = styled(Stack)({
	marginTop: '30px',
});

const StyledPagination = styled(Pagination)({
	'& > ul': {
		justifyContent: 'center',
	},
});

export default AlbumsPagination;
