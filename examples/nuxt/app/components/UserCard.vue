<script setup lang="ts">
defineProps<{ user?: { name: string; role: string; bio: string } | null }>()

// Inline SVG avatar, so the example needs no network.
const avatar = `data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><circle cx="32" cy="32" r="32" fill="#7c3aed"/></svg>',
)}`
</script>

<template>
  <article class="card">
    <img :src="avatar" width="72" height="72" alt="" class="avatar" />
    <div>
      <h3>{{ user?.name }}</h3>
      <p class="muted">{{ user?.role }}</p>
      <p>{{ user?.bio }}</p>
      <div class="actions">
        <button>Follow</button>
        <button>Message</button>
      </div>
    </div>
  </article>
</template>
