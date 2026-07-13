<script setup lang="ts">
import { ref } from 'vue'
import { AutoSkeleton } from 'auto-skeleton-vue'
import UserCard from './components/UserCard.vue'
import ArticleList from './components/ArticleList.vue'

const loading = ref(false)

const user = {
  name: 'Ada Lovelace',
  role: 'Principal Engineer',
  avatar: 'https://i.pravatar.cc/128?img=47',
  bio: 'Writes analytical engines and the occasional Vue component. Enjoys long walks through the call stack.',
}

const articles = Array.from({ length: 4 }, (_, i) => ({
  id: i,
  title: `Article number ${i + 1}`,
  excerpt: 'A short excerpt describing what this article is about, spanning a couple of lines.',
}))

function reload() {
  loading.value = true
  setTimeout(() => (loading.value = false), 1500)
}
</script>

<template>
  <main>
    <h1>auto-skeleton-vue</h1>
    <p class="hint">
      Skeletons are captured from each component's real render, then replayed
      while <code>loading</code>. Toggle it below.
    </p>
    <div class="controls">
      <label><input type="checkbox" v-model="loading" /> loading</label>
      <button @click="reload">Simulate reload (1.5s)</button>
    </div>

    <h2>UserCard</h2>
    <AutoSkeleton :loading="loading">
      <UserCard v-bind="user" />
    </AutoSkeleton>

    <h2>ArticleList (v-for)</h2>
    <AutoSkeleton :loading="loading">
      <ArticleList :items="articles" />
    </AutoSkeleton>
  </main>
</template>

<style>
body {
  font-family: system-ui, -apple-system, sans-serif;
  margin: 0;
  background: #f3f4f6;
  color: #111827;
}
main {
  max-width: 560px;
  margin: 0 auto;
  padding: 32px 16px 80px;
}
h1 {
  font-size: 22px;
}
h2 {
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #6b7280;
  margin-top: 32px;
}
.hint {
  color: #6b7280;
  font-size: 14px;
}
.controls {
  display: flex;
  gap: 16px;
  align-items: center;
  margin: 16px 0;
}
button {
  padding: 6px 14px;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  background: #fff;
  cursor: pointer;
}
</style>
