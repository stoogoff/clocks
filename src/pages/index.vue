<template>
	<div class="px-4">
		<clock :segments="4" title="4 Clock" :filled="1" />
		<clock :segments="6" title="6 Clock" fill-colour="blue" />
		<clock :segments="8" title="8 Clock" fill-colour="green" />
	</div>
</template>
<script setup lang="ts">

useSeoMeta({
	title: 'Home',
})

</script>
