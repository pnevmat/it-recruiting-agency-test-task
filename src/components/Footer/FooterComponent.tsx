import React from 'react';
import {Box, Typography} from '@mui/material';
import CopyrightComponent from './CopyrightComponent';

export default function FooterComponent() {
	return (
		<Box sx={{bgcolor: 'background.paper', p: 6}} component="footer">
			<Typography variant="h6" align="center" gutterBottom>
				Footer
			</Typography>
			<Typography
				variant="subtitle1"
				align="center"
				color="text.secondary"
				component="p">
				Something here to give the footer a purpose!
			</Typography>
			<CopyrightComponent />
		</Box>
	);
}
