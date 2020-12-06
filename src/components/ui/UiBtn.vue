<template>
	<button class="ui-btn" 
		:class="{'ui-btn--big': big}"
		@click="$emit('click')"
		:disabled="disabled"
	>
		<slot></slot>
	</button>
</template>

<script>
	export default {
		name: 'ui-btn',
		props: {
			big: Boolean,
			disabled: Boolean,
		},
	};
</script>

<style lang="stylus">
	.ui-btn
		cursor pointer
		border none
		background grey
		font-weight 500
		line-height 28px
		height 30px
		font-size 18px
		padding 0 15px
		outline none
		border-radius 5px
		color white
		border 1px solid white
		user-select: none
		&:hover
			border 1px solid black
		&:disabled
			pointer-events none
			opacity: 0.6
	.ui-btn--big
		line-height 48px
		height 50px
		font-size 26px
		padding 0 30px
</style>
