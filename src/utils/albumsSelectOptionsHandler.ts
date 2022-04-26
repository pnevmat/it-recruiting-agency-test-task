interface AlbumType {
	albumId: number;
	id: number;
	title: string;
	url: string;
	thumbnailUrl: string;
}

export default function albumsSelectOptionsHandler(albums: Array<AlbumType>) {
	let chooseOptions: any = [];
	albums.forEach((album, i) => {
		if (i === 0) {
			chooseOptions = [`Album ${album.albumId}`];
		}

		if (i > 0 && !chooseOptions.find((option: string) => `Album ${albums[i].albumId}` === option)) {
			chooseOptions.push(`Album ${albums[i].albumId}`);
		}
	});
	return chooseOptions;
}