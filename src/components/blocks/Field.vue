<template>
	<div class="cards">
		<div v-for="(card, i) in cards" :key="card + i"
			class="cards__item" 
			:class="{'cards__item--found': card.found}" 
			:style="{width: `${100 / fieldSize[0]}%`,
							height: `${100 / fieldSize[1]}%`}"
			@click="openCard(i)"
		>
			<ui-card
				:card="card"
			/>
		</div>
	</div>
</template>

<script>
	import { mapActions, mapGetters } from 'vuex';
	import UiCard from '@/components/ui/UiCard.vue';

	export default {
		name: 'field',
		components: {
			UiCard,
		},
		computed: mapGetters([
			'cards',
			'fieldSize',
		]),
		methods: mapActions(['openCard']),
	};
</script>

<style lang="stylus">
	.cards
		display flex
		flex-wrap wrap
		&__item
			box-sizing border-box
			padding 5px
			cursor: pointer
			transition opacity 0.2s linear 0.5s
		&__item--found
			pointer-events none
</style>
