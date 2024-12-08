<template>
	<div class="clock relative px-4 pt-4 pb-2">
		<canvas ref="canvas" width="300" height="300"></canvas>
		<prime-button severity="danger" icon="pi pi-times" class="!absolute top-2 right-2 z-50" @click="remove" />
		<figure>
			<img :src="imagePath" @click="drawSegment" />
			<figcaption>{{ clock.title }}</figcaption>
		</figure>
	</div>
</template>
<script setup lang="ts">

import { ClockProps } from '~/models/clock.ts'

const emit = defineEmits(['remove'])
const { clock } = defineProps<ClockProps>()

// computed
const imagePath = computed(() => `/img/clock-${ clock.segments }.png`)

// drawing constants
const CENTRE = { x: 150, y: 150 }
const RADIUS = 142
const WEDGE = (Math.PI * 2) / clock.segments

const canvas: Ref<HTMLCanvasElement | undefined> = ref()
const context: Ref<CanvasRenderingContext2D | undefined> = ref()

let currentSegments = 0

onMounted(() => {
	context.value = canvas.value?.getContext('2d') || undefined

	if(clock.filled > 0) {
		render()
		currentSegments = clock.filled
	}
})

function drawSegment(evt) {
	if(currentSegments >= clock.segments) return

	render()

	currentSegments++
}

function render() {
	if(!context.value) return

	context.value.beginPath()
	context.value.moveTo(CENTRE.x, CENTRE.y)
	context.value.arc(CENTRE.x, CENTRE.y, RADIUS, WEDGE * currentSegments, WEDGE * (currentSegments + 1))
	context.value.closePath()
	context.value.fillStyle = clock.colour
	context.value.fill()
}

function remove() {
	emit('remove', clock)
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