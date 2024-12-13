<template>
	<div>
		<div class="flex gap-2 mb-2">
			<label class="label">Segments</label>
			<prime-select v-model="selectedSegment" :options="segments" optionLabel="name" placeholder="Select" class="flex-grow" />
		</div>
		<div class="flex gap-2 mb-2">
			<label class="label">Name</label>
			<prime-input-text v-model="text" class="flex-grow" />
		</div>
		<div class="flex gap-2 mb-2">
			<label class="label">Colour</label>
			<prime-select-button v-model="selectedColour" :options="colours" dataKey="colour">
				<template #option="slotProps">
					<div class="rounded-sm w-6 h-6" :style="`background-color: ${ slotProps.option.colour }`" />
				</template>
			</prime-select-button>
		</div>
		<prime-button icon="pi pi-plus" label="Save" @click="save" class="w-full" />
	</div>
</template>
<script setup lang="ts">

import { ClockModel } from '~/models/clock.ts'

const emit = defineEmits(['add'])
const text = ref()
const selectedSegment = ref(null)
const segments = ref([
	{ name: '4', code: 4 },
	{ name: '6', code: 6 },
	{ name: '8', code: 8 },
])
const selectedColour = ref(null)
const colours = ref([
	{ colour: '#4B5563' },
	{ colour: '#DC2626' },
	{ colour: '#D97706' },
	{ colour: '#059669' },
	{ colour: '#2563EB' },
	{ colour: '#7C3AED' },
])

function save() {
	const clock = new ClockModel(selectedSegment.value.code, text.value)

	if(selectedColour.value) {
		clock.colour = selectedColour.value.colour
	}

	emit('add', clock)
}

</script>