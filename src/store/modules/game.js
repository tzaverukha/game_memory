export default {
	state: {
		cards: [],
		openedCardIndex: null,
		turnsCount: 0,
		oneTurnTimer: null,
		foundCardsCount: 0,
		gameTime: 0,
		gameStatus: 'readyToStart'// readyToStart, started, ended
	},
	mutations: {
		generateCards(state, getters) {
			const cardImgs = getters.cardImgs;
			const randomImgs = [];
			do {
				const randomImg = cardImgs[Math.floor(Math.random() * cardImgs.length)];
				if (!randomImgs.includes(randomImg)) {
					randomImgs.push(randomImg);
				}
			} while (randomImgs.length < getters.allCardsInFieldLength / 2);

			const dobuledRandomImgs = [...randomImgs, ...randomImgs];
			const shuffle= (array) => { // Fisher–Yates Shuffle
				for (let i = array.length - 1; i > 0; i--) {
					let j = Math.floor(Math.random() * (i + 1));
					[array[i], array[j]] = [array[j], array[i]];
				}
			};
			shuffle(dobuledRandomImgs);

			state.cards = dobuledRandomImgs.map(img => {
				return {
					img,
					flipped: false,
					found: false,
				}
			});
		},
		startGame(state) {
			state.gameStatus = 'started';
		},
		openCard(state, {getters, cardIndex}) {
			clearTimeout(state.oneTurnTimer);
			state.turnsCount += 1;
			const card = state.cards[cardIndex];
			card.flipped = cardIndex !== state.openedCardIndex;
			if (card.flipped) {
				if (state.openedCardIndex === null) {
					state.openedCardIndex = cardIndex;
					state.oneTurnTimer = setTimeout(() => {
						card.flipped = false;
						state.openedCardIndex = null;
					}, getters.turnTime);
				} else {
					const prevOpenedCard = state.cards[state.openedCardIndex];
					if (card.img === prevOpenedCard.img) {
						card.found = prevOpenedCard.found = true;
						state.foundCardsCount += 2;
						if (state.foundCardsCount === getters.allCardsInFieldLength) {
							state.gameStatus = 'ended';
						}
					} else {
						setTimeout(() => {
							card.flipped = prevOpenedCard.flipped = false;
						}, 500);
					}
					state.openedCardIndex = null;
				}
			} else {
				state.openedCardIndex = null;
			}
		},
		prepareToStartGame(state) {
			state.turnsCount = 0;
			state.foundCardsCount = 0;
			state.gameTime = 0;
			state.openedCardIndex = null;
			state.gameStatus = 'readyToStart';
		},
		setGameTime(state, time) {
			state.gameTime = time;
		},
	},
	actions: {
		startGame({commit}) {
			commit('startGame');
		},
		openCard({commit, getters}, cardIndex) {
			commit('openCard', {getters, cardIndex});
		},
		setGameTime({commit}, time) {
			commit('setGameTime', time);
		},
		prepareToStartGame({commit, getters}) {
			commit('generateCards', getters);
			commit('prepareToStartGame');
		},
	},
	getters: {
		gameStatus: state => state.gameStatus,
		cards: state => state.cards,
		turnsCount: state => state.turnsCount,
		gameTime: state => state.gameTime,
	},
}