<template>
	<div>
		<prime-menubar :model="items">
			<template #start>CLOCKS</template>
			<template #item="{ item }">
				<div class="p-menubar-item-content">
					<nuxt-link :to="item.url" class="p-menubar-item-link">
						<span v-if="item.icon" class="p-menubar-item-icon" :class="item.icon"></span>
						<span class="p-menubar-item-label">{{ item.label }}</span>
					</nuxt-link>
				</div>
			</template>
		</prime-menubar>
		<slot />
	</div>
</template>
<script setup lang="ts">

const items = ref([
	{ label: 'Home', url: '/', icon: 'pi pi-home' },
	{ label: 'About', url: '/about' },
])

</script>