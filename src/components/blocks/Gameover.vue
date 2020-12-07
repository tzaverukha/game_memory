<template>
	<layout-popup
		title="You win"
		@close="prepareToStartGame"
	>
		<div class="gameover">
			<div class="gameover__info">
				in {{gameTime / 1000}} sec and {{turnsCount}} turns
			</div>

			<div class="gameover__result" v-if="gameoverCase === 'addResultForm'" key="addResultForm">
				<div class="gameover__result-text">
					Write your name to save result:
				</div>
				<div class="gameover__result-controls">
					<input type="text"
						v-model="name"
						class="gameover__result-input"
						@keyup.enter="saveResult"
						ref="nameInput"
					/>
					<ui-btn
						class="gameover__result-btn"
						@click="saveResult"
						:disabled="!name.length"
					> Save </ui-btn>
				</div>
			</div>

			<div class="gameover__result" v-else-if="gameoverCase === 'resultIsSaved'" key="resultIsSaved">
				<div class="gameover__result-text">
					Your result is saved.
				</div>
				<div class="gameover__result-controls">
					<ui-btn
						class="gameover__result-btn"
						@click="showResults"
					> Results </ui-btn>
				</div>
			</div>

			<div class="gameover__result" v-else-if="gameoverCase === 'badGame'" key="badGame">
				<div class="gameover__result-text">
					You can better, try again.
				</div>
				<div class="gameover__result-controls">
					<ui-btn
						class="gameover__result-btn"
						@click="showResults"
					> Results </ui-btn>
				</div>
			</div>

		</div>
	</layout-popup>
</template>

<script>
	import { mapActions, mapGetters } from 'vuex';
	import UiBtn from '@/components/ui/UiBtn.vue';
	import layoutPopup from '@/layouts/LayoutPopup.vue';

	export default {
		name: 'gameover',
		components: {
			UiBtn,
			layoutPopup,
		},
		computed: mapGetters([
			'turnsCount',
			'gameTime',
			'results',
			'maxResultsListLength',
		]),
		data() {
			return {
				name: '',
				gameoverCase: '', // addResultForm, resultIsSaved, badGame
			};
		},
		mounted() {
			if (this.results.length < this.maxResultsListLength) {
				this.gameoverCase = 'addResultForm';
			} else {
				const lastResult = this.results[this.results.length - 1];
				if (this.gameTime < lastResult.time) {
					this.gameoverCase = 'addResultForm';
				} else if (this.gameTime === lastResult.time && this.turnsCount <= lastResult.turns) {
					this.gameoverCase = 'addResultForm';
				} else {
					this.gameoverCase = 'badGame';
				}
			}
			if (this.gameoverCase === 'addResultForm') {
				this.$nextTick(()=>{
					this.$refs.nameInput.focus();
				});
			}
		},
		methods: {
			...mapActions([
				'prepareToStartGame',
				'addResult',
				'showResults',
			]),
			saveResult() {
				if (this.name.length) {
					this.addResult({
						name: this.name,
						time: this.gameTime,
						turns: this.turnsCount,
					});
					this.gameoverCase = 'resultIsSaved';
				}
			},
		},
	};
</script>

<style lang="stylus">
	.gameover
		&__result
			margin-top 10px
		&__result-text
			margin-bottom 10px
		&__result-controls
			display flex
			justify-content center
		&__result-input
			flex-grow 1
			margin-right 10px
			height 30px
			line-height 28px
			box-sizing border-box
			border-radius 5px
			width 100%
</style>
