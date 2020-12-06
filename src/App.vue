<template>
	<div id="app">

		<header>
			<div>
				<main-timer/>
				<div>Turns: {{turnsCount}}</div>
			</div>
			<ui-btn
				class="app__btn-result"
				@click="showResults"
				:disabled="gameStatus === 'started'"
			> Results </ui-btn>
		</header>

		<main>

			<ui-btn
				v-if="gameStatus === 'readyToStart'"
				class="app__btn-start-game"
				@click="startGame"
				big
			> Start game </ui-btn>

			<transition name="fade">
				<gameover
					v-if="gameStatus === 'ended'"
					class="app__gameover"
				/>
			</transition>

			<results v-if="resultsIsShown"/>

			<field class="app__field" v-if="gameStatus !== 'readyToStart'"/>

		</main>

		<footer>Made by Taras Zaverukha</footer>

	</div>
</template>

<script>
	import { mapActions, mapGetters } from 'vuex';
	import UiBtn from '@/components/ui/UiBtn.vue';
	import MainTimer from '@/components/blocks/MainTimer.vue';
	import Field from '@/components/blocks/Field.vue';
	import Gameover from '@/components/blocks/Gameover.vue';
	import Results from '@/components/blocks/Results.vue';

	export default {
		name: 'App',
		components: {
			UiBtn,
			MainTimer,
			Field,
			Gameover,
			Results,
		},
		computed: {
			...mapGetters([
				'gameStatus',
				'cards',
				'fieldSize',
				'turnsCount',
				'resultsIsShown',
			]),
		},
		mounted() {
			this.init();
		},
		methods: {
			...mapActions([
				'init',
				'startGame',
				'openCard',
				'showResults',
			]),
		}
	};
</script>

<style lang="stylus">
	@import '~normalize-styl'
	#app
		font-family Avenir, Helvetica, Arial, sans-serif
		font-size 16px
		line-height 1.3
		text-align center
		color #000000
		background-color lightgray
		height 100vh
		display flex
		flex-direction column
	header
		margin 10px 0 5px
		position relative
	main
		flex-grow 1
		margin 0 auto
		width 100%
		max-width 800px
		padding 0 10px
		box-sizing border-box
		display flex
		justify-content center
		align-items center
	footer
		margin 35px 0 20px
	.app
		&__btn-result
			position absolute
			top 7px
			right 15px
		&__field
			width 100%
			height 100%
		&__btn-start-game
			position fixed
			top 50%
			left 50%
			transform translate(-50%, -50%)
			z-index 1
	.fade-enter-active
		transition: opacity .2s linear 1s
	.fade-leave-active, .fade-enter, .fade-leave-to
		transition: opacity 0s linear 0s
	.fade-enter,.fade-leave-to
		opacity: 0
</style>
