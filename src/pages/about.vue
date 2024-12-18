<template>
	<main class="md:flex gap-4 max-w-screen-lg">
		<prime-panel class="flex-grow">
			<h1>About Clocks</h1>
			<p>Clocks is designed for tabletop roleplaying games, such as Forged in the Dark and Powered by the Apocalypse games, where tracking progress using clocks is a key mechanic. Clocks can have 4, 6, or 8 segments, which can be filled in to show progress towards a goal.</p>

			<instruction />

			<h2>Storage</h2>
			<p>All clock data is stored within your browser and will be available whenever you visit the site. The advantage of this is there’s no lag when loading your clocks as there’s no network call to retrieve the data. The disadvantage is there’s no way to share clocks with your players. This is a feature I want to add in the future.</p>

			<p>Built by Stoo Goff | <a href="https://we-evolve.co.uk" class="link">we evolve</a></p>
			<div class="flex justify-center">
				<prime-image src="/img/we-evolve.png" width="250" />
			</div>
		</prime-panel>
		<div class="hidden md:block">
			<clock :clock="staticClock" readonly />
		</div>
	</main>
</template>
<script setup lang="ts">

import { ClockModel } from '~/models/clock.ts'

useSeoMeta({
	title: 'About',
})

const staticClock = new ClockModel(8, 'Sample clock')

staticClock.filled = 3
staticClock.colour = '#D97706'

</script>