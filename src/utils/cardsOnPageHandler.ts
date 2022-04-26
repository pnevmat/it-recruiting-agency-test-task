import settings from '../settings/settings';

interface AlbumType {
	albumId: number;
	id: number;
	title: string;
	url: string;
	thumbnailUrl: string;
}

export default function cardsOnPageHandler(activePage: number, chosenCards: Array<AlbumType>) {
	if (!chosenCards) {
		const cardsOnPage: any = [];
		return cardsOnPage;
	}

	if (activePage === 1) {
		const cardsOnPage = chosenCards.filter((card, i) => i <= settings.cardsPerPage - 1);
		return cardsOnPage;
	}

	if (activePage !== 1) {
		const cardsOnPage = chosenCards.filter((card, i) => i >= (activePage - 1) * settings.cardsPerPage && i <= settings.cardsPerPage - 1 + activePage * settings.cardsPerPage - settings.cardsPerPage);
		return cardsOnPage;
	}
}