<script setup lang="ts">
defineProps<{
  items: { id: number; title: string; excerpt: string }[]
}>()
</script>

<template>
  <ul class="list">
    <li v-for="item in items" :key="item.id" class="row">
      <div class="thumb" />
      <div class="text">
        <h4>{{ item.title }}</h4>
        <p>{{ item.excerpt }}</p>
      </div>
    </li>
  </ul>
</template>

<style scoped>
.list {
  list-style: none;
  margin: 0;
  padding: 0;
  max-width: 480px;
}
.row {
  display: flex;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid #eee;
}
.thumb {
  width: 72px;
  height: 56px;
  border-radius: 8px;
  background: #cbd5e1;
  flex: none;
}
.text h4 {
  margin: 0 0 6px;
  font-size: 15px;
}
.text p {
  margin: 0;
  font-size: 13px;
  color: #6b7280;
  line-height: 1.4;
}
</style>
