<script setup lang="ts">
defineProps<{
  author: string
  handle: string
  time: string
  avatar: string
  text: string
  image: string
}>()
</script>

<template>
  <article class="post">
    <header>
      <img class="avatar" :src="avatar" :alt="author" />
      <div class="who">
        <strong>{{ author }}</strong>
        <span class="meta">{{ handle }} · {{ time }}</span>
      </div>
    </header>
    <p class="text">{{ text }}</p>
    <img class="hero" :src="image" alt="" />
    <footer class="actions">
      <button>💬 Reply</button>
      <button>🔁 Repost</button>
      <button>❤️ Like</button>
      <button>↗ Share</button>
    </footer>
  </article>
</template>

<style scoped>
.post {
  width: 100%;
  max-width: 480px;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 16px;
  background: #fff;
}
header {
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 12px;
}
.avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
}
.who {
  display: flex;
  flex-direction: column;
}
.meta {
  font-size: 13px;
  color: #6b7280;
}
.text {
  margin: 0 0 12px;
  font-size: 15px;
  line-height: 1.5;
}
.hero {
  width: 100%;
  height: 220px;
  object-fit: cover;
  border-radius: 10px;
  display: block;
  margin-bottom: 12px;
}
.actions {
  display: flex;
  justify-content: space-between;
}
.actions button {
  border: none;
  background: none;
  color: #6b7280;
  font-size: 13px;
  cursor: pointer;
}
</style>
