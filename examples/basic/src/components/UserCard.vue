<script setup lang="ts">
defineProps<{
  name: string
  role: string
  avatar: string
  bio: string
}>()
</script>

<template>
  <article class="card">
    <img class="avatar" :src="avatar" :alt="name" />
    <div class="body">
      <h3 class="name">{{ name }}</h3>
      <p class="role">{{ role }}</p>
      <p class="bio">{{ bio }}</p>
      <div class="actions">
        <button>Follow</button>
        <button>Message</button>
      </div>
    </div>
  </article>
</template>

<style scoped>
.card {
  display: flex;
  gap: 16px;
  padding: 16px;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  max-width: 420px;
  background: #fff;
}
.avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  object-fit: cover;
  flex: none;
}
.body {
  flex: 1;
}
.name {
  margin: 0 0 4px;
  font-size: 18px;
}
.role {
  margin: 0 0 8px;
  color: #6b7280;
  font-size: 14px;
}
.bio {
  margin: 0 0 12px;
  font-size: 14px;
  line-height: 1.5;
}
.actions {
  display: flex;
  gap: 8px;
}
button {
  padding: 6px 14px;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  background: #f9fafb;
  cursor: pointer;
}
</style>
