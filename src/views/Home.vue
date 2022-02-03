<template>
	<div id="app">
		<h1 style="color: white; background-color: black">
			<b>{{ title }}</b>
		</h1>
		<div class="">
			<WordClock />
		</div>
	</div>
</template>

<script>
import WordClock from '../components/WordClock.vue';

export default {
	name: 'Home',
	components: {
		WordClock,
	},
	data: function () {
		return {
			title: 'Word Clock',
		};
	},
};
</script>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: hsl(210, 100%, 98%);
	margin-top: 20px;
}
body,
html {
	padding: 0;
	margin: 0;
	width: 100%;
	/* min-height: 100vh; */
}
body {
	background-color: black;
}
</style>
