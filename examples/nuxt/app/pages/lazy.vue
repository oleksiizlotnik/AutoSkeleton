<script setup lang="ts">
// A lazy fetch doesn't block navigation: the page opens right away and the
// skeleton fills the gap. (A blocking `await useFetch` would never show it.)
const { data: user, status } = useLazyFetch('/api/user', { key: 'lazy-user' })
</script>

<template>
  <section>
    <h2>Lazy fetch on navigation</h2>
    <p>
      Opened with <code>useLazyFetch</code>, so the skeleton shows while the data loads. Switch to
      another page and back to see it again.
    </p>

    <AutoSkeleton :loading="status === 'pending'">
      <UserCard :user="user" />
    </AutoSkeleton>
  </section>
</template>
