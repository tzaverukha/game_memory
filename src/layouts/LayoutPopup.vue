<template>
	<div class="layout-popup" tabindex="0" @keydown.esc="$emit('close')" ref="popup">
		<div class="layout-popup__close-btn" @click="$emit('close')"></div>
		<div class="layout-popup__title">{{title}}</div>
		<div class="layout-popup__content">
			<slot></slot>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'layout-popup',
		props: {
			title: String,
		},
		mounted() {
			this.$nextTick(()=>{
				this.$refs.popup.focus();
			});
		},
	};
</script>

<style lang="stylus">
	.layout-popup
		position fixed
		z-index 1
		top 50%
		left 50%
		transform translate(-50%, -50%)
		color white
		padding 20px
		width 300px
		border-radius 10px
		background gray
		box-sizing border-box
		&:focus
			outline none
		&__close-btn
			cursor: pointer
			position absolute
			top 5px
			right 5px
			width 24px
			height 24px
			background #fff
			border-radius 50%
			&:before, &:after
				content ''
				position absolute
				top 11px
				left 4px
				width 16px
				height 2px
				background gray
				transform rotate(45deg)
			&:after
				transform rotate(-45deg)
		&__title
			font-size 20px
			font-weight 600
</style>
