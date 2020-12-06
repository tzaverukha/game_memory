export default {
	state: {
		results: [],
		resultsIsShown: false,
	},
	mutations: {
		addResult(state, {getters, result}) {
			if (state.results.length === getters.maxResultsListLength) {
				state.results.pop();
			}
			state.results.push(result);
		},
		sortResults(state) {
			state.results.sort((res1, res2) => {
				const compareTime = res1.time - res2.time;
				if (compareTime !== 0) {
					return compareTime;
				} else {
					const compareTurns = res1.turns - res2.turns;
					if (compareTurns !== 0) {
						return compareTurns;
					} else {
						return res1.name > res2.name? 1 : -1;
					}
				}
			})
		},
		changeResultsIsShown(state, show) {
			state.resultsIsShown = show;
		},
		cleareResults(state) {
			state.results = [];
		},
		setResultsInLocalStorage(state) {
			localStorage.setItem('memoryAppResult', JSON.stringify(state.results))
		},
		getResultsFromLocalStorage(state) {
			if (localStorage.memoryAppResult) {
				state.results = JSON.parse(localStorage.memoryAppResult);
			}
		},
	},
	actions: {
		addResult({commit, getters}, result) {
			commit('addResult', {getters, result});
			commit('sortResults');
			commit('setResultsInLocalStorage');
		},
		showResults({commit}) {
			commit('changeResultsIsShown', true);
		},
		hideResults({commit}) {
			commit('changeResultsIsShown', false);
		},
		cleareResults({commit}) {
			commit('cleareResults');
			commit('setResultsInLocalStorage');
		},
		getResultsFromLocalStorage({commit}) {
			commit('getResultsFromLocalStorage');
		},
	},
	getters: {
		results: state => state.results,
		resultsIsShown: state => state.resultsIsShown,
	},
}