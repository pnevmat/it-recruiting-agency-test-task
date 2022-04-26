import settings from '../settings/settings';

interface AlbumType {
	albumId: number;
	id: number;
	title: string;
	url: string;
	thumbnailUrl: string;
}

export default function cardsOnPageHandler(activePage: number, chosenCards: Array<AlbumType>) {
	if (activePage === 1 && chosenCards.length > 0) {
		const cardsOnPage = chosenCards.filter((card, i) => i <= settings.cardsPerPage - 1);
		return cardsOnPage;
	} else if (activePage !== 1 && chosenCards.length > 0) {
		const cardsOnPage = chosenCards.filter((card, i) => i >= (activePage - 1) * settings.cardsPerPage && i <= settings.cardsPerPage - 1 + activePage * settings.cardsPerPage - settings.cardsPerPage);
		return cardsOnPage;
	} else {
		const cardsOnPage: any = [];
		return cardsOnPage;
	}
}