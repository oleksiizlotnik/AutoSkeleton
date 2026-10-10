<script setup lang="ts">
// Fetched on the server, so the first page load already shows the real card.
const { data: user, status, refresh } = await useFetch('/api/user')
</script>

<template>
  <section>
    <h2>Server-rendered content</h2>
    <p>
      This card is rendered on the server. Press <strong>Refresh</strong>: while it reloads, the
      skeleton you see is generated from the card's real layout — nothing was drawn by hand.
    </p>
    <button class="primary" :disabled="status === 'pending'" @click="refresh()">Refresh</button>

    <AutoSkeleton :loading="status === 'pending'">
      <UserCard :user="user" />
    </AutoSkeleton>
  </section>
</template>
