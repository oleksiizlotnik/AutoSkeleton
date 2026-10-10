<script setup lang="ts">
import { ref } from 'vue'
import { AutoSkeleton } from 'auto-skeleton-vue'
import UserCard from './components/UserCard.vue'
import ArticleList from './components/ArticleList.vue'
import ProductCard from './components/ProductCard.vue'
import StatTiles from './components/StatTiles.vue'
import FeedPost from './components/FeedPost.vue'
import SettingsForm from './components/SettingsForm.vue'

const loading = ref(false)
const animated = ref(true)

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

const products = [
  {
    title: 'Mechanical Keyboard',
    price: '$89',
    oldPrice: '$129',
    rating: 4,
    image: 'https://picsum.photos/seed/kbd/300/200',
  },
  {
    title: 'Studio Headphones',
    price: '$149',
    oldPrice: '$210',
    rating: 5,
    image: 'https://picsum.photos/seed/hp/300/200',
  },
]

const tiles = [
  { label: 'Revenue', value: '$48.2k', trend: '▲ 12.4%' },
  { label: 'Active users', value: '3,910', trend: '▲ 4.1%' },
  { label: 'Churn', value: '1.8%', trend: '▼ 0.3%' },
]

const post = {
  author: 'Grace Hopper',
  handle: '@amazinggrace',
  time: '2h',
  avatar: 'https://i.pravatar.cc/96?img=32',
  text: 'Just shipped a compiler over the weekend. Reminder that the most dangerous phrase in the language is "we\'ve always done it this way."',
  image: 'https://picsum.photos/seed/feed/480/220',
}

const settings = {
  name: 'Katherine Johnson',
  email: 'katherine@nasa.gov',
  bio: 'Calculates trajectories. Double-checks the computers.',
}

/** Simulate a fetch: flip to loading, then back after a delay. */
function reload() {
  loading.value = true
  setTimeout(() => (loading.value = false), 1500)
}
</script>

<template>
  <main>
    <header>
      <h1>AutoSkeleton playground</h1>
      <label><input type="checkbox" v-model="loading" /> loading</label>
      <label><input type="checkbox" v-model="animated" /> animated</label>
      <button @click="reload">Simulate reload (1.5s)</button>
      <p class="hint">
        Toggle <em>loading</em> to see each skeleton. Skeletons appear once a component has
        rendered at least once (persisted across reloads).
      </p>
    </header>

    <section>
      <h2>UserCard — avatar + text + buttons</h2>
      <AutoSkeleton :loading="loading" :animated="animated">
        <UserCard v-bind="user" />
      </AutoSkeleton>
    </section>

    <section>
      <h2>StatTiles — 3-column grid</h2>
      <AutoSkeleton :loading="loading" :animated="animated">
        <StatTiles :tiles="tiles" />
      </AutoSkeleton>
    </section>

    <section>
      <h2>ProductCard ×2 — media, stars, price (side by side)</h2>
      <div class="grid">
        <AutoSkeleton v-for="p in products" :key="p.title" :loading="loading" :animated="animated">
          <ProductCard v-bind="p" />
        </AutoSkeleton>
      </div>
    </section>

    <section>
      <h2>FeedPost — header, paragraph, hero image, action bar</h2>
      <AutoSkeleton :loading="loading" :animated="animated">
        <FeedPost v-bind="post" />
      </AutoSkeleton>
    </section>

    <section>
      <h2>ArticleList — v-for rows</h2>
      <AutoSkeleton :loading="loading" :animated="animated">
        <ArticleList :items="articles" />
      </AutoSkeleton>
    </section>

    <section>
      <h2>SettingsForm — labels, inputs, textarea</h2>
      <AutoSkeleton :loading="loading" :animated="animated">
        <SettingsForm v-bind="settings" />
      </AutoSkeleton>
    </section>
  </main>
</template>

<style>
body {
  font-family:
    system-ui,
    -apple-system,
    sans-serif;
  margin: 0;
  background: #f3f4f6;
  color: #111827;
}
main {
  max-width: 720px;
  margin: 0 auto;
  padding: 32px 16px 80px;
}
header {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 24px;
}
header h1 {
  font-size: 20px;
  margin: 0;
  flex: 1 1 100%;
}
header .hint {
  flex: 1 1 100%;
  margin: 0;
  font-size: 13px;
  color: #6b7280;
}
section {
  margin-bottom: 32px;
}
section h2 {
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #6b7280;
}
.grid {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}
header button {
  padding: 6px 14px;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  background: #fff;
  cursor: pointer;
}
</style>
