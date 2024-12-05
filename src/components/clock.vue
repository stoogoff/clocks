<template>
	<div id="container" class="relative">
		<canvas ref="canvas" width="300" height="300" @click="drawSegment"></canvas>
		<figure>
			<img :src="imagePath" @click="drawSegment" />
			<figcaption>{{ title }}</figcaption>
		</figure>
	</div>
</template>
<script setup lang="ts">

// props
interface Props {
	segments: number,
	title: string,
	filled?: number,
	fillColour?: string,
}

const { segments, title, filled = 0, fillColour = '#444' } = defineProps<Props>()

// computed
const imagePath = computed(() => `/img/clock-${ segments }.png`)

// drawing constants
const CENTRE = { x: 150, y: 150 }
const RADIUS = 142
const WEDGE = (Math.PI * 2) / segments

const canvas: Ref<HTMLCanvasElement | undefined> = ref()
const context: Ref<CanvasRenderingContext2D | undefined> = ref()

let currentSegments = 0

onMounted(() => {
	context.value = canvas.value?.getContext('2d') || undefined

	if(filled > 0) {
		render()
		currentSegments = filled
	}
})

function drawSegment(evt) {
	render()

	currentSegments++
}

function render() {
	if(!context.value) return

	context.value.beginPath()
	context.value.moveTo(CENTRE.x, CENTRE.y)
	context.value.arc(CENTRE.x, CENTRE.y, RADIUS, WEDGE * currentSegments, WEDGE * (currentSegments + 1))
	context.value.closePath()
	context.value.fillStyle = fillColour
	context.value.fill()
}

</script>
<style scoped>

#container, figure {
	min-height: 340px;
	width: 300px;
}

figcaption {
	@apply uppercase font-bold block text-center absolute left-0 right-0;
	top: 300px;
}

canvas, img {
	@apply absolute top-0 left-0;
	width: 300px;
	height: 300px;
}

</style>