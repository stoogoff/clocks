<template>
	<main>
		<prime-panel header="About">
			<p>This is some text</p>
		</prime-panel>
		<clock :clock="staticClock" readonly />
	</main>
</template>
<script setup lang="ts">

import { ClockModel } from '~/models/clock.ts'

useSeoMeta({
	title: 'About',
})

const staticClock = new ClockModel(8, 'A sample clock')

staticClock.filled = 3
staticClock.colour = '#D97706'

</script>