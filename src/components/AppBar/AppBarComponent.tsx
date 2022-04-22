import React from 'react';
import {AppBar, Toolbar, Typography} from '@mui/material';
import CameraIcon from '@mui/icons-material/PhotoCamera';

export default function AppBarComponent() {
	return (
		<AppBar position="relative">
			<Toolbar>
				<CameraIcon sx={{mr: 2}} />
				<Typography variant="h6" color="inherit" noWrap>
					Album layout
				</Typography>
			</Toolbar>
		</AppBar>
	);
}
