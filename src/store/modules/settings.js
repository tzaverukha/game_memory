export default {
	state: {
		cardImgs: [],
		fieldSize: [6, 6],
		turnTime: 5000,
		maxResultsListLength: 5,
	},
	mutations: {
		setCardImgs(state, arr) {
			state.cardImgs = arr;
		},
	},
	actions: {
		setCardImgs({commit}) {
			const filesList = require.context(
				'@/assets/cards/',
				true,
				/^.*\.(jpe?g|svg|png)$/
			);
			const imgs = filesList.keys().map(fileName => {
				return fileName.substring(2);
			});
			commit('setCardImgs', imgs);
		},
	},
	getters: {
		fieldSize: state => state.fieldSize,
		allCardsInFieldLength: state => state.fieldSize[0] * state.fieldSize[1],
		cardImgs: state => state.cardImgs,
		turnTime: state => state.turnTime,
		maxResultsListLength: state => state.maxResultsListLength,
	},
}