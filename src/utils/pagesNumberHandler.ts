import settings from '../settings/settings';

interface AlbumType {
	albumId: number;
	id: number;
	title: string;
	url: string;
	thumbnailUrl: string;
}

export default function pagesNumberHandler(chosenCards: Array<AlbumType>) {
	let pagesArray: Array<number> = [];

	chosenCards.forEach((card: AlbumType, i: number) => {
		if (i <= chosenCards.length / settings.cardsPerPage + 1 && i !== 0) {
			pagesArray.push(i);
		}
	});
	return pagesArray;
}