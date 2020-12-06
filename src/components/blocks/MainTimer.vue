<template>
	<div class="main-timer">
		<ui-time :time="gameTime"/>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex';
	import UiTime from '@/components/ui/UiTime.vue';

	export default {
		name: 'main-timer',
		components: {
			UiTime,
		},
		computed: {
			...mapGetters([
				'gameStatus',
			]),
		},
		watch: {
			gameStatus() {
				switch (this.gameStatus) {
					case 'readyToStart':
						this.cleareTimer();
						break;
					case 'started':
						this.startTimer();
						break;
					case 'ended':
						this.stopTimer();
						break;
					default:
						this.cleareTimer();
						break;
				}
			},
		},
		data() {
			return {
				timer: null,
				gameTime: 0,
			}
		},
		methods: {
			cleareTimer() {
				this.stopTimer();
				this.gameTime = 0;
			},
			stopTimer() {
				if (this.timer) {
					clearInterval(this.timer);
				}
				this.$store.dispatch('setGameTime', this.gameTime);
			},
			startTimer() {
				this.cleareTimer();
				this.timer = setInterval(() => { this.gameTime += 1000}, 1000);
			},
		},
	};
</script>

<style lang="stylus">
	.main-timer
		font-size 32px
</style>
