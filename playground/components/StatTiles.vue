<script setup lang="ts">
defineProps<{
  tiles: { label: string; value: string; trend: string }[]
}>()
</script>

<template>
  <div class="tiles">
    <div v-for="t in tiles" :key="t.label" class="tile">
      <p class="label">{{ t.label }}</p>
      <p class="value">{{ t.value }}</p>
      <p class="trend">{{ t.trend }}</p>
    </div>
  </div>
</template>

<style scoped>
.tiles {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}
.tile {
  padding: 16px;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  background: #fff;
}
.label {
  margin: 0 0 8px;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #6b7280;
}
.value {
  margin: 0 0 4px;
  font-size: 26px;
  font-weight: 700;
}
.trend {
  margin: 0;
  font-size: 13px;
  color: #10b981;
}
</style>
