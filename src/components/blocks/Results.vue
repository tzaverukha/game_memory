<template>
	<layout-popup
		title="Results table"
		@close="closeResults"
	>
		<div class="results">
			<template v-if="results.length">
				<div class="results__table">
					<div class="results__header">
						<div class="results__header-item">Name</div>
						<div class="results__header-item">Turns</div>
						<div class="results__header-item">Time</div>
					</div>
					<div class="results__item" v-for="(item, i) in results" :key="i">
						<div class="results__item-param">{{item.name}}</div>
						<div class="results__item-param">{{item.turns}}</div>
						<div class="results__item-param">
							<ui-time :time="item.time"/>
						</div>
					</div>
				</div>
				<div class="results__controls">
					<ui-btn
						class="results__cleare-btn"
						@click="cleareResults"
					> Cleare results </ui-btn>
				</div>
			</template>
			<div v-else class="results__empty">
				<p>Nobody is here.</p>
				<p>You can be the first!</p>
			</div>
		</div>
	</layout-popup>
</template>

<script>
	import { mapActions, mapGetters } from 'vuex';

	import UiBtn from '@/components/ui/UiBtn.vue';
	import UiTime from '@/components/ui/UiTime.vue';
	import layoutPopup from '@/layouts/LayoutPopup.vue';

	export default {
		name: 'results',
		components: {
			UiBtn,
			UiTime,
			layoutPopup,
		},
		computed: mapGetters([
			'results',
		]),
		methods: {
			...mapActions([
				'hideResults',
				'cleareResults',
				'prepareToStartGame',
			]),
			closeResults() {
				this.prepareToStartGame();
				this.hideResults();
			},
		},
	};
</script>

<style lang="stylus">
	.results
		&__empty
			margin-top 10px
		&__controls
			display flex
			justify-content center
		&__table
			display table
			width 100%
			margin 15px 0
		&__header, &__item
			display table-row
		&__header-item, &__item-param
			display table-cell
			min-width 45px
			&:first-child
				text-align left
			&:last-child
				text-align right
		&__header-item
			border-bottom 1px solid #fff
		&__item-param
			padding-top 5px
</style>
