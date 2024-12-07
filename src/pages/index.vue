<template>
	<div class="px-4">
		<add-clock @add="add" />

		<clock v-for="clock in clocks"
			:key="clock.title"
			:title="clock.title"
			:segments="clock.segments"
			:filled="clock.filled"
			:fillColour="clock.fillColour"
		/>
	</div>
</template>
<script setup lang="ts">

import { IClock } from '~/models/clock.ts'

useSeoMeta({
	title: 'Home',
})

const clocks: IClock[] = ref([])

function add(input) {
	console.log(input)

	clocks.value.push(input)
}

</script>
