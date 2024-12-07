<template>
	<main>
		<div class="flex flex-col md:flex-row gap-4">
			<clock v-for="clock in clocks"
				:key="clock.id"
				:clock="clock"
				@remove="remove"
			/>
		</div>
	</main>
	<footer class="fixed bottom-0 left-0 right-0 bg-primary flex justify-center p-2">
		<prime-button icon="pi pi-clock" label="Add" @click="toggle" />
		<prime-popover ref="op">
			<add-clock @add="add" />
		</prime-popover>
	</footer>
</template>
<script setup lang="ts">

import { ClockModel } from '~/models/clock.ts'

useSeoMeta({
	title: 'Home',
})

const op = ref()
const toggle = event => op.value.toggle(event)

const clocks = ref<ClockModel>([])

const add = (input: ClockModel) => {
	clocks.value.push(input)
	toggle()
}

const remove = (input: ClockModel) => {
	clocks.value = clocks.value.filter((clock: Clock) => clock.id !== input.id)
}

</script>
