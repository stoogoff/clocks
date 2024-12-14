<template>
	<div class="clock relative px-4 pt-4 pb-2">
		<canvas ref="canvas" width="300" height="300"></canvas>
		<prime-button
			v-if="!readonly"
			severity="danger"
			icon="pi pi-times"
			class="!absolute top-2 right-2 z-50"
			@click="remove" />
		<prime-button
			v-if="!readonly"
			outlined
			icon="pi pi-eraser"
			class="!absolute bottom-2 right-2 z-50"
			@click="erase" />
		<figure>
			<img :src="imagePath" @click="draw" />
			<figcaption>{{ clock.title }}</figcaption>
		</figure>
	</div>
</template>
<script setup lang="ts">

import { IClock } from '~/models/clock.ts'

const emit = defineEmits(['remove', 'update'])
const { clock, readonly } = defineProps<{ clock: IClock, readonly?: boolean }>()

// computed
const imagePath = computed(() => `/img/clock-${ clock.segments }.png`)

// drawing constants
const CENTRE = { x: 150, y: 150 }
const RADIUS = 142
const WEDGE = (Math.PI * 2) / clock.segments

const canvas: Ref<HTMLCanvasElement | undefined> = ref()
const context: Ref<CanvasRenderingContext2D | undefined> = ref()

onMounted(() => {
	context.value = canvas.value?.getContext('2d') || undefined

	drawAllSegments()
})

function draw(evt) {
	if(readonly) return
	if(clock.filled >= clock.segments) return

	render(clock.filled)

	clock.filled++
	emit('update', clock)
}

function render(pos) {
	if(!context.value) return

	context.value.beginPath()
	context.value.moveTo(CENTRE.x, CENTRE.y)
	context.value.arc(CENTRE.x, CENTRE.y, RADIUS, WEDGE * pos, WEDGE * (pos + 1))
	context.value.closePath()
	context.value.fillStyle = clock.colour
	context.value.fill()
}

function drawAllSegments() {
	if(clock.filled > 0) {
		for(let i = 0; i < clock.filled; ++i) {
			render(i)
		}
	}
}

function clear() {
	context.value.clearRect(0, 0, canvas.value.width, canvas.value.height)
}

function remove() {
	if(readonly) return

	emit('remove', clock)
}

function erase() {
	if(readonly) return
	if(clock.filled <= 0) return

	clock.filled--

	emit('update', clock)
	clear()
	drawAllSegments()
}

</script>
<style scoped>

.clock {
	width: 332px;
	background-color: var(--p-surface-0);
	border: 1px solid var(--p-surface-300);
	@apply rounded-md;
}

figure {
	min-height: 328px;
	width: 300px;
}

figcaption {
	@apply uppercase font-bold block text-center absolute left-4 right-4;
	top: 320px;
}

canvas, img {
	@apply absolute top-4 left-4;
	width: 300px;
	height: 300px;
}

</style>