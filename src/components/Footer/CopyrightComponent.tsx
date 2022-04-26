import React from 'react';
import {Typography, Link} from '@mui/material';

export default function CopyrightComponent() {
	return (
		<Typography variant="body2" color="text.secondary" align="center">
			{'Copyright © '}
			<Link
				color="inherit"
				href="https://www.linkedin.com/in/vadim-kravchenko-07833674/">
				Linkedin profile
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}
