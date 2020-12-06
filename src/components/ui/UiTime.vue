<template>
	<span class="ui-time">{{new Date(time) | moment('mm:ss')}}</span>
</template>

<script>

export default {
	name: 'ui-time',
	props: {
		time: Number,
	},
};
</script>

<style lang="stylus">
	.ui-time
		font-family: monospace
</style>
