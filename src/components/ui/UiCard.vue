<template>
	<div class="ui-card"
		:class="{'ui-card--flipped': card.flipped,
							'ui-card--found': card.found}"
	>
		<div class="ui-card__front">
			<div class="ui-card__content"
				:style="{backgroundImage: `url(${require('@/assets/cards/' + card.img)})`}"
			></div>
		</div>
		<div class="ui-card__back"></div>
	</div>
</template>

<script>

export default {
	name: 'ui-card',
	props: {
		card: Object,
	},
};
</script>

<style lang="stylus">
	.ui-card
		position relative
		width 100%
		height 100%
		transition opacity 0.3s linear 0.5s
		&__front, &__back
			position: absolute
			top 0
			left 0
			width 100%
			height 100%
			border-radius 5px
			transition: 0.4s;
		&__front
			-moz-backface-visibility hidden
			-webkit-backface-visibility hidden
			backface-visibility hidden
			transform perspective(1000px) rotateY(180deg)
			padding 5px
			display flex
			box-sizing border-box
			background-color white
			@media screen and (max-width: 767px)
				padding 1px
		&__back
			-moz-backface-visibility hidden
			-webkit-backface-visibility hidden
			backface-visibility hidden
			transform perspective(1000px) rotateY(0deg);
			background linear-gradient(45deg,rgba(0, 0, 0, 0) 48%,rgba(255, 255, 255, 0.1) 50%,rgba(0, 0, 0, 0) 52%),linear-gradient(-45deg,rgba(0, 0, 0, 0) 48%,rgba(255, 255, 255, 0.1) 50%,rgba(0, 0, 0, 0) 52%)
			background-size 1em 1em
			background-color: grey
			z-index 2
		&__content
			background-position center
			background-repeat no-repeat
			background-size contain
			flex-grow 1
	.ui-card--flipped
		.ui-card
			&__front
				transform perspective(1000px) rotateY(0)
			&__back
				transform perspective(1000px) rotateY(-180deg)
	.ui-card--found
		opacity 0.6
</style>
