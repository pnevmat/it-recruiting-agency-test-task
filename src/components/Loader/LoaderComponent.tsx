import React from 'react';
import {Box, CircularProgress, styled} from '@mui/material';

export default function LoaderComponent() {
	return (
		<LoaderWrapper>
			<CircularProgress />
		</LoaderWrapper>
	);
}

const LoaderWrapper = styled(Box)({
	position: 'absolute',
	top: '70%',
	left: '50%',
	display: 'flex',
});
