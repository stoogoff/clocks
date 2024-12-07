<template>
	<prime-panel header="Add Clock">
		<div class="flex gap-2">
			<label class="label">Segments</label>
			<prime-select v-model="selected" :options="options" optionLabel="name" placeholder="Select" />
		</div>
		<div class="flex gap-2">
			<label class="label">Name</label>
			<prime-input-text v-model="text" />
		</div>
		<prime-button icon="pi pi-plus" label="Add" @click="save" />
	</prime-panel>
</template>
<script setup lang="ts">

import { IClock, Clock } from '~/models/clock.ts'

const emit = defineEmits<{
	(e: 'add', IClock),
}>()
const text = ref()
const selected = ref()
const options = ref([
	{ name: '4', code: 4 },
	{ name: '6', code: 6 },
	{ name: '8', code: 8 },
])

function save() {
	emit('add', new Clock(selected.value.code, text.value))
}

</script>