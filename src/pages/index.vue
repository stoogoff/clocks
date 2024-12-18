<template>
	<main>
		<div class="flex flex-wrap flex-col md:flex-row gap-4">
			<prime-panel v-if="noClocks" class="max-w-screen-md md:mx-auto">
				<h1>How to use</h1>
				<instruction />
			</prime-panel>
			<client-only>
				<clock v-for="clock in state.clocks"
					:key="clock.id"
					:clock="clock"
					@remove="remove"
					@update="update"
				/>
			</client-only>
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
import { useClockStore } from '~/stores/clocks.ts'

useSeoMeta({
	title: 'Home',
})

// popover state
const op = ref()
const toggle = event => op.value.toggle(event)

const noClocks = computed(() => state.clocks.length === 0)

// clock functions
const state = useClockStore()

const add = (input: ClockModel) => {
	state.add(input)
	toggle()
}

const remove = (input: ClockModel) => {
	state.remove(input)
}

const update = (input: ClockModel) => {
	state.update(input)
}

</script>
