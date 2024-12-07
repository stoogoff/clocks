<template>
	<div>
		<div class="flex gap-2 mb-2">
			<label class="label">Segments</label>
			<prime-select v-model="selected" :options="options" optionLabel="name" placeholder="Select" class="flex-grow" />
		</div>
		<div class="flex gap-2 mb-2">
			<label class="label">Name</label>
			<prime-input-text v-model="text" class="flex-grow" />
		</div>
		<prime-button icon="pi pi-plus" label="Save" @click="save" class="w-full" />
	</div>
</template>
<script setup lang="ts">

import { ClockModel } from '~/models/clock.ts'

const emit = defineEmits(['add'])
const text = ref()
const selected = ref()
const options = ref([
	{ name: '4', code: 4 },
	{ name: '6', code: 6 },
	{ name: '8', code: 8 },
])

function save() {
	emit('add', new ClockModel(selected.value.code, text.value))
}

</script>