import Vue from 'vue';
import Vuex from 'vuex';
import settings from './modules/settings';
import game from './modules/game';
import results from './modules/results';

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		settings,
		game,
		results,
	},
	actions: {
		init(store) {
			store.dispatch('setCardImgs');
			store.dispatch('getResultsFromLocalStorage');
			store.dispatch('prepareToStartGame');
		}
	}
});
