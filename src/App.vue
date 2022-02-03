<template>
	<div>
		<router-view />
	</div>
</template>

<script>
export default {
	name: 'App',
	data: function () {
		return {
			title: 'Word Clock',
		};
	},
};
</script>

<style>
@import './assets/css/main.css';
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
